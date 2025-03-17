---
title: Speeding up Machine Learning using Keras.evaluate() and Python Multiprocessing
date: '2020-12-13'
categories:
  - research
published: true
---

My second research is coming to a close next week, and I've been running a lot of ML experiments so I can have interesting results for my final report. However, one of the things slowing down my iterative process was the very slow training and testing process to get results. Normally, this is when I would just have my computer running my programs, but the experiments were still far too slow to generate any meaningful number of results. In this post, I'm going to describe two changes I made to my code/workflow which allows me to generate 120x the amount of results in the same amount of time!

## Using Keras.evaluate() instead of Loops

The first change I made was to stop evaluating code using a for loop. The code I was given had a loop which looked something like this:

```python
def row_to_dist_output(model, row):
    words_input = s.text_to_token_input(row['Procedure'], t_words, c.TEXT_INPUT_LENGTH)
    diag_input = s.text_to_token_input(row['Diagnosis'], t_diag, c.TEXT_INPUT_LENGTH)
    surgeon_input = s.text_to_token_input(row['Personnel Name'], t_surgeon, c.SURG_INPUT_LENGTH)
    room_input = s.text_to_token_input(row['Room'], t_room, 1)
    io_input = np.array([[row['IO']]])
    asa_input = s.text_to_token_input(row['ASA'], t_asa, 1)
    age_input = np.array([[row['AgeNorm']]])
    dow_input = s.text_to_token_input(row['DOW'], t_dow, 1)
    time_input = np.array([[row['ScheduledTimeNorm']]])
    return model.predict([words_input, diag_input, surgeon_input, room_input, io_input, asa_input, age_input, dow_input, time_input]).squeeze()

def df_get_preds(model, df):
    print('getting preds')
    preds = df.apply(lambda row: row_to_dist_output(model, row), axis=1)
    mus= preds.apply(lambda row: row[0:num_densities])
    sigmas = preds.apply(lambda row: row[num_densities:num_densities*2])
    alphas = preds.apply(lambda row: row[num_densities*2:])
    return mus, sigmas, alphas

  def crps(model, df):
    mus, sigmas, alphas = df_get_preds(model, df)
    mus = mus.to_numpy() * normalizer.std_actual + normalizer.mean_actual
    sigmas = sigmas.to_numpy() * normalizer.std_actual
    alphas = alphas.to_numpy()
    time = df['ActualTime'].to_numpy()

    crps = np.empty(len(time))
    for i in range(0, len(time)):
        crps[i] = crps_quadrature(time[i], mixture(mus[i], sigmas[i], alphas[i]), xmin=0, xmax=10000, tol=.1)
        print(str(i) + ': ' + str(crps[i]))
    return crps

model.compile(optimizer='adam', loss=mdn_2ln, metrics=[])
model.fit(x=x_train, y=y_train, epochs=4, validation_data=(x_val, y_val))
crps_test = crps(model, df_test)
```

Essentially, this code uses a loop to call `model.predict()` on each line to generate a list of predictions, and then uses another loop to call `crps_quadrature` on each prediction. As it turns out, using loops like this is very slow, and not recommended.

Instead, I defined my own metric called `crps_metric()` which calculates the crps_score from a given prediction. The function looks like this:

```python
def crps_metric(y, pvector):
    mus = tf.slice(pvector, [0, 0] , [-1, num_densities])
    sigmas = tf.slice(pvector, [0, num_densities] , [-1, num_densities])
    alphas = tf.slice(pvector, [0, 2 * num_densities] , [-1, num_densities])

    mus = mus * normalizer.std_actual + normalizer.mean_actual
    sigmas = sigmas * normalizer.std_actual

    times = tf.math.exp(y * normalizer.std_actual + normalizer.mean_actual)

    if num_densities == 1:
        return crps_lognorm_tf(times, mus, sigmas)
    elif tf.executing_eagerly():
        return crps_quadrature_helper(times, mus, sigmas, alphas)
    else:
        return -1
```

The first few lines split up the predictions into `mus`, `sigmas`, and `alphas`, and then transform them to the same log space as the log-normal function. Then, I call code to actually calculate the CRPS value. There are two scenarios. If `num_densities` is `1`, then I call `crps_lognorm_tf`, which is my closed-form solution to the CRPS log-normal from before, but modified to use Tensorflow tensors instead of Numpy arrays.

If `num_densities` is not `1`, meaning that we are using a mixture of log-normals distribution, then we have two options. If we are in training mode (i.e. `tf.executing_eagerly()` is `False`), then we return `-1`, because the integral is simply too slow to call during training time (and isn't really necessary). During testing time, we recompile the model to run eagerly, which allows us to call Numpy-based functions (like properscoring), and then return the value of crps_quadrature.

Here's what this process looks like overall. Note the use of the argument `run_eagerly=True` when we recompile the model, so that we can call Numpy functions.

```python
model = tf.keras.Model(inputs=inputs, outputs=output)
model.compile(optimizer='adam', loss=mdn_2ln, metrics=[crps_metric])
model.fit(x=x_train, y=y_train, epochs=4, validation_data=(x_val, y_val))
model.compile(optimizer='adam', loss=mdn_2ln, metrics=[crps_metric], run_eagerly=True)
crps = model.evaluate(x=x_test, y=y_test)
```

## Using Python Multiprocessing

This week, I was finally able to get access to the WashU school servers, so I didn't need to run the code on my personal computer 24/7 and hear my fans on all the time 😬.

I was super excited to see how much faster the school computers would be compared to my personal computer, but when I ran the Jupyter notebook on the server, it ended up being about the same time (even slightly longer). I was quite confused to see this, since my server access came with 16 cores.

As it turns out, Python doesn't use multiple cores for computation by default. In order to enable this usage, I needed to wrap my code in a multiprocessing block which looks like the following:

```python
from multiprocessing import Pool

def experiment(args):
	# Define and train a model as defined by input specs
    # Calculate CRPS on validation and test sets
    # Return CRPS

with Pool() as p:
	args = [[1,4,3,1]] # Model specifications
    args = args * 32 # Number of experiments we want to run
    crps_results = p.starmap(experiment, args)
    p.close()
    p.join()
    # Do something with crps_results
```

And it's that easy! `32` represents the number of experiments we want to run simultaneously. The reason I run the same experiment multiple times is to counter the inherent randomness behind ML training. If you don't need this, you can just as well modify your initial `args` list to have multiple different specs to run simultaneously.

I use `pool.starmap()` because we need to pass multiple arguments into our experiment code, but if you don't need this, you can call `pool.map()` which will give you the same results.

With this implemtation, my code now takes 2 minutes to run 32 experiments, instead of 45 seconds for a single experiment. This is an increase in speed of 12x, on top of my earlier improvement, for a total speed improvement of 240x!

My next post will be my final Rotation 2 Research Report, so check back in a day or two to see all my final results!
