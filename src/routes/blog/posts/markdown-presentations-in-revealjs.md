---
title: Markdown Presentations in RevealJS
description: An exploration of using RevealJS for creating presentations with Markdown.
date: '2023-03-29'
categories:
  - blog
published: true
---

A few months ago, I started using [RevealJS](https://revealjs.com) to make presentations instead of Powerpoint. RevealJS is "an open-source HTML presentation framework", with the idea that you can write your presentations programmatically, using HTML and JS, rather than manually putting everything you want to show in the [WYSIWYG](https://web.archive.org/web/20241107073002/https://en.wikipedia.org/wiki/WYSIWYG) interface. Philosophically, it's quite like the difference between Word and Latex.

RevealJS has over 60k stars on [Github](https://web.archive.org/web/20241107073002/https://github.com/hakimel/reveal.js/) with built in features like mobile responsive layouts, animations for code formatting, rendering Latex equations and Markdown, and embedding websites and JS visualizations. Thanks to the extensive API, there are also a huge amount of [third-party plugins](https://web.archive.org/web/20241107073002/https://github.com/hakimel/reveal.js/wiki/Plugins,-Tools-and-Hardware) which add extra features to your presentations as well. For somebody who has to spend quite a bit of time making presentations for work, it seemed like the perfect thing to try out.

![](https://web.archive.org/web/20241107073002im_/https://saumikn.com/wp-content/uploads/image-1680103491422.png)

However, one problem that I ran into when I wanted to try it out is actually trying it out! On the RevealJS website, they provide three different options for installing the software - downloading a zip file from Github containing all of RevealJS, installing it through [Node](https://web.archive.org/web/20241107073002/https://nodejs.org/), and installing it as an NPM dependency. The third option is probably not relevant for most people making presentations, and the second one might be difficult for somebody without a background in web development. The first option is definitely the simplest, but even that requires you manually download the entire repository, and work on your presentations inside the repo.

I was hoping for a simpler solution, and what I came up with is just adding RevealJS as a dependency directly in my HTML file, running it from a CDN. If you don't know what a CDN is, it isn't too important, you can think of it as just downloading the software on the fly when you run your presentation.

This approach has the drawback that your presentations won't work when you aren't connected to the internet, but on the plus side, you can share your presentations with others by sending them a single HTML file, rather than sending them a whole folder of code or having them spin up their own Node server.

To illustrate how this approach works, I've taken the official RevealJS [demo presentation](https://web.archive.org/web/20241107073002/https://revealjs.com/?demo), and edited it so that it only takes a single file to run. This single file is available on my [Github](https://web.archive.org/web/20241107073002/https://gist.github.com/saumikn/5e2b1cd4a8a58504a34cea9232f07028), and I've also embedded it below, to highlight one of RevealJS's capabilities I find useful.

<!-- wp:shortcode -->

Note: This embed doesn't work on the new website, will implement a fix when I get time.

<!-- ```html
<iframe
  src="https://saumikn.com/slides/demo"
  width="100%"
  height="500"
></iframe>
``` -->

<!-- /wp:shortcode -->

However, I don't really like basing my presentations off the original demo, as it uses too much boilerplate HTML for my taste. Instead, I write my entire slides using markdown, as it's much simpler to write. It makes it very easy to just turn my presentation outline (sketched out in a text file) into a full fledged presentation with almost no extra work. To help people get started making RevealJS presentations using markdown, I've uploaded a simple presentation to [Github](https://web.archive.org/web/20241107073002/https://gist.github.com/saumikn/f5168b97425978a743dc7a78c3f1df6f), showing a template for how I do presentations using markdown. Here's what it looks like below:

Note: This embed doesn't work on the new website, will implement a fix when I get time.

Finally, I'll give a third example of an actual presentation I made in RevealJS, on the topic of Human-AI interaction, and the potential for AI to disrupt how humans do work - this presentation was given to the St. Mary's University in Nova Scotia, Canada.

Note: This embed doesn't work on the new website, will implement a fix when I get time.

Hopefully this helps start you off on using RevealJS for your own presentations!
