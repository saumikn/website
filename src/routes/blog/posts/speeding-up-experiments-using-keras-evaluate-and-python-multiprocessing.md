---
title: Speeding up Machine Learning using Keras.evaluate() and Python Multiprocessing
description: An exploration of improving the speed of machine learning experiments using Keras and Python's multiprocessing capabilities.
date: "2020-12-14"
categories:
  - blog
  - machine learning
published: true
---

My second research is coming to a close next week, and I've been running a lot of ML experiments so I can have interesting results for my final report. However, one of the things slowing down my iterative process was the very slow training and testing process to get results. Normally, this involves using a loop to call `model.predict()` on each line to generate a list of predictions, and then using another loop to call `crps_quadrature` on each prediction. As it turns out, using loops like this is very slow, and not recommended.

Instead, I defined my own metric called `crps_metric()` which calculates the `crps_score` from a given prediction. The function looks like this:

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

With this implementation, I was able to compile the model with the new metric:

```python
model.compile(optimizer='adam', loss=mdn_2ln, metrics=[crps_metric])
model.fit(x=x_train, y=y_train, epochs=4, validation_data=(x_val, y_val))
```

As it turns out, this code is much faster! The old code took about 15 minutes to run one experiment, while the updated code takes 45 seconds. This is about a 20x improvement in speed!

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
```

And it's that easy! `32` represents the number of experiments we want to run simultaneously. The reason I run the same experiment multiple times is to counter the inherent randomness behind ML training. If you don't need this, you can just as well modify your initial `args` list to have multiple different specs to run simultaneously.

With this implementation, my code now takes 2 minutes to run 32 experiments, instead of 45 seconds for a single experiment. This is an increase in speed of 12x, on top of my earlier improvement, for a total speed improvement of 240x!

My next post will be my final Rotation 2 Research Report, so check back in a day or two to see all my final results!
