---
title: Visualizing Airline Routes and Hubs
description: Visualizing Airline Routes and Hubs
date: '2022-10-31'
categories:
  - sveltekit
published: true
---

![Post Image](https://images.airlineroutemaps.com/maps/United_Airlines.gif)

At first, I intended this to be a quick and simple exercise, using tools and libraries I already knew. However, I didn't really find anything suitable. The closest I found was the [Routes Maps Builder](https://github.com/kburchfiel/route_maps_builder/) by kburchfiel, which used Python and Folium to build the maps, but this didn't allow for interactive maps.

I then tried using Python and ipyleaflet. This worked, but I wasn't able to get the interactive visualizations deployed to on my personal website since it required a python server to be running in the backend, and I wanted this to be a simple static file which ran on the client side. This old code is still available in the Github repo, however.

Finally, I settled on using Javascript and Leaflet, two tools that I had pretty much never used before. Along the way, I also learned more on how my Digital Ocean-powered website actually runs, and how to combine Wordpress and non-Wordpress files together on my one website. All in all, a pretty pedagogical side project, without even considering the pretty maps!

![Post Image](https://raw.githubusercontent.com/saumikn/airlinemaps/master/screenshots/all.png)

