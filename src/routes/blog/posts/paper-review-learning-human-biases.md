---
title: Paper Review: Learning Human Biases in IRL
description: A review of the paper discussing the feasibility of learning human biases for reward inference in inverse reinforcement learning.
date: "2020-11-01"
categories:
  - research
published: true
---

In my Intro to Grad Studies class, we have been given an assignment to do an in-depth paper review for each of our rotations. I already posted a general literature review summarizing the key concepts in inverse reinforcement learning (IRL), and for this assignment, I've chosen to write about the paper: **[On the Feasibility of Learning, Rather than Assuming, Human Biases for Reward Inference](http://proceedings.mlr.press/v97/shah19a/shah19a.pdf)**.

In the paper, the authors model agents with several types of biases – naïve/sophisticated agents (which suffer from hyperbolic time discounting), overconfident/underconfident agents (which incorrectly estimate probabilistic events), and myopic agents (which suffer from the horizon effect).

The architecture of the model is based on a differentiable planner called a value iteration network (VIN). There are two approaches to learning the agent's biases and rewards – learning the planner from known rewards before learning new rewards and learning both the planner and rewards simultaneously. Shah et al. run several experiments on the different models and assumptions and find that these automatically learned biases tend to work just as well, or just slightly better, than standard IRL approaches. The issue is that the gains from learning the biases are offset by the downgrade from an exact approach to the differentiable NN approach. The authors claim that with better differentiable planners, this downside can be mitigated.

### Novelty

As stated before, the novelty of this paper comes from the approach – instead of assuming biases during the inverse learning process, the model makes no assumptions on the structure of the agent reward; the only information it learns from are the observed trajectories of the agents. The agents themselves are programmed with the biases, but the learning algorithm doesn't know about these bias options – it isn't selecting between a list of options; it has to learn the behavior of each of these agents independently.

As a result, this new approach is very significant in the area of learning agent actions. While the results from this paper specifically were not especially impressive (generally improved only slightly on the state-of-the-art results), the overall approach has a much higher ceiling for success because it doesn't require any human knowledge or insight, so it can surpass the best human efforts. This is especially useful in areas where human experts don't fully understand all of the underlying processes (in this case, how the mind works).

### Critiques

Overall, I thought the paper was quite complete. A few comments I have:

- The paper only really discusses the gridworld domain. While this makes sense due to the complexity of real-world domains and the authors do mention this limitation in the conclusion section, there isn't any discussion on which human domains could benefit from the new approach.
- The authors claim that "differentiable planners will become more practical, they can make this idea practical as well," but it would be helpful to cite some other papers to show how differentiable planners have been improving over time. Otherwise, it's possible that optimal differentiable planners may not be achievable in the near future.

This exploration into learning human biases in IRL highlights the importance of understanding the underlying assumptions in machine learning models. If you're interested in the paper and further details, please check out the [original paper](http://proceedings.mlr.press/v97/shah19a/shah19a.pdf).
