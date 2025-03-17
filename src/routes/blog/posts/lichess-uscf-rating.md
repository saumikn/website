---
title: Rating USCF Tournaments on Lichess.org
date: '2020-06-23'
categories:
  - chess
published: true
---

## Introduction

In the last three months, I've run twelve USCF rated tournaments online and many more unrated tournaments, as COVID-19 has put all of our OTB tournaments on hold. Our biggest event so far had over 200 players, and a $2500 prize fund! In this post, I'll give a quick overview of the types of tournaments I've run and describe a custom software I wrote to greatly simplify the amount of work needed to USCF-rate tournaments on Lichess.

If you want to dive right into the code, I’ve made it available to the public at [https://github.com/saumikn/swiss-by-api](https://github.com/saumikn/swiss-by-api).

## Websites

There are two major websites that I can use to run chess tournaments on: [chess.com](chess.com) and [lichess.org](lichess.org). I personally prefer Lichess, due to its better interface (in my opinion), it’s easy-to-use [API](https://lichess.org/api) for integrating with my own code, and because I like to support open-source projects. There is a 3rd platform we could also use, the [Internet Chess Club](https://www.chessclub.com/), but ICC is old, has a worse UI, and (most importantly) isn’t free.

## Types of Tournaments

In this blog, I’ll be talking specifically about four types of tournaments: Lichess Arena, Lichess Swiss, SwissSys Manual, and SwissSys Automatic.

![](https://web.archive.org/web/20240419132338im_/https://saumikn.com/wp-content/uploads/2020/06/swiss-1-1536x878.png)

**Lichess Arena**: In arena tournaments, there aren’t shared round start times, where everybody starts their round at the same time. Instead, players are paired as soon as the system finds a pairing for them. Unlike in a Swiss tournament, players may get paired against the same opponent more than once, though two players will never get paired against each other two games in a row.

**Lichess Swiss**: Recently, Lichess implemented Swiss-style tournaments, paired directly by Lichess. While using Lichess Swiss pairings makes it very convenient for the TD to pair during the tournament, the main downside is that the TD loses all control over pairings. Players can only be paired by lichess rating and advance byes can’t be scheduled, among other things.

**SwissSys Manual**: SwissSys is one of the most common software programs for generating Swiss Pairings in OTB tournaments. The Manual method for running tournaments is fairly simple - each round, the TD simply copy/pastes the pairings and standings from SwissSys into a public Google Sheet. Players start their games by finding their opponent on Lichess and issuing a manual challenge. Once players finish their games, they can just type their result directly into the Google Sheet, and the TD can transfer the results back to SwissSys.

**SwissSys Automatic**: While the above method is very easy to implement for a TD, it starts to become quite unwieldy with tournaments above 50 players. For this reason, I wrote a program to automate all of the above steps: posting pairings to Google Sheets, creating challenges between players, and collecting results.

For both SwissSys Manual and SwissSys automatic, I do acknowledge that this is significantly more effort than having Lichess run the tournament for you, but it comes with the key benefit that TDs get complete control over pairings. This means TDs can pair players using USCF Ratings, they can do team pairings (including avoiding sibling matchups), and they can use accelerated pairings.

High-level Code Overview

![](https://web.archive.org/web/20240419132338im_/https://saumikn.com/wp-content/uploads/2020/06/code-1536x983.png)

In the rest of the post, I will be going over the actual code which allows directors to rate tournaments from Lichess. For those of you who are more interested in actually running tournaments than looking at the code, especially if you don’t have any prior programming experience, I will suggest that you instead take a look at the [Readme](https://github.com/saumikn/swiss-by-api/blob/master/README.md) file, which has instructions on how directors can run the code.

In the project, there are two options for how to run the code.

**Option 1:** This is the easier of the two options, and is used for built-in Lichess Arena and Lichess Swiss events. Essentially, all a TD needs to do is run a Arena or Swiss as usual, and then follow the instructions listed in the [Readme](https://github.com/saumikn/swiss-by-api/blob/master/README.md).

To look at how the code actually works, let’s look inside arena.py. Here is a quick pseudocode of the conversion process.

1. The TD needs to have a file in the same directory called data.csv, where all of the players have information with their Lichess username, USCF Id, and Name
2. Make an API request at [https://lichess.org/api/tournament_id/games](https://lichess.org/api/tournament_id/games) to get the games of the tournament.
3. Go through all these games and filter only the games played by players we have information on in data.csv
4. Get the set of all the players who competed in the tournament
5. Construct a crosstable by going through each player and recording their games into the crosstable
6. Write the crosstable into xtable.csv
7. Import xtable.csv into SwissSys

**Option 2:** This is the harder of the two options, and is used for SwissSys Automatic style pairings. To run a tournament using this method, you should also follow the instructions listed in the [Readme](https://github.com/saumikn/swiss-by-api/blob/master/README.md).

To understand how the code works, let’s look at the most important call - start_round(). Here is a quick pseudocode of the function:

1. Prompt the user for the cell in Google Sheets where section pairings should be printed to
2. Prompt the user for the section file with premade Lichess challenge links (created by calling [https://lichess.org/api/challenge/open](https://lichess.org/api/challenge/open))
3. Set up a new pairing object for new line in the pairing file
4. Assign a game link to the pairing, and increment the cell by a new row
5. Print the preliminary pairing to Google Sheets
6. Set up a stream to watch all the players by calling [https://lichess.org/api/stream/games-by-users](https://lichess.org/api/challenge/open)
7. When a new value comes up in the stream, update the relevant pairing object with the game link or result, and post the update to Google Sheet (using [sheet.values().update()](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/update))

## Final Thoughts

While the code in this personal project isn’t necessarily that impressive, I learned a lot from working on it.

- By figuring out how to interact with the REST-based Lichess and Google Sheets API calls, this was the first time I was doing something that could even remotely be considered web development!
- This was also my first actual complicated (by my standards) project, which was complex enough to warrant several different files and over 500 lines of code.
- Finally, since my entire goal was to make this accessible to other directors who would presumably have very little understanding of Python, I had to make the interface for accessing the code as easy to use as possible. This focus permeated throughout the entire codebase, since I had to set all user-defined values outside the code entirely, and make it so Directors could just access them with command-line arguments, and the .env file.

Thanks to Michael Zhang for helping me get the Lichess API calls to work initially and Lakin from the Lichess Discord for helping me with the Game Streams working. Huge shoutout to Thibault, the founder and main developer of Lichess. When I discovered an API call limit in my code the day before I had our 200+ player tournament, Thibault responded immediately to my questions with more information, and pushed a code fix within 12 hours which solved my API request issue.

Hope you found this overview of the code interesting. Please let me know if you have any questions or comments about the code! Also, if you are a Tournament Director and need any guidance on how to run your own tournaments using this code, I’ll be happy to help you get the code running and set up on your own computer - just let me know if you’re having trouble!!
