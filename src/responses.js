require(__dirname + "/globals.js")
const fs = require("fs")

function save(list) {
	fs.writeFileSync(`data/lists/${list}.json`, JSON.stringify(data[list]))
}

let commands = {
	add: {
		meta: META_RESPONSES,
		execute: (commandsExec, message) => {
			if(getPermissionLevel(message.member) < 1) {
				message.channel.send(":x: Not enough permissions")
				return
			}

			let entry = message.content.substring(6 + commandsExec[0].length)

			if(commandsExec[0] == null || entry.length == 0) {
				message.channel.send(":x: **Improper usage. Format: =add [list] [entry]**")
				return
			}

			let list = commandsExec[0]

			if(commandList[list] != null && data[list] == null) {
				message.channel.send(":x: **Command is reserved**")
				return					
			}

			if(data[list] != null) {
				data[list].push(entry)
			} else {
				data[list] = [entry]

				commandList[list] = {
					meta: META_RESPONSES,
					execute: (commands, message) => {
						message.channel.send(data[list][Math.randomS(data[list].length)])
					}
				}
			}
			message.channel.send(`:white_check_mark: Added \`${entry}\` to \`${list}\``)
			save(list)
		}
	},
	remove: {
		meta: META_RESPONSES,
		execute: (commandsExec, message) => {
			if(getPermissionLevel(message.member) < 1) {
				message.channel.send(":x: Not enough permissions")
				return
			}

			let entry = message.content.substring(9 + commandsExec[0].length)

			if(commandsExec[0] == null || entry.length == 0) {
				message.channel.send(":x: **Improper usage. Format: =add [list] [entry]**")
				return
			}

			let list = commandsExec[0]

			if(data[list] == null) {
				message.channel.send(":x: **Not a list**")
				return
			}

			let newList = []
			for(let i = 0; i < data[list].length; i++) {
				if(data[list][i] != entry) {
					newList.push(data[list][i])
				}
			}
			data[list] = newList

			message.channel.send(`:white_check_mark: **Removed \`${entry}\` from \`${list}\`**`)
			save(list)
		}
	},
	list: {
		meta: META_RESPONSES,
		execute: (commands, message) => {
			if(commands[0] == null || data[commands[0]] == null) {
				message.channel.send("**:x: List does not exist**")
				return
			}

			message.channel.send(`**${commands[0]}**: ${data[commands[0]].join(", ").toString()}`)
		}
	}
}
let data = {}

// Crawls the "data" folder which contains stuff like wuteat or wutdrink
// Generally dynamic (one-to-many)
fs.readdirSync("data/lists").forEach(file => {
	// "wuteat.json" -> "wuteat"
	let cleanName = file.substring(0, file.length-5)
	data[cleanName] = JSON.parse(fs.readFileSync("data/lists/" + file, "utf-8"))
	commands[cleanName] = {
		meta: META_RESPONSES, 
		execute: (commands, message) => {
			message.channel.send(data[cleanName][Math.randomS(data[cleanName].length)])
		}
	}
})

commands.wutmeal = {
	meta: {
		hidden: false,
		category: "responses",
		permissions: 0
	}, 
	execute: (commands, message) => {
		let eat = data.wuteat[Math.randomS(data.wuteat.length)]
		let drink = data.wutdrink[Math.randomS(data.wutdrink.length)]
		message.channel.send(eat + " and " + drink)
	}
}

// This handles static commands, one-to-one responses
// Think !brinnels or !dsl
let responsesList = JSON.parse(fs.readFileSync("data/responses.json"))
Object.keys(responsesList).forEach(response => {
	commands[response] = {
		meta: {
			hidden: false,
			category: "responses",
			permissions: 0
		}, 
		execute: (commands, message) => {
			message.channel.send(responsesList[response])
		}
	}
})

module.exports = commands