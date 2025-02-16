---
title: Wrapping up Learning Chess Biases and Proposed Next Steps
description: A summary of my research on learning chess biases and the next steps in this exploration.
date: "2020-11-15"
categories:
  - chess
  - research
published: true
---

# Introduction

In this post, I will summarize my findings on learning biases in chess and outline the proposed next steps for my research.

## Completed Work

While these papers' preliminary results showed promise in learning the reward functions of biased agents, each of these models held specific assumptions on the nature of the bias, which could lead to even worse results than traditional Inverse Reinforcement Learning (IRL) if the model's assumption about the nature of the bias was incorrect.

In 2019, Shah et al. explored a new approach to see if these biases could be learned during the model along with the reward function. Using several novel techniques for this application, such as the use of a value iteration network and pretraining near-optimal agents from a subset of known rewards, the authors were able to achieve a slight improvement in agent understanding for a toy gridworld domain. In addition, the authors claim that with an improvement in available differentiable planners, this method would work even better.

## Data Collection

Using this board representation, we started the process of collecting data, using the free database of games provided at Lichess.org. We decided to structure our data in the form of board states and collect three key pieces of information per data point – the vector representation of the current board state, the vector representation of the board state after the player makes their move, and the vector representation of the board state after the engine's optimal move. In total, my dataset contained 100 games of each of the 50 highest-rated players on Lichess in the "Blitz" category.

With this dataset of 1000-2000 points for each of the 50 players, our first approach was to see if these actions were separable by player. Because the vectors we calculated represent states, we can just subtract the board positions before and after a move has been played to get the vector representation of the move.

## Results

From this data, we can see that the initial position feature helped significantly, but the piece type didn't help very much. One note is that all of these accuracy values are very low, all below 4%. While these values by themselves aren't very good results, they still represent an increase over the baseline accuracy of 2%, since we are dealing with a 50-class problem, so these results show at least a little promise.

So far, we have only made comparisons between individual moves to determine if the players are biased. However, this only tells part of the story. In fact, what we really want to do is compare the distributions of moves that players play and see if and how this distribution systematically differs between players.

## Proposed Next Steps

Next, we would like to perform experiments to learn the nature of possible biases among chess players by adding ground truth to our data. Currently, our base classifier only classifies the differences between players, without giving us any practical understanding of how the players differ. With our modified k-means classifier, we can distinguish between clusters of players, but again, we have no understanding of how the players differ, or what the clusters represent. Our preliminary results do suggest that the clusters differ in meaningful ways, but our biggest task is to now determine how.

One experiment would involve varying the rating level of the players in our data. Currently, we only have data on the top 50 players on the Lichess Blitz leaderboard. These players are all roughly the same strength and are all at the 100th percentile of players on Lichess. By adding players at other percentiles, we can start to learn the differences between how players select actions at different levels.

Another experiment would be to vary the nature or conditions of the games played. Instead of only taking online blitz games (a specific time control which requires players to play relatively quickly), we could take different types of time controls. We could also compare online games versus over-the-board games to see how the context of play affects decision-making.

Overall, this first rotation has been a lot of fun, and I have learned a great deal about biases in chess. I look forward to continuing this research and exploring the complexities of player behavior in future studies.

## Citations

- Shah et al. - [https://arxiv.org/pdf/1512.05832](https://arxiv.org/pdf/1512.05832)
- Evans et al. - [https://arxiv.org/abs/1512.05832](https://arxiv.org/abs/1512.05832)
- Kaebling et al. - [https://arxiv.org/pdf/cs/9605103.pdf](https://arxiv.org/pdf/cs/9605103.pdf)
- Ng and Russell - [https://ai.stanford.edu/~ang/papers/icml00-irl.pdf](https://ai.stanford.edu/~ang/papers/icml00-irl.pdf)
- Majumdar and Pavone - [https://arxiv.org/abs/1710.11040](https://arxiv.org/abs/1710.11040)
- Reddy et al. - [https://arxiv.org/abs/1805.08010](https://arxiv.org/abs/1805.08010)
