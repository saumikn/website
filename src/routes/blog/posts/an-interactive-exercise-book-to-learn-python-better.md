---
title: An Interactive Exercise Book to Learn Python Better
description: A comprehensive guide to learning Python through interactive exercises.
date: "2020-12-07"
categories:
  - blog
  - education
published: true
---

In the past, I've been asked by multiple people for recommendations on how to get started programming. However, when I looked online for courses, I honestly didn't find anything that met my criteria of free, beginner-friendly, and engaging (assigning students interactive assignments). Here are some of my thoughts on the top results that come up if I just Google ["learn python online free interactive"](https://www.google.com/search?q=learn+python+online+free+interactive):

## Recommendations

- **[Codeacademy](https://www.codecademy.com/learn/learn-python)**: Their free version is good, but only covers Python 2.
- **[Scrimba](https://scrimba.com/learn/python/)**: Has a very novel platform, but I don't think it's very intuitive to use.
- **[learnpython.org](https://www.learnpython.org)**: Doesn't have any instructive, interactive coding assignments.
- **[Educative](https://www.educative.io/courses/learn-python-3-from-scratch)**: Also lacks instructive, interactive coding assignments.

Additionally, there are a ton of online courses available on MOOC sites like [Udemy](https://www.udemy.com/topic/python/), [EdX](https://www.edx.org/learn/python), and [Coursera](https://www.coursera.org/courses?query=python), but I didn't find anything that was both free and had interactive assignments.

## Python for Everybody

One of these courses caught my eye - the [University of Michigan's Python for Everybody](https://www.coursera.org/specializations/python) course. This one actually seemed to have some interactive coding assignments as part of the course, but they cost money to use. As it turns out though, the instructor, Dr. Charles Severance, has a website, [py4e.com](http://py4e.com), where all of the course material is available for free, but you would never know this by just looking at the Coursera course page, since the main website isn't linked anywhere.

In any case, the PY4E course is great! As part of the course, Dr. Severance provides a complete textbook which he wrote, video lectures covering the whole book, PowerPoint slides for each unit, quizzes at the end of each unit, and interactive exercises for students to solve.

## Drawbacks of PY4E Exercises

While the PY4E exercises are great, there are two main drawbacks. First, not all of the exercises have autograders available. In the first 10 chapters, the book provides 46 exercises, but only 12 of the exercises are autograded. Second, PY4E uses a custom, web-based autograding environment which doesn't provide offline access for students.

## My Solution: PY4E-Exercise

To solve both these problems, I've created my own [project](https://github.com/saumikn/py4e-exercises) which includes autograded solutions for nearly all of the exercises provided in the first 10 chapters - the only exercises that are missing are a few free response questions, and there's no way to automatically grade essay questions well. Additionally, my code runs in Jupyter Notebook, which allows for both [online](https://mybinder.org/v2/gh/saumikn/py4e-exercises/HEAD) and offline access.

I've chosen to only provide exercises for the first 10 chapters because I think that is a good stopping point where somebody will have the basics of Python down, they will have gone over topics like Variables, Functions, and Lists.

However, the last 7 chapters cover much more creative and unstructured topics like using the Twitter API and D3 Visualization. At this point, I feel that students would be better off writing their own programs, and not constraining themselves to the autograder environment.

## Conclusion

Overall, I'm really happy with how this autograded exercise set turned out (though it's easy when you're building on top of amazing content like PY4E). I would definitely be comfortable with claiming that this is the best free way to learn Python online, as I haven't seen anything that is better.

If you're interested in using this material for yourself, I've made it all available at [https://github.com/saumikn/py4e-exercises/](https://github.com/saumikn/py4e-exercises/). There are also instructions on how to start going through the exercises both [online](https://mybinder.org/v2/gh/saumikn/py4e-exercises/HEAD) (no downloads or registration required), or offline.

Let me know if you have any questions or feedback about the exercise set!
