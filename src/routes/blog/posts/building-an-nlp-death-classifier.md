---
title: Building an NLP Death Classifier
description: An exploration of using NLP techniques to classify death-related content.
date: '2020-09-27'
categories:
  - research
published: true
---

This week, there were no really interesting topics that came up for me to write a blog about. Instead, I’ll start going through the dozens of post ideas in my backlog that I’ve been meaning to write about for months, or even years! Today, I’ll write about my first ever research publication from all the way back in freshman year. Because it was so long ago, I’m probably going to be missing a lot of details about the paper, but I’ll try to give the high-level background at least.

In the beginning of freshman year, I knew that I wanted to start doing research, so I emailed a bunch of professors whose work seemed interesting. I met with a few of them who responded back to me, and I eventually decided to join [Dr. Lana Yarosh’s lab](https://web.archive.org/web/20240528232058/https://lanayarosh.com/), because she was doing work in NLP. Only a few months before I joined the lab, Lana’s group got access to a huge dataset from an online health community, [CaringBridge](https://web.archive.org/web/20240528232058/https://www.caringbridge.org/), and all of the projects that I ended up working on with Lana had this CaringBridge dataset as it’s backbone. Essentially, this dataset consisted primarily of journals written by users of the website, writing about health experiences that they (or one of their loved ones) were going through.

For this first project, I primarily worked with two of Lana’s PhD students as my mentors: [Haiwei Ma](https://web.archive.org/web/20240528232058/https://www.linkedin.com/in/haiwei-ma-3573974a/) and [Estelle Smith](https://web.archive.org/web/20240528232058/https://colleenestellesmith.com/). Specifically, the goal for this study was to determine how “expressive writing” affected user engagement on the platform. The hope was that having more information on the tendencies of online health community users could help the platforms become more useful for current and new users. While the others were working on this problem, they discovered a bug. Because the text was on health journeys, some people stopped using the site not because they didn’t find it engaging, or any other reason that the site had control over, but because the user literally passed away. On an initial scan of the text, this scenario seemed prevalent enough to significantly confound the statistical analysis. A new thread was created to help fix this issue – build a machine learning classifier to predict the event of user death, so these users could be ignored for the engagement analysis

Even though I was only a freshman, and had very little understanding of ML or NLP, this seemed like a really interesting topic, so I was happy to work on this! The project consisted of four steps: decide which data to use in the problem, generate ground-truth values for the data (since we are doing supervised learning), decide which features to use for the model, and train the model.

Our initial dataset for this ML problem consisted of the posts from all CaringBridge users. Even though the paper as a whole focused on cancer patients, we decided to analyze non-cancer patients as well, so our work could be applicable to future work. Once we started to go through the data, we started to encounter a lot of spam, so we added a minimum post cutoff to filter it out. I don’t remember what this number was exactly, and I couldn’t find it in the final paper… Additionally, once we looked through the data, we decided to only include the last three updates from a user, since none of earlier updates seemed to be relevant for predicting death for any of the users we looked at.

Once we had this filter on data, we set out on creating ground-truth values. We initially had multiple researchers looking at the same posts, to figure out how obvious and reliable our ground-truth collection would be. After some tweaks, we were able to create a methodology with 100% inter-rater reliability, which showed that we didn’t need to have multiple people looking at the same posts, great for getting more data faster! Our final dataset consisted of 690 users, or 2070 posts. I don’t remember how many I personally read, but it was a lot, and some of the posts tended to be quite depressing, reading countless posts about people talking about their family members passing away. Overall, we found that about 30% of these sites ended in death, and 70% ended without any clear evidence of death.

Along the way, we started talking about potential features to use for the classifier. We initially decided to use the [LIWC Dictionary](https://web.archive.org/web/20240528232058/https://www.kovcomp.co.uk/wordstat/LIWC.html) of death words, but as we read more, we discovered that a lot of the LIWC words weren’t actually relevant, and we introduced more words that could give our model much more understanding of the post’s content with respect to how talk about their family member’s deaths. For example, most users don’t say that a family member “died”, they would say something like they have “passed away” or they are “with god” or they “lost their battle”. Here’s a table of the most useful words that we used in the final model.

![](https://web.archive.org/web/20240528232058im_/https://saumikn.com/wp-content/uploads/2020/09/cbtable.png)

Finally, using this data and these features, we trained a machine learning classifier model, using the Python library [Scikit-learn](https://web.archive.org/web/20240528232058/https://scikit-learn.org/stable/). Our final model was a Random Forest model which achieved a test-data accuracy between 85-95% accuracy, good enough to use in the final model.

I didn’t have much to do with the rest of the paper, but the rest of the team concluded that the death classifier drastically improved our understanding of engagement as a whole. Here are some statistics, taken from the paper:

- Adding 128 visitors to a site increases site survival by 18.1% if we incorporate death; this value drops to 11.6% when we do not incorporate death.
- The benefit of adding 0.34 updates per day to site survival drops from 15.5% to 12.7%.
- The benefit of adding an additional 0.85 messages/visitor drops from 9.0% to 7.6%.

In the end, this paper was accepted to CSCW 2017, my first ever paper! Even more exciting is that this paper actually seems to have generated some outside, since the paper as [19 citations](https://web.archive.org/web/20240528232058/https://scholar.google.com/scholar?cites=3955331651722222896&as_sdt=5,24&sciodt=0,24&hl=en) as of Sept 2020. For more information on the paper as a whole, check out the [ACM DL page](https://web.archive.org/web/20240528232058/https://dl.acm.org/doi/abs/10.1145/3134708), and you can access a PDF copy of the paper at [this link](https://web.archive.org/web/20240528232058/https://dl.acm.org/doi/pdf/10.1145/3134708).

Thanks for reading everybody, and see you all next week!

> Haiwei Ma, C. Estelle Smith, Lu He, Saumik Narayanan, Robert A. Giaquinto, Roni Evans, Linda Hanson, and Svetlana Yarosh. 2017. Write for Life: Persisting in Online Health Communities through Expressive Writing and Social Support. Proc. ACM Hum.-Comput. Interact. 1, CSCW, Article 73 (December 2017), 24 pages. DOI: https://doi.org/10.1145/3134708
