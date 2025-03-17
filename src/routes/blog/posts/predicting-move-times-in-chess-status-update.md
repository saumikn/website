---
title: Predicting Move Times in Chess - Status Update
date: '2021-04-04'
categories:
  - chess
  - research
published: true
---

## Summary

For this project, I am comparing the abilities of Bayesian and non-Bayesian neural networks as a predictor for how much time a chess player will use to make their move in a certain chess position, taking into account the piece placement on the board as well as game metadata.

Over the last month, the majority of my effort has gone towards data collection and processing. More recently, I have started to work on implementing, training, and evaluating preliminary regression models using the CRPS metric.

## Dataset

The dataset for these experiments comes from Lichess, an open-source chess server, and one of the most popular chess websites in the world. Lichess freely makes available all of the games which have been played on the website since January 2013, a total of about 2.07 billion games. However, none of the games before April 2017 include metadata about move times. In this study, we limit ourselves to data since April 2017, about 1.92 billion games. These data files are stored as compressed text files, and take up about 455GB of storage space.
While the raw data takes up a reasonable amount of space, extracting useful features quickly balloons the amount of storage space needed. Consider the following sample game from the data:

```
[Event "Rated Bullet tournament https://lichess.org/tournament/yc1WW2Ox"]
[Site "https://lichess.org/PpwPOZMq"]
[Date "2017.04.01"]
[Round "-"]
[White "Abbot"]
[Black "Costello"]
[Result "0-1"]
[UTCDate "2017.04.01"]
[UTCTime "11:32:01"]
[WhiteElo "2100"]
[BlackElo "2000"]
[WhiteRatingDiff "-4"]
[BlackRatingDiff "+1"]
[WhiteTitle "FM"]
[ECO "B30"]
[Opening "Sicilian Defense: Old Sicilian"]
[TimeControl "300+0"]
[Termination "Time forfeit"]

1. e4 { [%eval 0.17] [%clk 0:00:30] } 1... c5 { [%eval 0.19] [%clk 0:00:30] }
2. Nf3 { [%eval 0.25] [%clk 0:00:29] } 2... Nc6 { [%eval 0.33] [%clk 0:00:30] }
3. Bc4 { [%eval -0.13] [%clk 0:00:28] } 3... e6 { [%eval -0.04] [%clk 0:00:30] }
4. c3 { [%eval -0.4] [%clk 0:00:27] } 4... b5? { [%eval 1.18] [%clk 0:00:30] }
5. Bb3?! { [%eval 0.21] [%clk 0:00:26] } 5... c4 { [%eval 0.32] [%clk 0:00:29] }
6. Bc2 { [%eval 0.2] [%clk 0:00:25] } 6... a5 { [%eval 0.6] [%clk 0:00:29] }
7. d4 { [%eval 0.29] [%clk 0:00:23] } 7... cxd3 { [%eval 0.6] [%clk 0:00:27] }
8. Qxd3 { [%eval 0.12] [%clk 0:00:22] } 8... Nf6 { [%eval 0.52] [%clk 0:00:26] }
9. e5 { [%eval 0.39] [%clk 0:00:21] } 9... Nd5 { [%eval 0.45] [%clk 0:00:25] }
10. Bg5?! { [%eval -0.44] [%clk 0:00:18] } 10... Qc7 { [%eval -0.12] [%clk 0:00:23] }
11. Nbd2?? { [%eval -3.15] [%clk 0:00:14] } 11... h6 { [%eval -2.99] [%clk 0:00:23] }
12. Bh4 { [%eval -3.0] [%clk 0:00:11] } 12... Ba6? { [%eval -0.12] [%clk 0:00:23] }
13. b3?? { [%eval -4.14] [%clk 0:00:02] } 13... Nf4? { [%eval -2.73] [%clk 0:00:21] } 0-1
    There are 26 different chess positions embedded in this single game example, one position for each move for both white and black. Each position is represented by a 13×64 matrix, seven additional 13×64 matrices which designate the previous seven board states, an 1858-length feature to represent legal moves in the position, and approximately nineteen relevant metadata values which are held constant through the entire game. Reshaping the data to give us a valid matrix shape for a neural network, we end up with a 123×64 floating point matrix. If we were to store the complete data for each matrix in storage, this would occupy over 760 TB of storage.
```

Since our data is very sparse, using an off-the-shelf data compressor such as GZIP does help, and reduces the storage requirement to only 20TB. However, this is still too large for our storage capabilities. More importantly, loading compressed files are extremely slow and immediately leads to memory shortages, since our files are far too big to load into memory.

## Feature Extraction

To solve these issues, I employed a number of techniques to reduce the size of the data. First, I took advantage of the binary board representation and the `np.packbits()` function to compress eight boolean values into a single byte of memory. I also used `np.packbits()` to store the 1858-length legal moves feature into a 233-length byte array and to compress five boolean metadata values for a board position into a single byte of memory. I also extracted the other non-binary numeric metadata from the array and saved them as corresponding arrays with either `uint8` or `uint16` datatypes, rather than the default `int64`. Finally, I replaced all of the prior board states associated with the current position with pointers to other board states, so we only need to store one 13×64 matrix per position, not eight 13×64 matrices.

I then saved all of these data pieces into a Hierarchical Data Format (HDF5) file. HDF5 has two main benefits – I can load chunks of compressed data into memory without overfilling the system, and I can group batches of games together to improve saving and loading time. Specifically, I’m loading files into batches of 10,000 games, or about 65,000 positions per batch.

When it’s time to actually train our models, we need to correctly reconstruct our data. I set up a Keras Data Generator which correctly retrieves the prior positions and positions the metadata correctly into the 123×64 matrix. This reconstruction code was surprisingly not trivial, and it took me some time to debug everything that was going on.

In the end, I created a pipeline which can correctly extract features from raw data, compress these features into an HDF5 file, and load batches of features into Keras to call while fitting a model.

## Models

With my data processing pipeline, my next step was to actually start training models. For ease of iteration, all models trained for this status update only use the 11.3 million games played in April 2017.
The first model I implemented was a simple (non-Bayesian) neural network. The input to this model were the four most relevant pieces of metadata to the problem – the starting time, starting increment, current amount of time remaining, and current remaining time of the opponent. I used three hidden layers of size 64 in the network. The output to this network is a single point-estimate of the amount of time the user spent in this position, as a percentage of the amount of time available. When training the model, the loss function I used was Mean Absolute Error(MAE).

The second model I implemented was another simple (non-Bayesian) neural network. The inputs to this model and the number of hidden layers were the same as in the first model. The only difference was my model had two outputs, corresponding to $\alpha$ and $\beta$ in the Beta distribution. The Beta distribution applies to this prediction function very well for two reasons. The first is that the output of possible values is very asymmetric. The second is that the outputs of my model are constrained to the range [0,1], so a Beta distribution is much more appropriate than a, say log-normal distribution would be. The below graph shows the distribution of all time percentages in the April 2017 dataset.

To train the model, I used the CRPS score of the Beta distribution with respect to the actual time. Initialy, I used the `crps_quadrature` method in Python’s properscoring module to calculate the CRPS. However, this numerical intergration approximation was proving to be quite slow. Instead, I found a closed form solution for the CRPS of a Beta distribution, provided in the paper Taillardat et al (2016). Below is the my implementation of the formula in Python.

```python
from scipy.special import gamma as G
from scipy.stats import beta
def crps_beta(y, pred):
    a, b = pred
    cdf0 = beta(a,b).cdf
    cdf1 = beta(a+1,b).cdf

    return a/(a+b) * (1-2*cdf1(y)) \
        - y * (1-2*cdf0(y)) \
        - 1/(a+b) * G(a+b)*G(a+0.5)*G(b+0.5)/(np.sqrt(np.pi)*G(a+b+0.5)*G(a)*G(b))
```

## Results

Unfortunately, the above two models were all I had time to train for the status update. I did generate preliminary results for both models though. As it turns out, both the MAE model and the CRPS-Beta model had final validation losses of 0.0332%. This is quite surprising since we would expect that the Beta distribution would encode more information. However, the results are still somewhat positive, since we found that the CRPS-Beta model reached the peak validation loss in many fewer epochs than the MAE model did.

## Next Steps

The most immediate next steps to take are to add more features to our move prediction algorithm. Specifically, I would like to add the position data into the model to quantify how much of an improvement (if at all) it helps prediction. Loading the position data is much slower and more RAM intensive, but it should still be very doable by the end of the month.

More critically, especially in the context of this class, my most important task is to set up a Bayesian neural network predictor. At the moment, my model only deals with Aleatoric Uncertainty, meaning uncertainty captured directly within the model. This uncertainty cannot be reduced with additional data, because in a given chess position, different players may use different amounts of time. It’s even possible for the same player to use different amounts of time for the same position. To capture this uncertainty, we predict parameters of a distribution instead of a direct point estimate.

However, our model also contains Epistemic Uncertainty or uncertainty as a result of lack of data. While my actual dataset is massive, over 760TB uncompressed, the data space that I’m working in is even more massive. There are approximately $10^{50}$ possible chess positions. As a result, even with the large amounts of data, using a Bayesian NN to model the epistemic uncertainty may be very useful.

## References

- https://lichess.org/about
- https://database.lichess.org/
- Taillardat, M, O Mestre, M Zamo, and P Naveau. 2016. “Calibrated Ensemble Forecasts Using Quantile Regression Forests and Ensemble Model Output Statistics.” Monthly Weather Review 144: 2375–93.
