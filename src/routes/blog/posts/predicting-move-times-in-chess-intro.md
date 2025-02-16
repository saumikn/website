---
title: Predicting Move Times in Chess - Intro
description: An introduction to predicting move times in chess using machine learning techniques.
date: "2021-03-15"
categories:
  - blog
  - chess
published: true
---

In this post, we will explore the problem of predicting move times in chess and the methodologies that can be employed to tackle this challenge.

## Problem

The dataset for building these models comes from Lichess.org. Lichess is an open-source chess server and one of the most popular chess websites in the world. Over three million games are played on Lichess every day, by human players at all skill levels. I will be making use of the free data available from Lichess to analyze player behavior and predict move times.

Each game in the database consists of a record of the specific moves played during the game, along with some metadata about the game, including the game date, time control, result of the game, and basic information about both players (username, ELO rating). Using the username, I may also incorporate player metadata into the model.

## Analysis

Our move-time predictor will take in several input features from the data. First and foremost, I will be using the specific game position, including both the state of pieces on the board and the amount of time that both players currently have. Additionally, I will likely use game metadata, and I may use player metadata as well. I anticipate that a large portion of this project will simply involve feature selection - there is a very large set of potential features I could use for our predictor, and it may be interesting to simply analyze which features are most useful for our prediction task.

For the prediction model itself, I propose to use this problem set and data to compare the results between a non-Bayesian approach (ordinary linear regression) and a Bayesian approach (Bayesian linear regression). For this Bayesian approach, we have a choice between many different priors, and I will explore which ones yield the best results.

## Conclusion

This introduction sets the stage for a deeper exploration into the methodologies and techniques that can be employed to predict move times in chess. Stay tuned for further posts where I will delve into the specifics of the models and the results of my analyses.
