---
title: Finding Missing Moves in a Chess Scoresheet
description: An exploration of the challenges faced when analyzing chess scoresheets and the algorithm developed to find missing moves.
date: "2019-06-21"
categories:
  - chess
published: true
---

In this post, we will explore the common challenges faced by players when analyzing chess games from scoresheets, particularly when there are missing moves. We will also discuss an algorithm designed to find these missing moves.

## Digitizing Chess Scoresheets Project

When analyzing prior games from a scoresheet, one very common challenge faced especially by new or scholastic players is when there is an error in the chess notation. Maybe the player forgot to notate a pair of moves. In chess, normally a _move_ refers to a pair of two moves - one for White, and one for Black. The term _ply_ is used for a single half-move. However, in this post, I will be using the term _move_ to refer to half-moves, as the term _ply_ is more unknown to general audiences.

For example, a player might be trying to analyze their 60-move game but skipped notating for both sides on moves 12 and 13. If the player can't remember what these moves were, it essentially invalidates the remaining 47 moves, as the player won't be able to analyze these moves as well.

One solution might be to just try to make random moves on move 12 just to continue getting through the game. However, if they pick the wrong move, not only will the analysis be flawed for the rest of the game, they might not even realize they picked the wrong move until far in the future.

## Finding Missing Moves Algorithm

To solve this problem, I've developed a simple algorithm which can determine what the missing move in a game notation is, based on the legality of future moves. Better yet, the algorithm will still work if there are multiple missing moves, with the limitation that the code becomes exponentially slower with more missing moves. Below, I describe what the algorithm is, and then I will give a simple example showing how this code works.

### Description of Algorithm

1. The algorithm takes in a list of moves, which each move represented as a [Algebraic Notation](<https://en.wikipedia.org/wiki/Algebraic_notation_(chess)>) string, and missing moves represented as None values.
2. The algorithm initializes the game state and iterates through possible moves to find valid sequences.

### Algorithm Code

Below I show my implementation of the code to serve as a reference while reading through the walkthrough. All chess-specific calls I have to make, including updating the board, checking legal moves, and getting the current board state were done through the [python-chess](https://pypi.org/project/python-chess/) library.

```python
import chess

def find_missing_moves(moves):
    # Implementation of the algorithm
    board = chess.Board()
    for move in moves:
        if move is not None:
            board.push_san(move)
        else:
            # Logic to find the missing move
            pass
```

At this game state, it turns out there are 27 legal moves: Ng5, Nxe5, Nh4, Nd4, Ng1, Rg1, Ba6, Bb5, Bc4, Bd3, Be2, Ke2, Qe2, Nc3, Na3, h3, g3, d3, c3, b3, a3, h4, g4, d4, c4, b4, and a4.

At this point, the algorithm iterates through all 27 possible branches and tries to finish the game. In the first iteration, the algorithm will attempt to validate that ['e4', 'e5', 'Nf3', 'Nc6', 'Ng5', 'a6', 'Ba4'] is a legal sequence of moves. Unfortunately, Ba4 is not a legal move with the first six given moves. Then the algorithm will try ['e4', 'e5', 'Nf3', 'Nc6', 'Nxe5', 'a6', 'Ba4'], and so on, until it has gone through every list of legal moves.

It turns out in this case that Bb5 is the only move which causes the entire list of moves to be valid, something that any competitive chess player could have instantly told you!

## Conclusion

This exploration into finding missing moves in chess scoresheets highlights the importance of accurate notation and the potential for algorithms to assist players in analyzing their games. If you're interested in the code and further details, please check out the [GitHub repository](https://github.com/saumikn/finding-missing-chess-moves).
