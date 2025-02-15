---
title: What every computer science major should know (to get an internship)
description: What every computer science major should know (to get an internship)
date: '2022-07-09'
categories:
  - sveltekit
published: true
---

When a new student is starting their journey into the field of computer science, it can be hard to figure out which topics to learn first. In this post, I will give my opinionated review on what every computer science student should know for their first internship. This advice is intended for freshmen who are deciding which courses to take during their first year, or rising sophomores who are looking for something to study during the summer before internship applications begin in the fall. It could also be easily used for people outside of CS who are looking to make a career in programming.

I should say that this post was inspired by the similarly named post [What every computer science major should know](https://matt.might.net/articles/what-cs-majors-should-know/), by Matt Might. However, I think Matt's article is far too comprehensive, to the point of uselessness, since it's almost impossible to really learn everything listed. It's also not practical - the majority of developers work on [full-stack development](https://insights.stackoverflow.com/survey/2021#developer-roles-dev-type-us), but Matt mentions very little regarding this.

Hopefully, this post is much more practical and scoped. I'm not going to describe all the subfields of CS, and I won't list topics that are usually required for CS majors but aren't that relevant for most people. Instead, I want this to be very focused on what students will need to be successful in applying for, and completing CS internships.

Along with each of my recommendations, I'll also list some resources online so that motivated students can work on studying these on their own. All of the resources I link are completely **free**!

**How to Program**

This may seem quite obvious, but this amusing article states that most [programming job applicants can't code](https://blog.codinghorror.com/why-cant-programmers-program/). I'm skeptical of the actual claims here, but it should be clear that you need to know how to program in order to get a programming job/internship.

Specific recommendations:

All of this should be covered in your first semester "Intro to programming" class that you take. Alternatively, there are plenty of online resources available. I'm personally a big fan of [Python for Everybody](http://py4e.com/), and I made my add-on exercise book to this course which you can read about [here](https://saumikn.com/blog/an-interactive-exercise-book-to-learn-python-better/). If you're looking for a more typical college-lecture style course, Harvard's [CS 50](https://cs50.harvard.edu/python/2022/) course is freely available online, with lecture recordings, notes, and homework.

If you're already familiar with one language, and you're looking to learn a second language, [Learn X in Y minutes](https://learnxinyminutes.com) is a great way to get quickly acquainted with the syntax of any language. I wouldn't recommend this for your first language though, it'll just be too overwhelming.

**Algorithms and Data Structures**

This almost doesn't deserve its own section, as it's mostly just learning How to Program <em>better</em>. This is validated by the fact that universities usually put Algorithms as the second-semester CS course. UC Berkeley even calls these courses [61A](https://cs61a.org) and [61B](https://sp21.datastructur.es). However, the reason I'm separating Algorithms is that it's the backbone of nearly all technical interviews you'll take. Essentially, most phone screens and interviews you take will consist of the interviewer giving you a problem to solve, and you'll have to figure out the algorithm needed to correctly solve the problem and pass all the test cases. This might seem hard, but it turns out pretty much any question you might be asked are already available online on websites like [Leetcode](http://leetcode.com/), [HackerRank](https://www.hackerrank.com/), or in books like [Cracking the Coding Interview](https://www.crackingthecodinginterview.com/).

If you've already taken an algos course in your school, the only thing you can do to prepare is to "grind Leetcode", or just solve as many questions as you can. If you're ever stuck on a question, feel free to look at the solution and discussion sections, and try to internalize the explanations that they give, so that you could recreate the solution on your own if you needed to.

If you haven't taken any course on algorithms, I would recommend going through a structured course online, like Berkeley's [CS 61B](https://sp21.datastructur.es), MIT's [CS 6.006](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/), Stony Brook's [CSE 373](https://www3.cs.stonybrook.edu/~skiena/373/videos/), or SDSU's [CS 310](https://www.youtube.com/playlist?list=PLpPXw4zFa0uKKhaSz87IowJnOTzh9tiBk). However, these courses will not cover every algorithm or data structure that you'll ever use, they just give you the backbone to get started, so that you can start exploring on your own.

Specific recommendations:

This probably shouldn't be something you just work on endlessly though, once you reach some threshold, you're probably better off working on personal projects or learning other topics. If you can solve most Mediums in under 30 minutes, you should be in excellent shape.

One other thing to note is that, during interviews, you will need to speak out loud and explain your thought process to your interviewer as you implement the solution. Thus, it can be beneficial to practice doing interviews with others, so you can be more comfortable talking and writing code simultaneously.

**Working inside Linux**

Unlike Algos, which is probably not very useful once you get the internship, learning how to operate in the Linux environment is the most important skill you will need once you're on the job. An effective command over the command line will make you a much more efficient and productive worker.

Specific recommendations:

Unfortunately, most CS curricula at college don't cover these topics in enough detail, considering that developers spend almost their entire day inside this environment. Recently, MIT created a course called the [Missing Semester](https://missing.csail.mit.edu/), which aims to cover these topics, and I highly recommend it. For further reading, there are [many](https://www.tutorialworks.com/linux-commands/) [pages](https://mindmajix.com/linux-networking-commands-best-examples) [available](https://www.journaldev.com/43930/process-management-in-linux) [online](https://www.tecmint.com/linux-file-management-commands/) on common Linux commands, just google whenever you're unsure about anything. For more practice on Git specifically, Free Code Camp has a tutorial on [practical Git](https://www.freecodecamp.org/news/practical-git-and-git-workflows). I also quite liked the list of tasks that Matt Might gave in his [blog post](https://matt.might.net/articles/what-cs-majors-should-know/) (search under "Unix Philosophy")

**Full-stack Development**

Full-stack (web) development is almost surely not going to be covered during your freshman year, and probably not in your sophomore year either. However, the [majority of developers](https://insights.stackoverflow.com/survey/2021#developer-roles-dev-type-us) in the real world work on full-stack development, and your first internship will likely be in this area as well, so having prior knowledge in this area will give you a big leg up, even if you'll mostly be expected to pick up the content on the job itself.

Specific recommendations:

This might seem like a lot, but there are thankfully many resources available online to learn web development. If you're looking for a more lecture-based environment similar to college, Harvard has a course on [Web Programming in Python+JS](https://www.google.com/search?q=harvard+web+programming&sourceid=chrome&ie=UTF-8). The [Odin Project](https://www.theodinproject.com/paths) is an open-source group that has a hands-on full-stack course available in either JS or Ruby. For learning frontend specifically, Scrimba teaches a [course on the React framework](https://scrimba.com/learn/learnreact). For learning backend specifically, I'm a fan of this [project-based course](https://christophergs.com/tutorials/ultimate-fastapi-tutorial-pt-1-hello-world/) on FastAPI, which is a Python backend framework similar to Flask but modernized in a few ways.

**Data Science**

This section is optional, and only really relevant if you're planning to specifically do a data science or machine learning internship - otherwise you can just skip this. Like the previous section, most students won't have taken any classes on data science by their sophomore year, so all the content you need to know to apply for data science or machine learning internships will need to happen through self-study.

Specific recommendations:

Again, there are a lot of resources online for learning Data Science. My favorite is [Kaggle Learn](http://kaggle.com/learn). They have courses on a number of different topics, all in notebook form so you can practice writing the code to replicate any analysis. I would recommend that once you have a basic skillset, to just start getting your hands dirty with datasets that personally interest you. Rebecca Vickery on TowardsDataScience has put together a [list of free books](https://towardsdatascience.com/6-free-data-science-books-for-complete-beginners-636810c0a06f) which are available online, and all these books seem quite reasonable. The last one specifically is based on Jeremey Howard's [fast.ai course](http://course.fast.ai) which I'm a huge fan of - I've used it myself and I'm a huge fan of how fast you can really get going into applying deep learning algorithms onto your own datasets.

**Projects**

Keep in mind that learning from websites, videos, or even courses can only take you a very limited amount of the way towards proficiency. The only way to become truly skilled at any of these topics is by practicing on your own projects, so I've tried to list learning resources that have interactive components or hands-on exercises.

However, once you have a base level of competency for a given area, I definitely encourage you to go start working on projects on your own! Make a website and host it on Github or Heroku. Build an API and make it open to the public. Make a smartphone app (though this probably requires additional prep). Find a dataset on something interesting and train a model on it, or display some cool visualizations.

At first, it might seem impossibly hard to even start working on one of these, but with a basic foundation, you can definitely make something good enough to showcase your skills on your resume or personal website, and something to talk about during your interviews! Here are some sample project ideas:

**Conclusion**

Hopefully, this was a useful guide to help focus your study as you work towards getting a career in computer science. If there's another resource or online course that you think I'm missing, please let me know by posting in the comments!

