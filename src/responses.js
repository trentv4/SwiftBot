const fs = require("fs")

let commands = {}
let data = {}

// Crawls the "data" folder which contains stuff like wuteat or wutdrink
fs.readdirSync("data/lists").forEach(file => {
	// "wuteat.json" -> "wuteat"
	let cleanName = file.substring(0, file.length-5)
	data[cleanName] = JSON.parse(fs.readFileSync("data/lists/" + file, "utf-8"))
	commands[cleanName] = (commands, message) => {
		message.channel.send(data[cleanName][Math.floor(Math.random() * data[cleanName].length)])
	}
})

let responsesList = JSON.parse(fs.readFileSync("data/responses.json"))
Object.keys(responsesList).forEach(response => {
	commands[response] = (commands, message) => {
		message.channel.send(responsesList[response])
	}
})

module.exports = commands