---
title: Modeling Network Formation in an Online Health Community
description: A summary of my research project on network formation using the CaringBridge dataset.
date: "2020-10-12"
categories:
  - research
  - health
published: true
---

Over the last two weeks, I've written about my first two research projects and publications at GroupLens. Today, I'll wrap up this series by talking about my third and final research project with the CaringBridge dataset.

With one semester left in my undergraduate career, it was time for me to start focusing on putting together a final thesis, a requirement for me to graduate with honors. I scheduled a meeting with Zach at the beginning of the semester to discuss what I could write my thesis on. He presented a few specific topics of inquiry that I could look more into, but all of them required a lot of processing of the data to make it usable for analysis. As a result, this was my first task. Essentially, I had to go through the gigabytes of text, csv, and json files and collect it into a more compact structure for quick retrieval. This was made more difficult because the data we needed was scattered in various types of files across the whole dataset and in some cases, we had to merge data from multiple files. Some of the tools I used to make this more manageable were tqdm and pick.

For the thesis itself, Zach and I decided to apply the results from a recent paper, Overgoor et al, to the CaringBridge dataset. Essentially, the paper used conditional logit models in order to model the growth of a social network using discrete choice theory. I go into more detail in the thesis, but the basic idea is that, whenever a user initiates a connection to a new target, they are selecting that user out of a pool of every other user in CaringBridge. The goal of the conditional logit models is to learn which features, in both the initiating user and the target user, are predictive of the connection.

Once we have our process set up, the next stage is to choose the features to analyze. In Overgoor's paper, they use a number of features inherent to the graph itself, for example indegree, or friend-of-friend. In addition to these, we decided to introduce some new features related exclusively to online health communities, for example the user's health condition, and if the post is patient vs caregiver authored. We also added some features related to author statistics, like how long they've been on the site, and how often they post.

Once we've selected which features to use, it's time to actually run the model! Since the Overgoor paper made their R code available for use, there were thankfully not too many changes we needed to make to get the code working on our dataset. Overall, we found several variables were predictive towards choice, and our highest model had an accuracy of 83% (compared to baseline accuracy of 1/25=4%). Unfortunately, we couldn't combine some of the author-visitor interaction features with the CaringBridge graph features due to computational infeasibility, but the initial results are promising enough.

In the end, I was able to submit the thesis on time, thanks to a last-minute push in May, my thesis was accepted, and I graduated _magna cum laude_. After I graduated, Zach and a few others from the group continued working on this topic of networks in CaringBridge, and integrated my thesis work into a new paper! It's been conditionally accepted to CSCW 2020, which is obviously exciting.

Overall, I've had an amazing time working in the Grouplens Research Lab with Lana, Haiwei, Estelle, and Zach. I got 5 semesters of research experience, 3 publications, and an honors thesis, and a lot of fun doing research! Thanks to everybody for all their help, and now it's time to take this experience and apply it to future projects.

Thanks for reading everybody, and see you next week!
