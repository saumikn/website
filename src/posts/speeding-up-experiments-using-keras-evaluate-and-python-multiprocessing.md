---
title: Speeding up Machine Learning using Keras.evaluate() and Python Multiprocessing
description: Speeding up Machine Learning using Keras.evaluate() and Python Multiprocessing
date: '2020-12-14'
categories:
  - sveltekit
published: true
---

My second research is coming to a close next week, and I've been running a lot of ML experiments so I can have interesting results for my final report. However, one of the things slowing down my iterative process was the very slow training and testing process to get results. Normally, this is when I would just have my computer running my programs, but the experiments were still far too slow to generate any meaningful number of results. In this post, I'm going to describe two changes I made to my code/workflow which allows me to generate 120x the amount of results in the same amount of time!

**Using Keras.evaluate() instead of Loops**

The first change I made was to stop evaluating code using a for loop. The code I was given had a loop which looked something like this:

Essentially, this code uses a loop to call model.predict() on each line to generate a list of predictions, and then uses another loop to call crps_quadrature on each prediction. As it turns out, using loops like this is very slow, and not recommended.

Instead, I defined my own metric called `crps_metric()` which calculates the crps_score from a given prediction. The function looks like this:

The first few lines split up the predictions into `mus`, `sigmas`, and `alphas`, and then transform them to the same log space as the log-normal function. Then, I call code to actually calculate the CRPS value. There are two scenarios. If `num_densities` is `1`, then I call `crps_lognorm_tf`, which is my closed-form solution to the CRPS log-normal from before, but modified to use Tensorflow tensors instead of Numpy arrays.

If `num_densities` is not `1`, meaning that we are using a mixture of log-normals distribution, then we have two options. If we are in training mode (i.e. `tf.executing_eagerly()` is `False`), then we return `-1`, because the integral is simply too slow to call during training time (and isn't really necessary). During testing time, we recompile the model to run eagerly, which allows us to call Numpy-based functions (like properscoring), and then return the value of crps_quadrature.

Here's what this process looks like overall. Note the use of the argument `run_eagerly=True` when we recompile the model, so that we can call Numpy functions.

As it turns out, this code is much much faster! The old code took about 15 minutes to run one experiment, while the updated code takes 45 seconds. This is about a 20x improvement in speed!

**Using Python Multiprocessing**

This week, I was finally able to get access to the WashU school servers, so I didn't need to run the code on my personal computer 24/7 and hear my fans on all the time 😬.

I was super excited to see how much faster the school computers would be compared to my personal computer, but when I ran the Jupyter notebook on the server, it ended up being about the same time (even slightly longer). I was quite confused to see this, since my server access came with 16 cores.

As it turns out, Python doesn't use multiple cores for computation by default. In order to enable this usage, I needed to wrap my code in a multiprocessing block which looks like the following:

And it's that easy! `32` represents the number of experiments we want to run simultaneously. The reason I run the same experiment multiple times is to counter the inherent randomness behind ML training. If you don't need this, you can just as well modify your initial `args` list to have multiple different specs to run simultaneously.

I use `pool.starmap()` because we need to pass multiple arguments into our experiment code, but if you don't need this, you can  call `pool.map()` which will give you the same results.

With this implemtation, my code now takes 2 minutes to run 32 experiments, instead of 45 seconds for a single experiment. This is an increase in speed of 12x, on top of my earlier improvement, for a total speed improvement of 240x!

My next post will be my final Rotation 2 Research Report, so check back in a day or two to see all my final results!

