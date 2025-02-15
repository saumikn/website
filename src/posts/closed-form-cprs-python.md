---
title: Implementing Closed Form CRPS in Python
description: Implementing Closed Form CRPS in Python
date: '2020-11-30'
categories:
  - sveltekit
published: true
---

In my [review](https://saumikn.com/blog/paper-review-machine-learning-to-forecast-surgery-duration/) of the paper [Probabilistic forecasting of surgical case duration using machine learning: model development and validation](https://academic.oup.com/jamia/advance-article/doi/10.1093/jamia/ocaa140/5919678?casa_token=lo1WFoMQ7bUAAAAA:pzmqxmDR2d7tu1wvd0fiAHP2yvKYr3Ky3dOE4aHjo9mI4vubImkl61PEZIwYVC67gTsDy_zKAUXj) last week, I briefly mentioned the term CRPS. Today, I'll go into a little more detail on what CRPS actually is and discuss its implementation in Python.

**What is CRPS?**

CRPS, which stands for Continous Ranked Probability Score, is a measure which is used to evaluate the result of a probabilistic distribution. I actually can't find where this term was created, but I have found references to CRPS dating back to at least [1977](https://link.springer.com/chapter/10.1007/978-94-010-1276-8_18).

So why do we want to use CRPS? In normal regression problems, we can compare our prediction with the actual result using a simple formula like Mean Squared Error or Mean Absolute Error. However, in certain domains, our prediction isn't composed of just a single number, but a probabilistic distribution. Think about a prediction for how much snow we're going to get. Generally the weather forecasters won't say that we are going to get 8 inches of snow, they might say a 20% chance of 6 inches or less, 50% chance of 7-9 inches, and 30% chance of 10 inches or more. When the actual forecast comes in and we get 11 inches of snow, how do we evaluate this score?

This is where CRPS comes in, as it allows us to compare the actual result against the entire prediction distribution, instead of the just the mean of the distribution. The standard way we can calculate CRPS is with the integral

```
$$\mathrm{CRPS}(F,x) = \int_{-\infty}^x F(x)^2 dx + \int_x^{\infty} (1-F(x))^2 dx$$
```

```
, where $F$ represents the Cumulative Density Function of our prediction distribution, and $x$ represents the point we are checking against.
```

```
While this equation is great, a severe limitation of this calculation is the inherent slowness of calculating this integral. To solve this issue, several researchers have come up with <a href="https://cran.microsoft.com/snapshot/2017-09-17/web/packages/scoringRules/vignettes/crpsformulas.html#introduction">many closed-form solutions</a> for certain common distributions. For example, here is the formula for a single normal distribution with mean $\mu$ and standard deviation $\sigma$, formulated  by <a href="https://apps.dtic.mil/dtic/tr/fulltext/u2/a459688.pdf">Gneiting et al</a> in 2004:
```

```
$$\mathrm{CRPS}(F_{\mu, \sigma},x) = \sigma * ( (2 \Phi(\frac{x-\mu}{\sigma})-1) + \varphi(\frac{x-\mu}{\sigma}) + \frac{1}{\sqrt{\pi}})$$
```

**Implementing CRPS in Python**

If you want to use the CRPS scoring rule in Python, the first place  you should look is the [properscoring](https://github.com/TheClimateCorporation/properscoring) module. It provides a method, `crps_quadrature()`, which allows users to numerically integrate any probability distribution function, given its CDF.

In addition, the module has also actually implemented the closed-form solution for the normal distribution, using the method `crps_gaussian()`. With some quick time checks using both of these functions, `crps_gaussian()` seems to run about 5000 times faster than integration on my machine, an absolutely enormous speedup!

However, there are a number of other closed-form functions which aren't implemented in properscoring. In this blog, I'll show my closed-form implementations of CRPS to be called for a normal distribution, a mixture of normal distributions, and a log-normal distribution.

**Normal Distribution**

**Mixture of Normal Distribution**s

**Log Normal Distribution**

You can check the code at the bottom to view the results and confirm that these functions have been implemented correctly, and produce identical results to numeric integration. In fact, using the closed-form solutions is more accurate, due to the inherent rounding errors arising from integration.

**Mixture of Log-Normal Distribution**s

While all of these implementations are great, the real reason I'm doing this is to use a closed-form solution for my own project, forecasting the duration of surgical operations. I was very excited about these implementations, so I could utilize the speedups in my own code. However, after doing some experiments, our distribution turns out to not be a mixture of normals, or a log-normal distribution, but a mixture of log-normals!

Unfortunately, no closed-form solution exists yet for this distribution. The closed form solution for mixture of log-normals was only derived very recently, in 2015, so it's possible that nobody has yet been interested enough in such a distribution. On the other hand, it's possible that the closed-form solution for the integration doesn't actually exist, which would be quite a bummer.

```
I spent a few days over the long weekend experimenting with existing solutions for other distributions to try and derive my own solution for the log-normal mixture. I believe that I've made some good progress, as I've found part of the solution, which, holding $\mu$, $\sigma$, and $\alpha$ constant, is only a constant term off from the real solution. I've verified this by cross-checking with the numeric-integration solutions, so this is a very good sign that the actual closed-form solution exists. Hopefully by the end of the rotation, I'll be able to derive the full solution!
```

**Link to Jupyter Notebook**

If you're interested, you can check out the Jupyter Notebook I've been working in, which contains all of the code I've written for this task, as well as results from all the experiments I've run so far.

