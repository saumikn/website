---
title: Learning Colloquial Tamil - Part 2
description: A continuation of my journey in learning colloquial Tamil, focusing on resources and methods.
date: '2023-07-18'
categories:
  - blog
  - languages
  - tamil
published: true
---

A few years ago, I wrote in a [blog post](https://saumikn.com/blog/learning-colloquial-tamil/) that I would start working more on Tamil again, and while I was able to read through the Colloquial Tamil book and pick up some grammatical concepts and vocab, it wasn't really useful by itself, and I wasn't super satisfied with the Anki decks that I made, so this study habits kinda died out.

In the last few weeks though, I've picked it up again, with new resources to learn from!

### Colloquial Tamil Sentences

In my opinion, learning sentences is one of the best ways for language study, since it helps with grammar and vocabulary simultaneously, in a way that reinforces prior knowledge. I've used this approach in the past to study Hindi and French, using Anki decks made by [Neri](http://frequencylists.blogspot.com/2018/02/welcome.html) focused on frequency.

Unfortunately, I've never been able to find a proper dataset for learning Tamil sentences. I've considered using the [Tatoeba](https://tatoeba.org/en/) dataset, but there are very few Tamil sentences available (around 400), and most of them are repetitive and not interesting.

However, a few days ago, I found a few new resources by [Agurchand Babu Subramanian](https://www.youtube.com/@agurchand/search) and [Gokila Agurchand](https://www.youtube.com/c/GokilaAgurchand) (who from what I can tell, are a married couple?). They each have Youtube channels with hundreds of thousands of subscribers, teaching Tamil, Telugu, Kannada, Malayalam, Hindi, and English. They have a website with some dialogues and sentences and vocab. They have a set of Android apps which seem to be a slight superset of the content on their website.

![](https://web.archive.org/web/20241010022738im_/https://saumikn.com/wp-content/uploads/image-1689691343308.png)

And finally, they have a set of "books" they published which are essentially word and sentence lists in various language. While these books don't actually teach grammar directly, they're a great resource for encountering colloquial speech in context, especially as they are all about $0.99, great value!

![](https://web.archive.org/web/20241010022738im_/https://saumikn.com/wp-content/uploads/image-1689691445074.png)

As soon as I saw this, I immediately bought the Tamil book, and copy pasted the full text into a text file which I could them import into Anki. I ignored the 300 vocab terms since I'm not super concerned about it, and figured they'd anyways show up in the sentences. I also removed two duplicate sentences, so I ended up with 698 Tamil Sentences for my Anki Deck, quite a bargain if you ask me :).

There were a few problems with the book though, in my opinion. For 99 cents, they aren't really dealbreakers, but they're worth mentioning.

First, a few of the English sentences aren't really how a native (non-Indian) speaker would say them, or slightly incorrect. For example, in the above image "Actual price is Rs. 10 only" should probably be "The actual price is only Rs. 10", and "I don't want to go to cinema" should definitely be "I don't want to go to the cinema". For a native English speaker, especially one who is familiar with Indian English, I always know what they mean anyways so it isn't a huge problem.

![](https://web.archive.org/web/20241010022738im_/https://saumikn.com/wp-content/uploads/image-1689692639363.png)

The second problem is, despite the title saying "Spoken Tamil", a few of the sentences are more formal than commonly spoken in colloquial Tamil. For example, the book gives "இது அவருடைய சட்டை" (i.e. "idu avaruḍaiya caṭṭai") for "This is his shirt", but அவருடைய (avaruḍaiya), meaning "his", is only used in formal Tamil. In colloquial Tamil, it would instead be அவர் (avar) or அவரோட (avarooda), and indeed, the authors use அவர் or அவரோட for other sentences containing the word "his". This trips me up a little bit, but whenever I encounter a sentence with a new grammatical construct I don't know, I'll generally consult my textbooks, a family member, or ChatGPT, and I'll be able to figure out what is colloquial and what is formal. Most of the sentences I've found are colloquial though, so this problem doesn't come up much.

![](https://web.archive.org/web/20241010022738im_/https://saumikn.com/wp-content/uploads/image-1689691595110.png)

The last problem which was most annoying for me is the transliteration scheme that Agurchand used was quite inconsistent, as Tamil speakers might be able to see in the above image. It isn't the biggest deal in the world, since I can anyways read the Tamil script (slowly) and don't need the transliteration, but I would prefer having a consistent transliteration to check back on while studying.

I didn't really want to manually re-type each sentence though to fix the transliteration, and I wasn't happy with any of the existing Tamil transliteration code I found online. I figured that I would just write my own code to do this. For more information on this code, you can check out my other [blog post](http://saumikn.com/blog/tamil-transliteration).

### Colloquial Tamil Dialogues

Other than just learning a random set of sentences, I think it would be great to read dialogues or short stories as a way of getting additional practice. From what I can find though, there is not much literature available online in colloquial Tamil.

I've considered using AI in two different ways to help solve this issue. First, I tried using ChatGPT to write its own stories in Tamil. I wasn't super happy with the output, though I'm admittedly have no expertise in prompt engineering, and it's also quite difficult to evaluate the output when I myself am not a native (or competent) Tamil speaker.

I've also considered using Speech-To-Text AI to take the dialogues from Tamil media. This is only necessary because virtually no Tamil media has native Tamil subtitles available, it's generally only available in English or maybe Hindi, so I would need to use a STT transcription tool to get these subtitles. I could go for full-length movies available on YouTube, or long-running Tamil serials (i.e. soap dramas) available for free.

I haven't actually tried doing this yet, I'll have to start playing around with different software and tools to see what (if anything) works well. One interesting thing I found is that Whisper (OpenAI's STT tool) is apparently misleadingly bad at STT for Tamil or other Indian languages, according to a [blog post](https://deepgram.com/learn/how-openai-s-text-normalization-hides-whisper-s-true-word-error-rate-for-south-asian-and-southeast-asian-languages) from Deepgram, a competitor to Whisper. The APIs for both Whisper and Deepgram cost money, and while it's not a lot, it is enough of a roadblock that I'm not going to look into this for a bit.

Instead, I've found a few existing colloquial Tamil dialogues which I can just take directly from the internet, written by native Tamil speakers. First is all of the dialogues contained inside of the online [UPenn Tamil Course](http://learn.tamilnlp.com/), which I honestly sorta missed in previous years cause of the website's terrible pre-2000s UI. I also can extract all the dialogues from the [Colloquial Tamil PDF](https://ia800209.us.archive.org/21/items/ColloquialTamil_201512/Colloquial%20Tamil.pdf). Both of these sources will be a little time consuming to actually get the sentences, but I want to do it at some point.

Additionally, Agurchand has 9 different conversations available on their [website](https://www.tutorialsmade.com/category/spoken-english-through-tamil/english-conversations/) and iLearnTamil.com has a set of [32 Colloquial Tamil Conversations](https://ilearntamil.com/32-conversations-in-colloquial-tamil-and-english/) available on their website. Both of these should be relatively easy to import into Anki.

### Anki Decks

A few people on my last post have asked me about making my Anki decks available to the public.

For learning characters, the deck [Tamil Alphabet](https://ankiweb.net/shared/info/1915121174) seems quite reasonable, it covers the individual consonants and vowels, as well as all of the combinations. Although in my opinion, it's probably more efficient to just read a primer on how the system works, and just practice reading real words to see the characters in action, rather than setting aside dedicated time to learn the script, you'll naturally get faster as you study more vocab and sentences.

For learning verb conjugations, I've uploaded my Anki verb deck to the [shared Anki Decks page](https://ankiweb.net/shared/info/282945044). This contains all the verbs listed in the Colloquial Tamil book, with fields for imperative, past, present, and future tenses. This is important because you essentially need to learn each of these separetely, and once you know these stems, you can predict how to construct all of the other conjugations. I used Azure Speech-To-Text to automatically generate audio for each field. At some point, I'll go back and add the romanization for each of these, but it's currently purely in Tamil Script.

For learning vocab, I used my own deck in the past which contained all the vocab from the Colloquial Tamil book. However, I never really liked this deck, both that the vocabulary choice isn't ideal, and also there is no Tamil Script available. For these reasons, I won't upload it to the shared Anki Decks page, but if you're really interested, send me an email and I'll forward the deck to you.

As mentioned, I've created my own Anki deck for learning sentences from Agurchand's website. However, I'm not going to post it since I don't have the rights to the book. However, if you do purchase the book (only 99 cents!), send me a screenshot of the receipt and I'd be happy to send you the deck.

Hopefully I'll have one more post in the near future with an update on my Colloquial Tamil Dialogues deck, and maybe even an update on Speech-To-Text dialogues from online Tamil media content!
