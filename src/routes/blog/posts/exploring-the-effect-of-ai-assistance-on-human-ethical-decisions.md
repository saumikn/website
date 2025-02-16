---
title: Exploring the Effect of AI Assistance on Human Ethical Decisions
description: An exploration of how AI influences ethical decision-making in humans.
date: '2023-06-01'
categories:
  - research
  - ethics
published: true
---

In 2022, I published my first ever, first-author publication as a PhD student — [How Does Predictive Information Affect Human Ethical Preferences?](/uploads/aies22_predictions.pdf), which was published at AIES 2022. This spring, I wrote a follow-up work to the original paper, titled _How does Value Similarity affect Human Reliance in AI-Assisted Ethical Decision Making?_, and this was just accepted to AIES 2023 a few weeks ago!

As part of the Student Track application, I needed to write an "extended abstract" on the research I intend to present. This would mainly be on my second publication, but I also decided to put many of the details from my first paper into the extended abstract, as a good way to practice for writing my proposal, but mostly to finally have an excuse to write-up the first paper! The rest of this blog is mostly taken verbatim from my extended abstract, though I'll also add a few graphs into the paper which I didn't have room for in the extended abstract.

### Motivation

Artificial intelligence (AI) has made remarkable progress in recent years, which has led to a proliferation of AI-based applications across a wide range of decision-making domains, including healthcare, finance, and transportation, among others. In many of these domains, AI is able to take over decision-making roles from humans.

However, the deployment of AI is not without its challenges, particularly in highly ethical domains where there are no clear-cut, right or wrong answers. In these cases, AI may often assume an advisory role, while the human remains the final decision-maker. For example, in the domain of healthcare, AI can assist in medical diagnosis by analyzing patient data and providing recommendations to doctors. However, the ultimate decision of treatment is made by the doctor, who must consider the patient's preferences, values, and individual circumstances.

Though AI may not always be the final decision maker in many ethical domains, its presence during the decision-making process can have major impacts on decisions made. While some may argue that AI should be completely removed from ethical decision-making domains, others have already started implementing their usage in real-world problems. Therefore, it is critical to better understand the mechanisms for how AI assistance shapes ethical human decision making, so that we can better adapt and regulate this usage.

### Current Work

To this end, I have two works on understanding the effects of AI assistance on ethical human decision making. Each of these works analyzes a different possible implementation of AI assistance in ethical domains. In the first work, published at AIES 2022, I analyzed how human decision makers use AI predictions about the future when making their decisions. In the second work, published at AIES 2023, I looked at the impacts of decision recommendations made by an AI.

#### Case Study: Kidney Allocation

In both works, we ran human subject experiments in the domain of Kidney Transplant Allocation. We picked this domain due to the significant amount of prior work done on describing the ethical factors governing this decision-making problem.

In our experiments, we designed a task setup where human participants were recruited to make kidney transplant allocation decisions, using the above ethical categories to make their decisions. Inspired by prior work on human ethical preference elicitation, we created a simple interface which presented two kidney transplant candidates to the user.

#### Effect of AI Predictions

In our first work, we investigated the effects of one possible implementation of AI assistance - using the AI to make predictions about the future and presenting these predictions to the human decision maker. This is a common setup in many real-world, AI-assisted ethical decision making problems.

In this work, we aimed to answer two research questions. **RQ1:** How does the presence of predictive information affect ethical preferences? **RQ2:** How does the source of predictive information (e.g. human or AI) affect ethical preferences?

To answer these questions, we conducted two experiments on Amazon MTurk in the kidney transplant domain.

### Results

Surprisingly, when predictions were equal across candidates, we found that ethical preferences were significantly impacted in two factors. We find that aligned predictions significantly increased ethical preferences while misaligned predictions significantly decreased ethical preferences.

#### Effect of AI Recommendations

In our second work, we investigated the effects of a different method of AI assistance - having the AI explicitly make recommendations on which decision to make in a problem.

In this work, we answered two additional research questions. **RQ1:** Do humans rely more on AI with similar values? **RQ2:** Are humans affected by claims of value similarity?

To analyze the effect of AI recommendations in this setup, we revisited the kidney transplant domain, but replaced the predictive AI factor with a new category - an AI recommendation.

### Future Work

Following up on these works, there are several research directions which I plan on further exploring for my thesis work. One natural question would be to ask how do our results change when we provide more context or explanations on the AI's assistance.

Overall, I believe that this research will contribute significantly to our understanding of AI's role in ethical decision-making and help shape future policies regarding AI implementation in sensitive domains.

---
