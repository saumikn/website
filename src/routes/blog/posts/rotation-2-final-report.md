---
title: Rotation 2 Final Report
description: A detailed report on the findings and experiences during the second rotation.
date: "2020-12-16"
categories:
  - research
published: true
---

## Introduction

This report summarizes the key findings and experiences from my second rotation, focusing on the development and evaluation of the Continuous Ranked Probability Score (CRPS) metric in Keras.

## CRPS Overview

CRPS is a scoring measure that allows us to measure the distance between an observation and a distribution. The CRPS measure is denoted by the following equation:

```latex
CRPS(F,y)=\int_{-\infty}^y F(x)^2 dx + \int_y^\infty (1-F(x))^2 dx
```

where \(F\) represents the Cumulative Distribution Function of the distribution. CRPS is an ideal scoring measure for forecasting, as it considers the entire distribution in the score, rewarding both accurate and precise forecasts. This makes CRPS a common scoring measure in meteorology.

## Challenges with CRPS

While CRPS has many great properties, a significant downside is that numerically evaluating this integral is extremely slow, which has been the biggest bottleneck in Jiao's network. Due to the slow computation of CRPS, prior work has focused on developing closed-form integrals to speed up the process.

## Compiling the CRPS Metric in Keras

In the original model, calculating CRPS on the validation and test datasets was done by iterating over these datasets one example at a time. By rewriting the CRPS calculations to use TensorFlow operations, I was able to compile my CRPS function directly into my Keras model. This allowed me to use the method `keras.model.evaluate()`, taking advantage of built-in Keras optimizations. As a result, the model experienced a significant improvement in evaluation speed.

## Python Multi-Core Processing

In the original model, CRPS was too slow to use as the loss function of the neural network. Instead, Jiao's network used negative log likelihood (NLL) as the loss function, which is a proper scoring measure but has a much faster computation time than the CRPS integration. However, using the closed-form solution, CRPS becomes a viable alternative loss function during training.

## Experimental Results

Experiments showed that using CRPS as the training loss function resulted in worse results overall, with the best validation and test losses of 17.82 minutes and 18.15 minutes, respectively. The reason for this performance discrepancy is currently unknown, and further experimentation and analysis are necessary to understand the underlying reasons.

## Conclusion

Overall, I'm quite happy with my progress during this rotation. I was able to implement several measures that sped up the model significantly. Additionally, I performed several experiments on the structure of the model. While the experiments with dropout and CRPS loss are still inconclusive, the shared layers model has shown significant improvement over the previous model.

---
