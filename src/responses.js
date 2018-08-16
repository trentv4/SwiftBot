const fs = require("fs")

let commands = {}
let data = {}

// Crawls the "data" folder which contains stuff like wuteat or wutdrink
// Generally dynamic (one-to-many)
fs.readdirSync("data/lists").forEach(file => {
	// "wuteat.json" -> "wuteat"
	let cleanName = file.substring(0, file.length-5)
	data[cleanName] = JSON.parse(fs.readFileSync("data/lists/" + file, "utf-8"))
	commands[cleanName] = (commands, message) => {
		message.channel.send()
	}
})

commands.wutmeal = (command, message) => {
	let eat = data.wuteat[Math.floor(Math.random() * data.wuteat.length)]
	let drink = data.wutdrink[Math.floor(Math.random() * data.wutdrink.length)]
	message.channel.send("\"" + eat + "\" and \"" + drink + "\"")
}

// This handles static commands, one-to-one responses
// Think !brinnels or !dsl
let responsesList = JSON.parse(fs.readFileSync("data/responses.json"))
Object.keys(responsesList).forEach(response => {
	commands[response] = (commands, message) => {
		message.channel.send(responsesList[response])
	}
})

module.exports = commands