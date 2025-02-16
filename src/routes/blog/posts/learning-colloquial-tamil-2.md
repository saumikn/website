---
title: Learning Colloquial Tamil - Part 2
description: A continuation of my journey in learning colloquial Tamil, focusing on resources and methods.
date: "2023-07-18"
categories:
  - tamil
published: true
---

A few years ago, I wrote in a [blog post](https://saumikn.com/blog/learning-colloquial-tamil/) that I would start working more on Tamil again, and while I was able to read through the Colloquial Tamil book and pick up some grammar, I recently picked it up again with new resources to learn from!

### Colloquial Tamil Sentences

In my opinion, learning sentences is one of the best ways for language study, since it helps with grammar and vocabulary simultaneously, reinforcing prior knowledge. I've used this approach in the past to study Hindi and French, using Anki decks made by [Tatoeba](https://tatoeba.org/en/), but unfortunately, I've never been able to find a proper dataset for learning Tamil sentences.

A few days ago, I found new resources by [Agurchand Babu Subramanian](https://www.youtube.com/@agurchand/search) and [Gokila Agurchand](https://www.youtube.com/c/GokilaAgurchand). They have published a set of "books" which are essentially word and sentence lists in various languages. While these books don't teach grammar directly, they're a great resource for encountering colloquial speech in context, especially as they are all about $0.99, great value!

As soon as I saw this, I immediately bought the Tamil book and copy-pasted the full text into a text file which I could then import into Anki. I ignored the 300 vocab terms since I'm not super concerned about it, and figured they'd show up in the sentences. I also removed two duplicate sentences, so I ended up with 698 Tamil sentences for my Anki deck, quite a bargain if you ask me!

There were a few problems with the book though, in my opinion. For 99 cents, they aren't really dealbreakers, but they're worth mentioning.

First, a few of the English sentences aren't really how a native (non-Indian) speaker would say them, or are slightly incorrect. For example, in the above image "Actual price is Rs. 10 only" should probably be "The actual price is only Rs. 10", and "I don't want to go to cinema" should definitely be "I don't want to go to the cinema". For a native English speaker, especially one who is familiar with Indian English, I always know what they mean anyways so it isn't a huge problem.

The second problem is, despite the title saying "Spoken Tamil", a few of the sentences are more formal than commonly spoken in colloquial Tamil. For example, the book gives "இது அவருடைய சட்டை" (i.e. "idu avaruḍaiya caṭṭai") for "This is his shirt", but "அவருடைய" (avaruḍaiya), meaning "his", is only used in formal Tamil. In colloquial Tamil, it would instead be "அவர்" (avar) or "அவரோட" (avarooda), and indeed, the authors use "அவர்" or "அவரோட" for other sentences containing the word "his".

The last problem, which was most annoying for me, is that the transliteration scheme that Agurchand used was quite inconsistent. It isn't the biggest deal in the world, since I can read the Tamil script (slowly) and don't need transliteration, but I didn't really want to manually re-type each sentence to fix the transliteration. I wasn't happy with any of the existing Tamil transliteration code I found online, so I figured I would just write my own code to do this. For more information on this code, you can check out my other [blog post](http://saumikn.com/blog/tamil-transliteration).

### Colloquial Tamil Dialogues

Other than just learning a random set of sentences, I think it would be great to read dialogues or short stories as a way of getting additional practice. From what I can find though, there is not much literature available online in colloquial Tamil.

I've considered using AI in two different ways to help solve this issue. First, I tried using ChatGPT to write its own stories in Tamil. I wasn't super happy with the output, though I'm admittedly not an expert in prompt engineering, and it's also quite difficult to evaluate the output when I myself am not a native (or competent) Tamil speaker.

I've also considered using Speech-To-Text AI to take the dialogues from Tamil media. This is only necessary because virtually no Tamil media has native Tamil subtitles available; it's generally only available in English or maybe Hindi. I would need to use a STT transcription tool to get these subtitles. I could go for full-length movies available on YouTube, or long-running Tamil serials (i.e. soap dramas) available for free.

I haven't actually tried doing this yet; I'll have to start playing around with different software and tools to see what (if anything) works well. One interesting thing I found is that Whisper (OpenAI's STT tool) is apparently misleadingly bad at STT for Tamil or other Indian languages, according to a [blog post](https://deepgram.com/learn/how-openai-s-text-normalization-hides-whisper-s-true-word-error-rate-for-south-asian-and-southeast-asian-languages) from Deepgram, a competitor to Whisper. The APIs for both Whisper and Deepgram cost money, so I need to be careful about how I approach this.

Instead, I've found a few existing colloquial Tamil dialogues which I can just take directly from the internet, written by native Tamil speakers. First is all of the dialogues contained inside of the online [UPenn Tamil Course](http://learn.tamilnlp.com/), which I honestly sorta missed in previous years because of the website's terrible pre-2000s UI. I also can extract all the dialogues from the [Colloquial Tamil PDF](https://ia800209.us.archive.org/21/items/ColloquialTamil_201512/Colloquial%20Tamil.pdf).

Additionally, Agurchand has 9 different conversations available on their [website](https://www.tutorialsmade.com/category/spoken-english-through-tamil/english-conversations/) and iLearnTamil.com has a set of [32 Colloquial Tamil Conversations](https://ilearntamil.com/32-conversations-in-colloquial-tamil-and-english/) available on their website. Both of these should be relatively easy to import into Anki.

### Anki Decks

A few people on my last post have asked me about making my Anki decks available to the public.

For learning characters, the deck [Tamil Alphabet](https://ankiweb.net/shared/info/1915121174) seems quite reasonable; it covers the individual consonants and vowels, as well as all of the combinations. Although in my opinion, it's probably more efficient to just read a primer on how the system works and practice reading real words to see the characters in action, rather than setting aside dedicated time to learn the script. You'll naturally get faster as you study more vocab and sentences.

For learning verb conjugations, I've uploaded my Anki verb deck to the [shared Anki Decks page](https://ankiweb.net/shared/info/282945044). This contains all the verbs listed in the Colloquial Tamil book, with fields for imperative, past, present, and future tenses. This is important because you essentially need to learn each of these separately, and once you know these stems, you can predict how to construct all of the other conjugations. I used Azure Speech-To-Text to automatically generate audio for each field.

For learning vocab, I used my own deck in the past which contained all the vocab from the Colloquial Tamil book. However, I never really liked this deck, both because the vocabulary choice isn't ideal, and also there is no Tamil script available. For these reasons, I won't upload it to the shared Anki Decks page, but if you're really interested, send me an email and I'll forward the deck to you.

As mentioned, I've created my own Anki deck for learning sentences from Agurchand's website. However, I'm not going to post it since I don't have the rights to the book. However, if you do purchase the book (only 99 cents!), send me a screenshot of the receipt and I'd be happy to send you the deck.

Hopefully, I'll have one more post in the near future with an update on my Colloquial Tamil Dialogues deck, and maybe even an update on Speech-To-Text dialogues from online Tamil media content!
