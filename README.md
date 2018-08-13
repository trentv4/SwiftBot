# Ayn Random #

This is a Discord bot written for nodejs. It was tested and written for v7.8.0 of Node, and utilizes es6 features.

Features of the bot:

* Dice rolling. Syntax: !roll XdY+5 or !roll XdY XdY XdY-5

* Setting the nickname. The bot requires the 'change nickname' permission. 

* Setting the avatar. This command is severely rate-limited and can only done about 3 times before a time out.

* Responses. The bot will respond when any messages contains the 'trigger' phrase and responds with the 'response' message. It is stored in 'responses.json'. 

# Installation #

* git clone the repository

* npm install in this directory

* Create a file labeled "token.txt" that contains the token of your bot, found in the Discord developer API.
