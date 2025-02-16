---
title: Compressing Chess Board States for Reinforcement Learning
description: An exploration of methods to compress chess board states for reinforcement learning applications.
date: "2020-10-26"
categories:
  - blog
---

During the week, I did a scan of the literature to see what prior research had been done on biased players in chess and poker. I found a few papers on how _computers_ can be programmed to be biased, but it wasn’t especially relevant. I found one paper, [Game Theory Optimal Solutions and Poker](https://www.pokernews.com/strategy/game-theory-optimal-solutions-and-poker-a-few-thoughts-22654.htm), that discussed the metagame of top-level poker. However, poker seems like a much harder domain to explore suboptimal moves due to its complexity.

Chess does have its own issues as a domain – it has a huge state space [estimated](https://www.chessprogramming.org/Chess) at 10^46, meaning that even with a very large database like Chessbase or Lichess, only a tiny amount of states past the opening will share states, making it difficult to compare different agents against each other. The state representation itself is also very large, since we have 64 squares on the board, and up to 16 pieces that we need to place on the board, along with other factors like en-passant options, castling, etc.

Additionally, the notion of reward is much harder to articulate in the chess domain over the gridworld domain. Generally, we would like to say that a human would like to maximize the [evaluation](https://www.chessprogramming.org/Evaluation) or expected score of their position.

I met again with CJ on Friday to update him on my progress and discuss these issues. He suggested that the key to solving these issues would be a good representation of the state space. I came up with an idea to compress an entire board state into just a few numbers that would drastically reduce the state space.

With this in mind, the next step was to actually figure out the compression method – how do we take a board state and turn it into a list of numbers? CJ reminded me during the meeting that the specific compression method doesn’t really matter for the purposes of the rotation as long as it works.

As I was thinking about this, I realized that engines like the open-source [Stockfish](https://hxim.github.io/Stockfish-Evaluation-Guide/) actually do this component breakdown as part of their overall evaluation method, and I could just borrow the evaluation terms for my own use. Since Stockfish doesn’t provide this breakdown as part of the normal use, I couldn’t just use the standard Python modules like [python-chess](https://python-chess.readthedocs.io/en/latest/) or [Stockfish](https://pypi.org/project/stockfish/).

Currently, I have three main functions – `evaluate()`, `get_best_move()`, and `get_next_states()`. `evaluate()` takes in a FEN position and an optional next move parameter, and returns a tuple for the position, showing the component breakdown given by Stockfish. In order to reduce the state space, I’m optimizing the evaluation process.

My next steps will involve using a large database (like [lichess](https://database.lichess.org/)) to construct a comprehensive state space using the compressed board positions. Not only can I use the optimal moves in each position (which are already given in many of the games), but I can also analyze the effectiveness of the compression method.
