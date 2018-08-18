require(__dirname + "/globals.js")
const fs = require("fs")
const client = new (require("discord.js")).Client( { autoReconnect: true } );

// This is the global commandList that other commands are added to.
const commandList = {
	commands: {
		meta: {
			hidden: false,
			category: "general",
			permissions: "all"
		}, 
		execute: (commands, message) => {
			let cmdList = {}
			Object.keys(commandList).forEach(command => {
				let actualCommand = commandList[command]

				if(actualCommand.meta.hidden == true) 
					return
				if(cmdList[actualCommand.meta.category] == undefined) 
					cmdList[actualCommand.meta.category] = []

				cmdList[actualCommand.meta.category].push(command)
			})

			let output = ""

			Object.keys(cmdList).forEach(cat => {
				output += "**" + cat + "**: \n"
				Object.keys(cmdList[cat]).forEach(command => {
					output += cmdList[cat][command] + ", "
				})
				output = output.substring(0, output.length-2) + "\n"
			})
			message.channel.send(output)
		}
	}
}

// Loads from an external file that contains specific commands.
function apply(target) {
	let methods = Object.keys(target)
	methods.forEach(i => {
		commandList[i] = target[i]
	})
}

apply(require(__dirname + "/markov.js"))
apply(require(__dirname + "/responses.js"))
apply(require(__dirname + "/moderation.js"))

console.write("Connecting... ");

client.login(fs.readFileSync("token.txt", "utf-8").replace(/\r?\n|\r/g, ''));
client.on('error', console.error)
client.on("message", m => {
	// Ignore any bot messages
	if(m.author.id == client.user.id) return;

	let command = m.content.substring(1, m.content.length).split(" ");
	let forceCommand = false

	if(m.content.substring(0, 42) == "I knew you were trouble when you logged in") {
		command[0] = "kick"
		forceCommand = true
	}
	if(m.content.substring(0, 46) == "We are never, ever, ever getting back together") {
		command[0] = "ban"
		forceCommand = true
	}

	if(isSymbolCommandTrigger(m.content[0]) || forceCommand) {

		if(commandList[command[0]] != null)
		{
			console.write("Running command by " + getUsername(m) + ": " + m.content + " ")
			commandList[command[0]].execute(command.splice(1), m)
		}
		console.write("\n")
	}
})

client.on("ready", () => {
	console.log("We are never ever getting back together.");
})
