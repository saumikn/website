---
title: Classifying Player Moves using Random Forests
description: An exploration of using Random Forests for classifying chess player moves.
date: "2020-11-09"
categories:
  - blog
  - chess
published: true
---

In this post, I will discuss my recent work on classifying chess player moves using Random Forests, a popular machine learning algorithm. The goal is to analyze player behavior and identify distinct styles associated with their moves.

## Introduction

Over the last week, I've mainly been expanding on my work from last week, with the dataset of moves represented as differences of [compressed chess board states](https://saumikn.com/blog/compressing-chess-states/). In my blog post last week, I generated a dataset of 10 players and plotted the results. The first thing I did this week was to generate a bigger dataset, this time with 50 players!

## Data Collection

The process for this was the same as before; I took the 50 highest-rated blitz players on Lichess and parsed moves 10-30 in their 100 most recent games. This gives us 1000-2000 moves per player, and a total dataset size of about 81,000 moves.

## PCA Dimension Reduction

Applying the same [PCA dimension reduction](<https://en.wikipedia.org/wiki/Dimensionality_reduction#Principal_component_analysis_(PCA)>) process as last week, I generated the data plot below.

![PCA Plot](https://saumikn.com/wp-content/uploads/2020/11/player-bias-plot-2.png)

## Classification Models

In order to test if the moves are separable by player, I built a few multi-class classification models using [scikit-learn](https://scikit-learn.org/stable/modules/generated/sklearn.decomposition.PCA.html) to see if we can actually predict which of the players in my dataset played an unseen move. It turns out that building classification models in scikit-learn is very easy! Just look at the following code:

```python
cross_val_score(RandomForestClassifier(), X1, y)
cross_val_score(LogisticRegression(), X1, y)
cross_val_score(KNeighborsClassifier(), X1, y)
```

In just three lines of code, we've built three different classification models - [Random Forests](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestClassifier.html), [Logistic Regression](https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LogisticRegression.html), and [K-Neighbors Classifier](https://scikit-learn.org/stable/modules/generated/sklearn.neighbors.KNeighborsClassifier.html).

## Conclusion

The development of these classification models has the potential to provide valuable insights into how different players approach the game of chess. By leveraging machine learning techniques, we can better understand player strategies and improve our ability to analyze chess moves.

If you're interested in the code and further details, please check out the [GitHub repository](https://github.com/saumikn/classifying-player-moves).
