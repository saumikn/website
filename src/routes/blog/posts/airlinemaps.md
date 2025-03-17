---
title: Visualizing Airline Routes and Hubs
description: An exploration of airline route visualizations and their implementation.
date: '2022-10-31'
categories:
  - blog
published: true
---

**Note - the interactive map is currently not working on my new website, will fix when I get time.**

_You can jump straight to the interactive [visualization](https://saumikn.com/airlinemaps) here. Details on how I implemented this project are available in the [Github repo](https://github.com/saumikn/airlinemaps)._

![United Airlines Route Map](https://images.airlineroutemaps.com/maps/United_Airlines.gif)

Growing up, whenever my family used to take airplanes, I was always drawn to the airline route maps that were in the seat-back magazine. I loved going over all the lines and hubs, and seeing how to get from one city to another. However, these maps were quite ugly, and not great visualization tools. All the lines on the map were a single color (e.g. [Delta](https://news.delta.com/sites/default/files/styles/twitter_share_1200/public/US_10_15-01_0.png?itok=kmb_mPtD), [United](https://images.airlineroutemaps.com/maps/United_Airlines.gif)), so it was difficult to see which lines corresponded to which city halfway across the country.

![Air Arabia Route Map](https://i0.wp.com/airinsight.com/wp-content/uploads/2022-04-25.png)

_An example of Air Arabia's routes. I couldn't find an image that wasn't cut off._

I assumed that this was the best we could do, at least until this summer, when I was flying to Kenya on Air Arabia and I saw a route map that actually looked quite [good](https://i0.wp.com/airinsight.com/wp-content/uploads/2022-04-25.png?ssl=1)! I realized that we could use color to make the maps more legible. That was when I decided to create a tool to interactively visualize flights using color across all airlines.

At first, I intended this to be a quick and simple exercise, using tools and libraries I already knew. However, I didn't really find anything suitable. The closest I found was the [Routes Maps Builder](https://github.com/kburchfiel/route_maps_builder/) by kburchfiel, which used Python and Folium to build the maps, but this didn't allow for interactive maps.

I then tried using Python and ipyleaflet. This worked, but I wasn't able to get the interactive visualizations deployed to on my personal website since it required a python server to be running in the backend, and I wanted this to be a simple static file which ran on the client side. This old code is still available in the Github repo, however.

Finally, I settled on using Javascript and Leaflet, two tools that I had pretty much never used before. Along the way, I also learned more on how my Digital Ocean-powered website actually runs, and how to combine WordPress and non-Wordpress files together on my one website. All in all, a pretty pedagogical side project, without even considering the pretty maps!

Below, I've posted some screenshots of the visualization, which is available interactively on my website at [https://saumikn.com/airlinemaps](https://saumikn.com/airlinemaps). Because the map responds to your mouse, it works much better on a computer than on your phone, though I still have the click interactions working on mobile. Note that in all the images, route lines overlap. For example, both American and Delta fly nonstop between Atlanta and Dallas, but only one color can be shown since both lines take up the same space on the map.

![Domestic Routes Color-Coded](https://raw.githubusercontent.com/saumikn/airlinemaps/master/screenshots/all.png)

_Domestic routes, color-coded by airline. American flights are in green, United flights are in blue, and Delta flights are in red._

![American Airlines Routes](https://raw.githubusercontent.com/saumikn/airlinemaps/master/screenshots/american.png)

_Domestic routes flown by American, color-coded by route hub. Flights from Chicago are in yellow, flights from Dallas are in orange, etc._

![Delta Airlines Routes](https://raw.githubusercontent.com/saumikn/airlinemaps/master/screenshots/delta.png)

_Domestic routes flown by Delta, color-coded by route hub. Flights from Atlanta are in red, flights from Minneapolis are in pink, etc._

![United Airlines Routes](https://raw.githubusercontent.com/saumikn/airlinemaps/master/screenshots/united.png)

_Domestic routes flown by United, color-coded by route hub. Flights from Chicago are in red, flights from Dallas are in orange, etc._

![LAX Routes](https://raw.githubusercontent.com/saumikn/airlinemaps/master/screenshots/all-lax.png)

_Domestic routes flown from LAX, using the same color scheme as the first screenshot. LAX is notable as the only airport which all three airlines use as a hub, so there are a significant number of lines in red, blue, and green._

![ORD Routes](https://raw.githubusercontent.com/saumikn/airlinemaps/master/screenshots/all-ord.png)

_Domestic routes flown from ORD, using the same color scheme as the first screenshot. ORD is the only other airport serving multiple airlines as a hub (American and United). This is why there are many blue and green lines, but very few red lines._

![MCI Routes](https://raw.githubusercontent.com/saumikn/airlinemaps/master/screenshots/all-mci.png)

_Domestic routes flown from MCI, using the same color scheme as the first screenshot. MCI serves one of the biggest cities in the US, but isn't a hub for any airline._

![Delta Routes from MSP](https://raw.githubusercontent.com/saumikn/airlinemaps/master/screenshots/delta-msp.png)

_Domestic routes flown from MSP by Delta. Uses the same color scheme as the base Delta map._
