---
title: Markdown Presentations in RevealJS
description: An exploration of using RevealJS for creating presentations with Markdown.
date: "2023-03-29"
categories:
  - blog
  - presentations
published: true
---

A few months ago, I started using [RevealJS](https://revealjs.com) to make presentations instead of PowerPoint. RevealJS is "an open-source HTML presentation framework," with the idea that you can write your presentations programmatically, using HTML and JavaScript.

However, one problem that I ran into when I wanted to try it out is actually trying it out! On the RevealJS website, they provide three different options for installing the software - downloading a zip file from GitHub containing all of RevealJS, installing it through npm, or using a CDN.

I was hoping for a simpler solution, and what I came up with is just adding RevealJS as a dependency directly in my HTML file, running it from a CDN. If you don't know what a CDN is, it isn't too important; you can think of it as just downloading the software on the fly when you run your presentation.

This approach has the drawback that your presentations won't work when you aren't connected to the internet, but on the plus side, you can share your presentations with others by sending them a single HTML file, rather than sending them a whole folder of code or having them spin up their own Node server.

To illustrate how this approach works, I've taken the official RevealJS [demo presentation](https://revealjs.com/?demo) and edited it so that it only takes a single file to run. This single file is available on my [GitHub](https://gist.github.com/saumikn/5e2b1cd4a8a58504a34cea9232f07028), and I've also embedded it below, to highlight one of RevealJS's capabilities I find useful.

<!-- wp:shortcode -->

TODO: Fix this iframe

```html
<iframe
  src="https://saumikn.com/slides/demo"
  width="100%"
  height="500"
></iframe>
```

<!-- /wp:shortcode -->

In conclusion, using RevealJS for presentations can be a powerful alternative to traditional software, especially when leveraging the simplicity of Markdown and the flexibility of web technologies. If you're interested in trying it out, I encourage you to explore the options available and see how it can enhance your presentation experience.
