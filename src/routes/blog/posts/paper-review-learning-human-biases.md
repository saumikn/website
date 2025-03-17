---
title: Paper Review: Learning Human Biases in IRL
description: A review of the paper discussing the feasibility of learning human biases for reward inference in inverse reinforcement learning.
date: "2020-11-01"
categories:
  - research
published: true
---

In my Intro to Grad Studies class, we have been given an assignment to do an in-depth paper review for each of our rotations. I already [posted](https://web.archive.org/web/20240621053205/https://saumikn.com/blog/biased-inverse-reinforcement-learning/) a general literature review summarizing a few papers related to my rotation research area, but this assignment is also requiring us to elaborate on the novelty of the paper and provide some critiques of the paper, in addition to the summary.

For this assignment, I’ve chosen to write about the paper: [On the Feasibility of Learning, Rather than Assuming, Human Biases for Reward Inference](https://web.archive.org/web/20240621053205/http://proceedings.mlr.press/v97/shah19a/shah19a.pdf).

## Summary

Prior literature has explored the idea of using inverse reinforcement learning to learn the reward functions of biased agents, for example [1][2][3]. However, each of these papers made key assumptions about the nature of the agent, which could lead to bad results if an IRL system made an incorrect assumption about biases. This paper aims to learn the nature of biased agents directly, without making any assumptions about the agent.

In the paper, the authors model agents with several types of biases – naïve/sophisticated agents (which suffer from hyperbolic time discounting), overconfident/underconfident agents (which incorrectly estimate probabilistic events), and myopic agents (which suffer from the horizon effect).

The architecture of the model is based on a differentiable planner called a value iteration network (VIN). There are two approaches to learning the agent’s biases and rewards – learning the planner from known rewards before the learning new rewards and learning both the planner and rewards simultaneously. A key step for this second approach is to initialize a near-optimal planner to start off with – this turns out to be crucial for good performance overall.

Shah et al. run several experiments on the different models and assumptions and find that these automatically learned biases tend to work just as well, or just slightly better, than standard IRL approaches. The issue is that the gains from learning the biases are offset by the downgrade from an exact approach to the differentiable NN approach. The authors claim that with better differentiable planners, this downside can be mitigated.

## Novelty

As stated before, the novelty of this paper comes from the approach – instead of assuming biases during the inverse learning process, the model makes no assumptions on the structure of the agent reward, the only information it learns from are the observed trajectories of the agents. The agents themselves are programmed with the biases, but the learning algorithm doesn’t know about these bias options – it isn’t selecting between a list of options, it has to learn the behavior of each of these agents independently.

As a result, this new approach is very significant in the area of learning agent actions. While the results from this paper specifically were not especially impressive (generally improved only slightly on the state-of-the-art results), the overall approach has a much higher ceiling for success because it doesn’t require any human knowledge or insight, so it can surpass the best human efforts. This is especially useful in areas where human experts don’t fully understand all of the underlying processes (in this case how the mind works). Overall, this change in approach is equivalent to the shift from using hand trained models to computer-learned features in the area of machine learning. Of course, this was only possible due to improved algorithms and more data, the authors do agree that better algorithms in differentiable planning will lead to further improvements in results.

## Critiques

Overall, I thought the paper was quite complete. A few comments I have:

- The paper only really discusses the gridworld domain. While this makes sense due to the complexity of real-world domains and the authors do mention this limitation in the conclusion section, there isn’t any discussion on which human domains could benefit from the new approach
- The authors claim that “differentiable planners will become more practical, they can make this idea practical as well”, but it would be helpful to cite some other papers to show how differentiable planners have been improving over time. Otherwise, it’s possible that optimal differentiable planners have hit a plateau, with negative implications for the new automatic learning approach.
- Finally, the results by themselves aren’t very impressive, since it is roughly the same as the prior results. Of course, this is still noteworthy since we are using an all new algorithm, but I would like to see a few more varied experiments (varied gridworld sizes, varied degrees of bias), to get a better understanding of the strengths and weaknesses of the novel approach. This wouldn’t require any more work in developing new agents or more complicated domains, just adjusting the parameters of what already exists
