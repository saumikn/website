---
title: Rating USCF Tournaments on Lichess.org
description: An overview of USCF rated tournaments conducted on Lichess, including tournament types and automation.
date: "2020-06-24"
categories:
  - chess
  - lichess
published: true
---

In the last three months, I've run twelve USCF rated tournaments online and many more unrated tournaments, as COVID-19 has put all of our OTB tournaments on hold. Our biggest event so far had over 200 players, and a $2500 prize fund! In this post, I'll give a quick overview of the types of tournaments we ran and the software I developed to automate the process.

### Lichess Arena

In arena tournaments, there aren't shared round start times, where everybody starts their round at the same time. Instead, players are paired as soon as the system finds a pairing for them. Unlike in a Swiss tournament, players may get paired against the same opponent multiple times.

### Lichess Swiss

Recently, Lichess implemented Swiss-style tournaments, paired directly by Lichess. While using Lichess Swiss pairings makes it very convenient for the TD to pair during the tournament, the main downside is that the TD loses all control over pairings. Players can only be paired by lichess rating and advance byes can't be scheduled, among other things.

### SwissSys Manual

SwissSys is one of the most common software programs for generating Swiss Pairings in OTB tournaments. The Manual method for running tournaments is fairly simple - each round, the TD simply copy/pastes the pairings and standings from SwissSys into a public Google Sheet. Players start their games by finding their opponent on Lichess and issuing a manual challenge. Once players finish their games, they can just type their result directly into the Google Sheet, and the TD can transfer the results back to SwissSys.

### SwissSys Automatic

While the above method is very easy to implement for a TD, it starts to become quite unwieldy with tournaments above 50 players. For this reason, I wrote a program to automate all of the above steps: posting pairings to Google Sheets, creating challenges between players, and collecting results.

For both SwissSys Manual and SwissSys automatic, I do acknowledge that this is significantly more effort than having Lichess run the tournament for you, but it comes with the key benefit that TDs get complete control over pairings. This means TDs can pair players using USCF Ratings, they can do team pairings (including avoiding sibling matchups), and they can use accelerated pairings.

### High-level Code Overview

In the rest of the post, I will be going over the actual code which allows directors to rate tournaments from Lichess. For those of you who are more interested in actually running tournaments than looking at the code, especially if you don't have any prior programming experience, I will suggest that you reach out for help.

In the project, there are two options for how to run the code.

1. Prompt the user for the cell in Google Sheets where section pairings should be printed to
2. Prompt the user for the section file with premade Lichess challenge links (created by calling [Lichess API Challenge](https://lichess.org/api/challenge/open))
3. Set up a new pairing object for new line in the pairing file
4. Assign a game link to the pairing, and increment the cell by a new row
5. Print the preliminary pairing to Google Sheets
6. Set up a stream to watch all the players by calling [Lichess API Stream](https://lichess.org/api/stream/games-by-users)

When a new value comes up in the stream, update the relevant pairing object with the game link or result, and post the update to Google Sheet (using [Google Sheets API](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/update)).

### Final Thoughts

While the code in this personal project isn't necessarily that impressive, I learned a lot from working on it.

- By figuring out how to interact with the REST-based Lichess and Google Sheets API calls, this was the first time I was doing something that could even remotely be considered web development!
- This was also my first actual complicated (by my standards) project, which was complex enough to warrant several different files and over 500 lines of code.

Hope you found this overview of the code interesting. Please let me know if you have any questions or comments about the code! Also, if you are a Tournament Director and need any guidance on how to run your own tournaments using this code, I'll be happy to help you get the code running and set up on your own computer - just let me know if you're having trouble!!
