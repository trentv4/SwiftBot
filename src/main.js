require(__dirname + "/globals.js")
const fs = require("fs")
const client = new (require("discord.js")).Client( { autoReconnect: true } );

// Loads from an external file that contains specific commands.
function apply(target) {
	let methods = Object.keys(target)
	methods.forEach(i => {
		commandList[i] = target[i]
	})
}

function getCommand(raw) {
	let splitCommand = raw.content.substring(1, raw.content.length).split(" ")

	if(isSymbolCommandTrigger(raw.content[0])) {
		if(commandList[splitCommand[0]] != null) {
			return commandList[splitCommand[0]]
		}
	}

	return undefined
}

apply(require(__dirname + "/markov.js"))
apply(require(__dirname + "/responses.js"))

console.write("Connecting... ")

client.login(fs.readFileSync("token.txt", "utf-8").replace(/\r?\n|\r/g, ''))
client.on('error', console.error)
client.on("message", m => {
	// Ignore any bot messages
	if(m.author.id == client.user.id) return

	let command = getCommand(m)

	if(command != null) {
		console.write("Running command by " + getUsername(m) + ": " + m.content + "   ")
		command.execute(m.content.substring(1, m.content.length).split(" ").splice(1), m)
		console.write("\n")
	}
})

client.on("ready", () => {
	console.log("We are never ever getting back together.")
})
