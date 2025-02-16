---
title: Paper Review: Machine Learning to Forecast Surgery Duration
description: A review of the paper discussing the application of machine learning techniques to predict surgery duration.
date: "2020-11-19"
categories:
  - blog
  - research
published: true
---

My second rotation has started on Monday, and I've decided to work with [Dr. Chenyang Lu](https://www.cse.wustl.edu/~lu/) in the area of Machine Learning for Health. During the rotation, I'm going to be working especially close with [anesthesiologists](https://www.asa.org/) to understand how machine learning can be applied to predict surgery duration.

The most important section of the paper discusses how the model was trained. The model itself looks like the below image.

![Model Architecture](https://saumikn.com/wp-content/uploads/2020/11/image-955x1024.png)

The continuous and categorical features are normalized and combined as inputs for the model. The unstructured text data is broken up into word tokens and embedded into a vector. After running these word embeddings through an LSTM, the output is concatenated with the other data to be used as the input to the Mixture Density Network. I'm personally not very familiar with MDNs, so I'll have to do some more reading on how these work. MDNs were developed by [Bishop in 1994](https://publications.aston.ac.uk/id/eprint/373/1/NCRG_94_004.pdf), and York made a comment that represents the model's ability to capture the uncertainty in predictions.

One of the key aspects of model training was the performance measure chosen - continuous ranked probability score (CRPS). This measure was chosen for several reasons - it combines multiple predictive qualities into a single value, it rewards more precise predictive distributions, and it is particularly useful for evaluating probabilistic forecasts.

### Critiques

Overall, I thought the paper was quite good, and especially impressive considering the background of the authors. The authors defined and justified their problem very well, and implemented a novel solution to the problem with great results.

I think my biggest critiques of the paper are the technical explanations behind the model. The most egregious example of this is the Mixture Density Networks itself. The authors introduce the model by saying that "One neural network was trained: a mixture density network (MDN)." However, there isn't any real explanation on what an MDN is, how it works, or why it was chosen as a base model over other models. The authors also don't give any explanation on how the model was implemented, other than mentioning that Tensorflow was used. Since the audience for the paper are people with prior knowledge in machine learning, I believe a more thorough explanation would have been beneficial.

There are a few places where I wish there would have been more technical details. For example, describing the prior models which are used as a benchmark (DT, RF, GBT, Bayes). There doesn't need to be as much explanation since it isn't the main point of the paper, but maybe a sentence or two would suffice.

In conclusion, this paper provides a solid foundation for understanding how machine learning can be applied to predict surgery duration, but it could benefit from more detailed explanations of the methodologies used.
