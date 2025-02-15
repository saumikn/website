---
title: A Brief Guide to Maia
description: A Brief Guide to Maia
date: '2021-05-24'
categories:
  - sveltekit
published: true
---

Over the last few months, I've been working on a research project to develop personalized training tools for chess players. For this post, I'm just going to describe Maia, the framework developed last year which all of our code and models are based on.

**Maia**

Maia is a framework/model developed in 2020 by [McIlroy-Young et al.](https://arxiv.org/pdf/2006.01855.pdf), which accurately predicts chess moves made by humans on [Lichess](http://lichess.org/). Essentially, their model took the neural network structure of Leela Chess (which I described in [this post](https://saumikn.com/blog/a-brief-guide-to-neural-network-chess-engines/)), and adapted it so that it predict what a human would play in a given position, instead of "the best" chess move in the position. Here's what the model looks like:

![Post Image](https://saumikn.com/wp-content/uploads/2021/05/image-1024x337.png)

The architecture of this model is a Residual Convolutional Neural Network with 6 res blocks, and 64 filters per CNN layer. In plain English, a [Convolutional Neural Network](https://en.wikipedia.org/wiki/Convolutional_neural_network) (CNN) is a type of neural network which uses filters instead of fully-connected layers, because of the the improved speed of computation and similar features of the data. Typically, CNNs are used in the field of computer vision, but as it turns out, they also work very well for chess boards! Instead of a typical 3-channel (RGB) image that you'd typically see, the chess board that Leela and Maia have uses 112 channels.

For a given chess board, there are 12 different types of pieces (White/Black) x (King/Queen/Bishop/Knight/Rook/Pawn), so each of these pieces takes up one channel in the input data. We also need a 13th channel, which keeps track of how many times this position has repeated (necessary for claiming [threefold repetitions](https://en.wikipedia.org/wiki/Threefold_repetition)). In this way, we can represent a chess board in 13 channels.

Then, the input actually repeats this structure for the previous seven board states of the game, for the simple reason that it improves the model performance. (That's how a lot of ML is - arbitrary decisions that happen to work well 😄).

Finally, we have eight metadata channels, which represent things like castling rights, turns, and rule 50 counts.

In total, this gives us 13 + 13\*7 + 8 = 112 channels! In general, understanding how channels work for CNNs is very important, so take some time so you understand how it works.

A [Residual Neural Network](https://en.wikipedia.org/wiki/Residual_neural_network) (ResNet), is a more recent innovation in machine learning. Knowing how exactly it works isn't too important, but the main idea is that using these residual layers allows us to build very deep networks (hundreds or even thousands of layers), instead of the older models which could only train very few layers.

The main output of Maia is a 1858-vector, which represents the move prediction made by the model. The reason the output is 1858-length is because there happen to be exactly [1858 possible moves in chess](https://github.com/so-much-meta/lczero_tools/blob/master/src/lcztools/_uci_to_idx.py) (at least when represented using [UCI Notation](https://en.wikipedia.org/wiki/Universal_Chess_Interface)).

To predict these outputs, Maia was trained on millions of chess games played on Lichess.org. The biggest novelty of Maia's approach was that they actually segmented out the models, to predict moves played at different rating levels. Because of this, Maia could actually be thought of as a collection of models to predict moves at different levels. Maia-1 predicts moves played at the 1100-1199 range, Maia-2 predicts moves played at the 1200-1299 range, and so on.

![Post Image](https://www.microsoft.com/en-us/research/uploads/prod/2020/11/Figure3_AIandChess_high-res-1024x571.jpg)

As you can see from this graph, the different levels of Maia performed better at their own rating than the other ratings. For example, Maia-4 was the best predictor of 1400-1499 players, and Maia-4 predicted these players better than it predicted 1300 or 1500 rated players.

Overall, Maia had incredibly impressive results. If you're interested in learning more about Maia, check out the [source code](https://github.com/CSSLab/maia-chess), or a blog post published by [Microsoft](https://www.microsoft.com/en-us/research/blog/the-human-side-of-ai-for-chess/).
