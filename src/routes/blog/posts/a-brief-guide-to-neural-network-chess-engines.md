---
title: A Brief Guide to Neural Network Chess Engines
description: A Brief Guide to Neural Network Chess Engines
date: '2021-01-18'
categories:
  - sveltekit
published: true
---

Last week, I wrote an [article](https://saumikn.com/blog/guide-to-traditional-chess-engines/) explaining the basics on traditional chess engines. Today, I will go over the new generation of chess engines, using neural networks instead of brute force evaluation.

**History**

For decades, neural networks were thought to be inferior to traditional brute-force engines because training a strong NN required far too much processing power, and NNs couldn't analyze as many positions as quickly. This was borne out in practice, as traditional engines like Stockfish or Komodo were far stronger than the various NN-based engines out there like [Giraffe](https://www.chessprogramming.org/Giraffe).

However, in 2015 DeepMind announced a new engine out of nowhere called AlphaGo, which represented a monumental leap forward for AI engines. AlphaGo was the first engine to ever beat the Go World Champion, and proved the viability of NN-based engines.

In 2017, DeepMind announced a new engine called AlphaZero, which significantly improved on the prior AlphaGo. While AlphaGo only was able to play Go, and was trained using human games as an input, AlphaZero was trained from scratch, and could play Chess, Shogi, and Go - all at state of the art levels.

While DeepMind did release papers describing their work, the algorithms and models themselves were all closed-source. Chess enthusiasts wanted to take advantage of this revolution as well. But without the limitless computing power granted by Google, a project was instead set up to crowdsource training power. In 2018, Leela Chess was born, and by 2019, it was at the top of the world for chess engines.

**Training Alpha Zero**

How exactly do these neural network engines work? Last week, we saw that traditional engines work by analyzing trees of variations, and applying a human-tuned evaluation function at the end of each variation.

![Post Image](https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/MCTS-steps.svg/800px-MCTS-steps.svg.png)

Alpha Zero works slightly differently. The key to AZ is the Monte Carlo Tree Search algorithm. MCTS is a four-step process to building out a tree. First, AZ will select a new node in the tree. This selection process weights both exploration and exploitation using the PUCT algorithm, meaning that more promising nodes (the nodes which seem better so far) tend to be explored more often, but nodes that haven't been explored much so far also get a chance for expansion.

Once a new node is selected, it is then evaluated by expanding out the children nodes. Finally, the results from the game simulation are expanded back across the entire tree. Then the process repeats again, using the updated values in the tree.

**Neural Network Architecture**

![Post Image](https://nikcheerla.github.io/deeplearningschool//media/alphago_arch.png)

So where do the neural networks come into play? It turns out that the entire evaluation process is guided by by a deep convolutional network, with 40 residual layers. The initial network is initialized with completely random parameters, meaning that there is no  knowledge of the game other than the basic rules. Hence, the "Zero" in AlphaZero.

Every time a new position is analyzed from the MCTS, the results are encoded into the NN. In return, the NN allows us to calculate a "value head" and "policy head" for any given state. The policy head is used to guide the MCTS into choosing better and more relevant moves, while the value head allows us to concretely evaluate positions.

By applying the NN to different MCTS evaluations, we can update the network using techniques like backpropagation. In a traditional machine learning sense, we can think of the MCTS rollouts as ground-truth for the neural network. The novelty is that the network is actually used to generate better ground-truth samples for training.

With this flow in mind, the only step left is to start training! The training process is conceptually very simple, just have AZ play thousands of games against itself, updating the network after each game. It took DeepMind just four hours of training this way to surpass the previous leader in engine play - Stockfish 9.

**Conclusion**

After reading this post, you will hopefully have a general idea on how neural network engines work, and how they are different from traditional engines. Next week, I'll have one more post on the most recent advancement in computer chess, and go over Stockfish NNUE, a new model which combines the benefits of both traditional engines and neural networks. See you then!

