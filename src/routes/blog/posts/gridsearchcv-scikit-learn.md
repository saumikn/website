---
title: Using GridSearchCV in Scikit-Learn
description: A detailed explanation of how to use GridSearchCV for hyperparameter tuning in Scikit-Learn.
date: "2020-12-28"
categories:
  - blog
  - machine learning
published: true
---

For my final project in Data Mining, we were given a dataset, the [Wisconsin Breast Cancer Database](https://archive.ics.uci.edu/ml/datasets/Breast+Cancer+Wisconsin+%28Original%29), and asked to apply five different types of models to the data: KNN, Decision Tree, Random Forest, Polynomial SVM, Gaussian SVM, and a Multilayer Perceptron.

At first, this seemed like a very tedious and long assignment. Not only would we have to implement each of these models from scratch, we would need to implement multiple versions of each model. This is the kind of thing that we would do over the course of an entire semester in a machine learning course.

However, the professor allowed us to use existing machine learning packages for this assignment, significantly reducing the amount of effort that the assignment would take. In fact, using functionality inside of [Scikit-Learn](http://scikit-learn.org/), the code for this assignment was quite easy.

Not only does Scikit-Learn already have each of these model types implemented automatically, with arguments to easily modify the hyperparameters for the model, it includes a model selection module called [GridSearchCV](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.GridSearchCV.html) which makes it very easy to tune hyperparameters for a model.

Here's what the code for KNN looks like, assuming that data preprocessing is already taken care of:

```python
from sklearn.model_selection import GridSearchCV
from sklearn.neighbors import KNeighborsClassifier
import pandas as pd

# Define the parameter grid
params = {
    'n_neighbors': [1, 3, 5, 7, 9, 11],
    'metric': ['euclidean', 'manhattan', 'chebyshev']
}

# Set up the GridSearchCV
clf = GridSearchCV(KNeighborsClassifier(), param_grid=params, cv=10, scoring=['precision', 'recall', 'accuracy', 'f1'], refit='f1')
clf.fit(X_train, y_train)

# Convert results to DataFrame
df = pd.DataFrame.from_dict(clf.cv_results_)
df.drop(df.filter(regex=r'(split)|(std)|(params)|(rank)').columns, axis=1, inplace=True)

# Display sorted results
print(df.sort_values(by=['mean_test_f1'], ascending=False))
```

In just 6 lines of code, we're able to train 18 individual KNN models, each with a different combination of hyperparameters, and evaluate each of the models on multiple evaluation metrics. As we can see in the results, the KNN model using Euclidean distance and k=5 performs the best on this dataset.

I had never used GridSearchCV before this assignment, but it's a very powerful and easy-to-use framework for model tuning, and I'll definitely be using it more in the future.
