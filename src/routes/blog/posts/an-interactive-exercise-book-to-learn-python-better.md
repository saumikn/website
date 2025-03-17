---
title: An Interactive Exercise Book to Learn Python Better
date: '2020-12-06'
categories:
  - blog
published: true
---

In the past, I've been asked by multiple people for recommendations on how to get started programming. However, when I looked online for courses, I honestly didn't find anything online that met my criteria of free, beginner-friendly, and engaging (assigning students interactive assignments). Here are some of my thoughts on the top results that come up if I just Google ["learn python online free interactive"](https://www.google.com/search?q=learn+python+online+free+interactive):

## Recommendations

- **[Codeacademy](https://www.codecademy.com/learn/learn-python)**: Their free version is good, but only covers Python 2.
- **[Scrimba](https://scrimba.com/learn/python/)**: Has a very novel platform, but I don't think it's very intuitive to use.
- **[learnpython.org](https://www.learnpython.org)**: Doesn't have any instructive, interactive coding assignments.
- **[Educative](https://www.educative.io/courses/learn-python-3-from-scratch)**: Also lacks instructive, interactive coding assignments.

Additionally, there are a ton of online courses available on MOOC sites like [Udemy](https://www.udemy.com/topic/python/), [EdX](https://www.edx.org/learn/python), and [Coursera](https://www.coursera.org/courses?query=python), but I didn't find anything that was both free and had interactive assignments.

## Python for Everybody

One of these courses caught my eye - the [University of Michigan's Python for Everybody](https://www.coursera.org/specializations/python) course. This one actually seemed to have some interactive coding assignments as part of the course, but they cost money to use. As it turns out though, the instructor, Dr. Charles Severance, has a website, [py4e.com](http://py4e.com), where all of the course material is available for free, but you would never know this by just looking at the Coursera course page, since the main website isn't linked anywhere :/.

In any case, the PY4E course is great! As part of the course, Dr. Severance provides a complete textbook which he wrote, video lectures covering the whole book, PowerPoint slides for each unit, quizzes at the end of each unit, and interactive exercises for students to solve.

While the PY4E exercises are great, there are two main drawbacks. First, not all of the exercises have autograders available. In the first 10 chapters, the book provides 46 exercises, but only 12 of the exercises are autograded. Second, PY4E uses a custom, web-based autograding environment which doesn't provide offline access for students.

## PY4E-Exercise

To solve both these problems, I've created my own [project](https://github.com/saumikn/py4e-exercises) which includes autograded solutions for nearly all of the exercises provided in the first 10 chapters - the only exercises that are missing are a few free response questions, and there's no way to automatically grade essay questions well. Additionally, my code runs in Jupyter Notebook, which allows for both [online](https://mybinder.org/v2/gh/saumikn/py4e-exercises/HEAD) and offline access.

I've chosen to only provide exercises for the first 10 chapters because I think that is a good stopping point where somebody will have the basics of Python down, they will have gone over topics like Variables, Functions, and Lists.

However, the last 7 chapters cover much more creative and unstructured topics like using the Twitter API and D3 Visualization. At this point, I feel that students would be better off writing their own programs, and not constraining themselves to the autograder environment.

## Choosing Jupyter Notebooks

I chose to put all of the exercises inside of Jupyter Notebook. The biggest reason I wanted to do this is just because it makes all of the all of the exercises much more concise and less overwhelming for the users. With Jupyter, I can put all of the exercises inside of 10 notebooks, one corresponding to each unit of the course. If I wanted to instead use standard .py files, I would need to create over 40 individual exercises files, some of which would be very extremely short.

In addition to the usability factor, I am generally a fan of the Jupyter workflow, but I'm slightly biased since I spend all my time during research in Jupyter. If I was working in a different field of CS, I'd probably have a very different feeling about which coding environment to use. The good news is that my custom autograder (which I'll talk about next), would work with very little modifications if I was using a traditional Python environment instead of Jupyter.

## Implementing the Autograder

I'll give a quick overview of how my autograder works in this section. If you just want to dive into the code, you can check out the file `grader.py`.

At the top of each notebook (for example `05-iterations.ipynb`), I first provide links to all of the relevant materials - the main lesson page, all the lecture videos, the lesson slides, the textbook chapter, and the link to the quiz. I would expect that students go through all of this material before starting the exercises.

The next cell, `from grader import *` simply makes the autograder functionality available for the rest of the exercises. Otherwise, the students can solve the exercises on their own, but won't be able to check their answers.

For each exercise, there are three cells - a markdown cell which provides the instructions on what to do for the exercise (possible including example outputs), a code cell where the user should enter their solution, and a code cell to check the answer. All this third cell does is run the command `check_exercise('Exercise 5.1')`.

How this actually works behind the scenes is that the autograder will take the input (in this case `'Exercise 5.1'`, and look for another cell in the notebook which starts with the line `exercise = 'Exercise 5.1'`. This is how the autograder knows which cell to check. The autograder then simply goes into the notebook structure, (using the module `nbformat.read`), and extracts the entire cell as a string.

The autograder then calls `exec()` on this string in order to evaluate the user's code. Generally, using `exec()` on other people's code isn't advisable, but in this case, the user will be running everything on their own machine, which is not really any different from having any access to run arbitrary Python code directly.

Because most of the exercises in PY4E run on user input, I put this entire workflow inside of the Python `unittest` framework. Then, in order to test my own input on the user's code, I can just `exec()` the user's code, but patch the `input()` function so it gives the input data that I'm interested in checking. In order to check that the output is correct, I redirect `stdout` to a custom `io.StringIO()` object that I created, so that I can capture and check the value that the user printed.

## Conclusion

Overall, I'm really happy with how this autograded exercise set turned out (though it's easy when you're building on top of amazing content like PY4E). I would definitely be comfortable with claiming that this is the best free way to learn Python online, as I haven't seen anything that is better.

If you're interested in using this material for yourself, I've made it all available at [https://github.com/saumikn/py4e-exercises/](https://github.com/saumikn/py4e-exercises/). There are also instructions on how to start going through the exercises both [online](https://mybinder.org/v2/gh/saumikn/py4e-exercises/HEAD) (no downloads or registration required), or offline.

Let me know if you have any questions or feedback about the exercise set!
