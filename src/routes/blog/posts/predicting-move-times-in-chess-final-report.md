---
title: Predicting Move Times in Chess - Final Report
description: An in-depth analysis of predicting move times in chess, including methodologies, results, and implications.
date: '2021-05-04'
categories:
  - chess
  - research
published: true
---

## Summary

In this report, we explore the methodologies and results of predicting move times in chess. The analysis is based on a dataset of chess games, focusing on various factors that influence the time taken for each move.

## Data Overview

The dataset includes the following key attributes:

- **WhiteElo**: 2100
- **BlackElo**: 2000
- **WhiteRatingDiff**: -4
- **BlackRatingDiff**: +1
- **WhiteTitle**: FM
- **ECO**: B30
- **Opening**: Sicilian Defense: Old Sicilian
- **TimeControl**: 300+0
- **Termination**: Time forfeit

## Game Analysis

The following moves were recorded during the game:

```text
1. e4 { [%eval 0.17] [%clk 0:00:30] } 1... c5 { [%eval 0.19] [%clk 0:00:30] }
2. Nf3 { [%eval 0.25] [%clk 0:00:29] } 2... Nc6 { [%eval 0.33] [%clk 0:00:30] }
3. Bc4 { [%eval -0.13] [%clk 0:00:28] } 3... e6 { [%eval -0.04] [%clk 0:00:30] }
4. c3 { [%eval -0.4] [%clk 0:00:27] } 4... b5? { [%eval 1.18] [%clk 0:00:30] }
5. Bb3?! { [%eval 0.21] [%clk 0:00:26] } 5... c4 { [%eval 0.32] [%clk 0:00:29] }
6. Bc2 { [%eval 0.2] [%clk 0:00:25] } 6... a5 { [%eval 0.6] [%clk 0:00:29] }
7. d4 { [%eval 0.29] [%clk 0:00:23] } 7... cxd3 { [%eval 0.6] [%clk 0:00:27] }
```

## Feature Extraction

To solve the issues of predicting move times, several techniques were employed to reduce the size of the data. The binary board representation and the `np.packbits()` function were utilized to compress the data effectively.

All data pieces were saved into a Hierarchical Data Format (HDF5) file, allowing for efficient loading of compressed data into memory. The data was grouped into batches of 10,000 games, or approximately 65,000 positions per batch.

## Model Training

During the training phase, a Keras Data Generator was set up to reconstruct the data correctly. The reconstruction process was optimized using Numba, resulting in a speed increase of over 10x.

The pipeline created was capable of extracting features from raw data, compressing these features into an HDF5 file, and efficiently loading them for model training.

## Results

The investigation into aleatoric uncertainty revealed that the point estimate network had a final loss function of 3.59%, while the beta distribution estimate had a final loss function of 5.19%. This outcome was unexpected, as it was anticipated that the distribution network would encode more information.

The second investigation focused on epistemic uncertainty, with results illustrated in the following graph:

![Epistemic Uncertainty Results](/uploads/epistemic-1024x425.png)

## Conclusion

The findings from this report highlight the complexities involved in predicting move times in chess. The methodologies employed provide a foundation for future research in this area, with potential applications in enhancing chess engines and player training.

For further details, please refer to the full report and associated datasets.
