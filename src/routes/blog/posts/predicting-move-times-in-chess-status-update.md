---
title: Predicting Move Times in Chess - Status Update
description: An update on the progress of predicting move times in chess, including techniques and preliminary results.
date: '2021-04-05'
categories:
  - chess
  - research
published: true
---

## Summary

In this status update, I will summarize the progress made in predicting move times in chess, the techniques employed, and the preliminary results obtained.

## Game Details

- **White Elo**: 2100
- **Black Elo**: 2000
- **White Rating Difference**: -4
- **Black Rating Difference**: +1
- **White Title**: FM
- **ECO**: B30
- **Opening**: Sicilian Defense: Old Sicilian
- **Time Control**: 300+0
- **Termination**: Time forfeit

## Move Sequence

```
1. e4 { [%eval 0.17] [%clk 0:00:30] } 1... c5 { [%eval 0.19] [%clk 0:00:30] }
2. Nf3 { [%eval 0.25] [%clk 0:00:29] } 2... Nc6 { [%eval 0.33] [%clk 0:00:30] }
3. Bc4 { [%eval -0.13] [%clk 0:00:28] } 3... e6 { [%eval -0.04] [%clk 0:00:30] }
4. c3 { [%eval -0.4] [%clk 0:00:27] } 4... b5? { [%eval 1.18] [%clk 0:00:30] }
5. Bb3?! { [%eval 0.21] [%clk 0:00:26] } 5... c4 { [%eval 0.32] [%clk 0:00:29] }
6. Bc2 { [%eval 0.2] [%clk 0:00:25] } 6... a5 { [%eval 0.6] [%clk 0:00:29] }
7. d4 { [%eval 0.29] [%clk 0:00:23] } 7... cxd3 { [%eval 0.6] [%clk 0:00:27] }
```

## Techniques Employed

To solve the issues related to data size, I employed several techniques:

1. **Binary Board Representation**: I utilized the `np.packbits()` function to compress eight boolean values into a single byte of memory.
2. **HDF5 File Format**: All data pieces were saved into a Hierarchical Data Format (HDF5) file, allowing for efficient loading of compressed data into memory without overfilling the system. This also enabled grouping batches of games together to improve saving and loading time.

## Data Reconstruction

When training the models, it was crucial to correctly reconstruct the data. I set up a Keras Data Generator that retrieves prior positions and positions the metadata correctly into a 123x64 matrix. This reconstruction code was surprisingly complex and required significant debugging.

## Results

Unfortunately, the two models I had time to train for this status update yielded preliminary results. Both the MAE model and the CRPS-Beta model had final validation losses of 0.0332%. This was unexpected, as we anticipated that the Beta distribution would encode more information. However, the results were still somewhat positive, as the CRPS-Beta model reached peak validation loss in significantly fewer epochs than the MAE model.

## Next Steps

Moving forward, I plan to refine the models further and explore additional techniques to enhance prediction accuracy.

For more information, you can check out the following resources:

- [Lichess About](https://lichess.org/about)
- [Lichess Database](https://database.lichess.org/)
- Taillardat, M, O Mestre, M Zamo, and P Naveau. 2016. “Calibrated Ensemble Forecasts Using Quantile Regression Forests and Ensemble Model Output Statistics.” Monthly Weather Review 144: 2375–93.
