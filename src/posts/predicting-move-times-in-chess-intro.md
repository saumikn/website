---
title: Predicting Move Times in Chess - Intro
description: Predicting Move Times in Chess - Intro
date: '2021-03-15'
categories:
  - sveltekit
published: true
---

**Problem**

During a chess game, players are constantly making decisions and evaluating the current state to increase their odds of winning. The process of analyzing positions is a problem that AI has already achieved superhuman performance on, and the use of these computer "engines" is essential for chess players who are trying to improve their playing strengths.

However, one often underestimated aspect of playing chess is determining the amount of time that the player should spend on any particular move. During a typical game, players have a set amount of time that they are allowed to think while on their turn, and the player immediately loses if they exceed this time limit. Many chess players struggle with time management, spending too much time on some moves, and not enough time on other moves.

Despite this, there has been little to no effort to develop algorithmic models to determine the optimal amount of time a human should spend on a given move, likely due to its subjectiveness. In general, computers "think" very differently from humans, so determining the optimal amount of time a computer should think for a given move is not very relevant for a human player.

In this project, I aim to take the first steps towards solving this problem, by building a model to predict a distribution for how much time a generic human player would spend thinking on any given move. In doing so, I would begin to give computer engines a better understanding of human thought. I hope that future work may be able to leverage this understanding to build tools for teaching humans better time management.

**Data**

The dataset for building these models comes from Lichess.org. Lichess is an open-source chess server and one of the most popular chess websites in the world. Over three million games are played on Lichess every day, by human players at all skill levels. I will be making use of the free database provided by Lichess, with over 1.9 billion games as of February 2021.

Each game in the database consists of a record of the specific moves played during the game, along with some metadata about the game, including the game date, time control, result of the game, and basic information about both players (username, ELO rating). Using the username, I may also lookup the general statistics of the player. All games played since April 2017 (about 92% of the dataset) have additional metadata on how much time a user spent on any particular move. About 6% of games in the dataset contain have Stockfish analysis evaluations, where Stockfish is the leading chess engine available for analysis.

**Analysis**

Our move-time predictor will take in several input features from the data. First and foremost, I will be using the specific game position, including both the state of pieces on the board and the amount of time that both players currently have. Additionally, I will likely use game metadata, and I may use player metadata as well. I anticipate that a large portion of this project will simply involve feature selection - there is a very large set of potential features I could use for our predictor, and it may be interesting to simply analyze which features are most useful for our prediction task.

For the prediction model itself, I propose to use this problem set and data to compare the results between a non-Bayesian approach (ordinary linear regression) and a Bayesian approach (Bayesian linear regression). For this Bayesian approach, we have a choice between many different priors. In general, a player with <em>s</em> seconds on their clock can take anywhere between 0 and <em>s</em> seconds on their move. A simple prior would therefore be a uniform distribution between 0 and <em>s</em>. However, a more realistic prior distribution may be a Beta distribution, parametrized to peak at some value between 0 and <em>s</em>.

To evaluate and compare our linear regressor and Bayesian linear regressor, I propose to use the Continuous Ranked Probability Score (CRPS). CRPS is a proper scoring method that measures accuracy for probabilistic distributions. The benefit of using CRPS is it generalizes to the mean absolute error for point estimates, meaning we can directly compare between probabilistic distributions and point estimates. Also, CRPS is measured in the same units as the input, giving interpretability to our results.

**References**

[https://lichess.org/about](https://lichess.org/about)<br/>[https://database.lichess.org/](https://database.lichess.org/)<br/>[https://link.springer.com/chapter/10.1007/978-94-010-1276-8_18](https://link.springer.com/chapter/10.1007/978-94-010-1276-8_18)

