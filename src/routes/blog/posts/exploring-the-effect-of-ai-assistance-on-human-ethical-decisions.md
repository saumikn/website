---
title: Exploring the Effect of AI Assistance on Human Ethical Decisions
description: An exploration of how AI influences ethical decision-making in humans.
date: '2023-06-01'
categories:
  - blog
  - research
published: true
---

In 2022, I published my first ever, first-author publication as a PhD student — [How Does Predictive Information Affect Human Ethical Preferences?](/uploads/aies22_predictions.pdf), which was published at AIES 2022. Since then, I've been meaning to write a blog post version of the paper (as advocated for by [Rachel Thomas](https://rachel.fast.ai/posts/2019-05-13-blogging-advice) and others) but it's somehow never happened.

This spring, I wrote a follow-up work to the original paper, titled _How does Value Similarity affect Human Reliance in AI-Assisted Ethical Decision Making?_[^1] , and this was just accepted to AIES 2023 a few weeks ago! As a follow up, I decided to apply for the [AIES Student Track](https://web.archive.org/web/20241010010542/https://www.aies-conference.com/2023/call-for-papers-students), something I didn't do in 2022.

As part of the Student Track application, I needed to write an "extended abstract" on the research I intend to present. This would mainly be on my second publication, but I also decided to put many of the details from my first paper into the extended abstract, as a good way to practice for writing my proposal, but mostly to finally have an excuse to write-up the first paper! The rest of this blog is mostly taken verbatim from my extended abstract, though I'll also add a few graphs into the paper which I didn't have room for in the extended abstract.

# Motivation

Artificial intelligence (AI) has made remarkable progress in recent years, which has led to a proliferation of AI-based applications across a wide range of decision-making domains, including healthcare, finance, and transportation, among others. In many of these domains, AI is able to take over decision-making roles from humans.

However, the deployment of AI is not without its challenges, particularly in highly ethical domains where there are no clear-cut, right or wrong answers. In these cases, AI may often assume an advisory role, while the human remains the final decision-maker. For example, in the domain of healthcare, AI can assist in medical diagnosis by analyzing patient data and providing recommendations to doctors. However, the ultimate decision of treatment is made by the doctor, who must consider the patient's preferences, values, and individual circumstances. Similarly, in the financial domain, AI can assist in fraud detection and risk assessment, but it often cannot make the final decision, which might require human judgment.

Though AI may not always be the final decision maker in many ethical domains, its presence during the decision-making process can have major impacts on decisions made. While some may argue that AI should be completely removed from ethical decision-making domains, others have already started implementing their usage in real-world problems. Therefore, it is critical to better understand the mechanisms for how AI assistance shapes ethical human decision making, so that we can better adapt and regulate this usage.

# Current Work

To this end, I have two works on understanding the effects of AI assistance on ethical human decision making. Each of these works analyzes a different possible implementation of AI assistance in ethical domains. In the first work, published at AIES 2022, I analyzed how human decision makers use AI predictions about the future when making their decisions ([Narayanan et al. AIES 2022](https://web.archive.org/web/20241010010542/https://saumikn.com/wp-content/uploads/aies22_predictions.pdf)). In the second work, published at AIES 2023, I looked at the impacts of decision recommendations made by an similar and dissimilar AI assistants (Narayanan et al. AIES 2023).

## Case Study: Kidney Allocation

In both works, we ran human subject experiments in the domain of Kidney Transplant Allocation. We picked this domain due to the significant amount of prior work done on describing the ethical factors governing this decision-making problem. In particular, the task formulation we presented to study participants were based on the formulation by ([Persad et al.](https://web.archive.org/web/20241010010542/https://www.sciencedirect.com/science/article/abs/pii/S0140673609601379)), who list the following four categories of ethical principles for allocating scarce medical resources: (1) Promoting and rewarding social usefulness. (2) Treating people equally. (3) Favoring the worst-off. (4) Maximizing total benefits.

In our experiments, we designed a task setup where human participants were recruited to make kidney transplant allocation decisions, using the above ethical categories to make their decisions. Inspired by prior work on human ethical preference elicitation ([Awad et al.](https://web.archive.org/web/20241010010542/https://www.nature.com/articles/s41586-018-0637-6.), [Freedman et al.](https://web.archive.org/web/20241010010542/https://www.sciencedirect.com/science/article/pii/S0004370220300229)), we created a simple interface which presented two kidney transplant candidates to the user. Each user was labeled with four values - their prior donor status, how long they have been waiting for a kidney, how severe their disease stage is, and their predicted odds of surviving post-transplant. These four factors correspond to the four ethical categories listed above, and have predefined ethical orderings (e.g. prior donors should be prioritized over non-donors).

## Effect of AI Predictions

In our first work, we investigated the effects of one possible implementation of AI assistance - using the AI to make predictions about the future and presenting these predictions to the human decision maker. This is a common setup in many real-world, AI-assisted ethical decision making problems. However, there hasn't been any prior work done on understanding the impact of these predictions while eliciting human preferences. Instead, prior work has only focused on verifiable information ([Awad et al.](https://web.archive.org/web/20241010010542/https://www.nature.com/articles/s41586-018-0637-6.), [Freedman et al.](https://web.archive.org/web/20241010010542/https://www.sciencedirect.com/science/article/pii/S0004370220300229)).

### Research Questions

In this work, we aimed to answer two research questions. **RQ1**: How does the presence of predictive information affect ethical preferences? **RQ2**: How does the source of predictive information (e.g. human or AI) affect ethical preferences?

### Methods

To answer these questions, we conducted two experiments on Amazon MTurk in the kidney transplant domain. We can then analyze the impact of AI predictions using the four factors described above, as the first three facrors describe verifiable information (Donor Status, Wait Time, Disease Stage), while the last describes a prediction (Survival Chance).

![](https://web.archive.org/web/20241010010542im_/https://saumikn.com/wp-content/uploads/image-1685582321073.png)

For our first experiment, we recruited 600 participants to make allocation decisions under two treatments. In the first treatment, we only presented the three verifiable factors, to act as a control for measuring human baseline ethical preferences.

In the second treatment, we add the post-transplant survival prediction and measure its effect on the baseline values. We measured the impact of the prediction by separately analyzing three cases for the prediction - when the prediction favors the higher value (aligned), when the prediction is equal across candidates (equal), and when prediction favors the lower value (misaligned).

![](https://web.archive.org/web/20241010010542im_/https://saumikn.com/wp-content/uploads/image-1685582336733.png)

In our second experiment, we recruited an additional 300 participants with two treatments. In both treatments, we presented the predictive factor to participants. However, users in the first treatment were told that the prediction was generated by a human doctor, while users in the second treatment were told that the prediction was generated by an AI model.

### Results

![](https://web.archive.org/web/20241010010542im_/https://saumikn.com/wp-content/uploads/image-1685582369096.png)

Surprisingly, when predictions were equal across candidates, we found that ethical preferences were significantly impacted in two factors. We find that aligned predictions significantly increased ethical preferences while misaligned predictions significantly decreased ethical preferences. Finally, when considering the source of the prediction made, we find that users have a significantly higher alignment with AI predictions than doctor predictions, suggesting that decision-makers trust AI predictions more. More details on these results are available in the full paper (Narayanan et al, AIES 2022).

![](https://web.archive.org/web/20241010010542im_/https://saumikn.com/wp-content/uploads/image-1685582382995.png)

## Effect of AI Recommendations

In our second work, we investigated the effects of a different method of AI assistance - having the AI explicitly make recommendations on which decision to make in a problem.

Specifically, we aim to understand how value similarity affects reliance on AI. While there have been other works which have analyzed the effect of value similarity on subjective trust measures ([Mehrotra et al.](https://web.archive.org/web/20241010010542/https://dl.acm.org/doi/pdf/10.1145/3461702.3462576)), but we are the first to look at the effect on empirical reliance.

### Research Questions

In this work, we answered two additional research questions. **RQ1**: Do humans rely more on AI with similar values? **RQ2**: Are humans affected by claims of value similarity?

### Methods

To analyze the effect of AI recommendations in this setup, we revisited the kidney transplant domain, but replaced the predictive AI factor with a new category - an AI recommendation. We then ran a two-stage, two-treatment experiment on Amazon MTurk with 303 workers. In the first stage, we elicited participants' ethical preferences using just the three verifiable factors. We use these results to generate a preference ordering for each candidate. For example, if the ethical preference is highest for the Prior Donor factor and lowest for the Wait Time factor, their value ordering would be Prior Donor > Disease Stage > Wait Time.

We then generated an AI with its own value ordering. Users in the first treatment group were given an AI with an similar value ordering to themselves, and users in the second treatment group were given an AI with a dissimilar value ordering. We then presented the user with both their own empirical value ordering and the value ordering of an AI assistant. In both cases, we inform the user that the AI isn't perfectly deterministic, and sometimes makes decisions randomly rather than strictly according to its value ordering. In the second phase of the experiment, both treatment groups were asked to answer additional decision-making problems, this time, with the assistance of similar or dissimilar AI recommendations.

![](https://web.archive.org/web/20241010010542im_/https://saumikn.com/wp-content/uploads/image-1685582476139.png)

Using this experiment design, we measured the effect of value similarity on user reliance. This was calculated by taking scenarios in the second stage where the AI made a recommendation contrary to the human's prior preference.

To understand why any effect occurs, we compared the scenarios where the AI is deterministic and random to see if there was any difference in reliance. Any increase in reliance when the AI is random could only be caused by the user perception of value similarity, while reliance on a deterministic AI would be caused by both the user perception of similarity and actual effects of AI similarity.

### Results

![](https://web.archive.org/web/20241010010542im_/https://saumikn.com/wp-content/uploads/image-1685582545001.png)

Overall, we found that the users had significantly higher reliance on similar AI. In addition, we found that this reliance only appeared when the similar AI acted deterministically. From this, we can conclude that the effect of similar AI reliance is not caused by the claim of similarity, but actual similar behavior. More details on these results are available in the full paper (Narayanan et al, AIES 2023).

![](https://web.archive.org/web/20241010010542im_/https://saumikn.com/wp-content/uploads/image-1685582560603.png)

## Future Work

Following up on these works, there are several research directions which I plan on further exploring for my thesis work.

## AI Context

One natural question would be to ask how do our results change when we provide more context or explanations on the AI's assistance. For instance, if we provide an accuracy level or confidence bound for the predictive information, does this change the human preference towards the predictions? We could also explore how providing a justification for why the AI has a certain value ordering changes human reliance.

## Additional Domains

Finally, it is important to understand if our results generalize to other ethical decision making domains domains. Both of our previous works have only looked at the kidney transplant domain, but there are many areas of ethical decision making which could use AI. In particular, one domain we plan on analyzing is AI assistance for transit route allocation. This is a natural area to explore, as transit network design is an problem with huge ethical implications, and there is the potential to significantly improve the usefulness of real-world systems. However, AI assistants are currently underutilized by transit agencies, due to the lack of requisite transit algorithms which can combine the elicited value preferences of diverse groups of stakeholders, including governments, transit agencies, and riders. We plan on collaborating with local transit agencies to design ethically-aware AI systems to assist planners with transit network design.

## <!-- [1] I'll upload the camera-ready version when its ready) ↩ -->
