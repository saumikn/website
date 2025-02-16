---
title: Using Tableau to Visualize Light Rail Ridership in the Twin Cities
description: An exploration of light rail ridership data and visualization techniques using Tableau.
date: "2019-06-16"
categories:
  - blog
  - transit
published: true
---

## Introduction

The goal of my project was to determine the feasibility of increasing frequencies on the light rail segments outside of downtown. Specifically, doubling the frequency of the Blue Line from Mall of America Station to US Bank Stadium Station, and the frequency of the Green Line between Union Depot Station and US Bank Stadium Station, by adding extra trains that travel up to US Bank Stadium Station, but not farther. I do this to avoid the shared track between US Bank Stadium Station and Target Field Station, but still facilitating easy transfers between lines at US Bank Stadium.

## Background

Analyzing the feasibility of physically doubling the frequency on these tracks is out of my domain expertise, but I instead want to understand if ridership would support operating trains every 5 minutes outside Downtown Minneapolis. Anecdotally, when I lived near Stadium Village Station, I often found the trains to be quite full during peak hours.

## Data Sources

With any new analytics problem, the most immediate decision is which datasets to use. For this final project specifically, we were required to use one spatial point dataset and one spatial polygon dataset. The State of Minnesota publishes their transportation datasets, along with other GIS data at the [Minnesota Geospatial Commons](https://gisdata.mn.gov/organization/us-mn-state-metc). From this site, I ended up selecting datasets for analysis: [Transit boardings](https://gisdata.mn.gov/dataset/us-mn-state-metc-trans-stop-boardings-alightings) and the [Transit stops dataset](https://gisdata.mn.gov/dataset/us-mn-state-metc-trans-transit-stops).

## Visualizations

Both visualizations show four different types of graphs – a map of each station with size representing number of boardings, a bar chart showing the number of boardings directly, a pie chart comparing ridership in Downtown Minneapolis to areas outside Downtown Minneapolis, and a line graph visualizing frequency.

In each graph, I use a blue/green color scheme to differentiate shared Downtown Minneapolis track and other track. In my Green Line visualization, green represents stations only on the Green Line, while blue represents stations shared between the Blue and Green lines. In the Blue Line visualization, blue represents stations only on the Blue Line, while green represents stations shared between the Blue and Green lines.

## Conclusions

We have found that at least 40% of Green Line rides and 20% of Blue Line rides take place entirely outside Downtown Minneapolis. While our results may indicate that increased frequency outside Downtown Minneapolis is warranted, especially on the Green Line, we cannot make any strong conclusions without more data.

Along with daily ridership, some other statistics that we may use to further our analysis are boardings over time of day, region demographics, and comparisons with other transit systems. However, no data is publicly available on boardings over time of day and since I only follow Urban Planning as a hobby, I personally do not have enough domain expertise to create meaningful conclusions from these demographics, so the first two options are out. I could pursue comparisons with other transit systems, but I would need to put more effort into finding datasets, since each city publishes their own data.

If you're interested in reading more on the idea of increasing frequency outside Downtown Minneapolis, David Levinson wrote an [opinion piece](https://streets.mn/2015/12/07/wye-not/) advocating for this very idea.
