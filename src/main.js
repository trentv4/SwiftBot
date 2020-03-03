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

	if(isSymbolCommandTrigger(raw.content[0]) && commandList[splitCommand[0]] != null) {
		return commandList[splitCommand[0]]
	}

	return undefined
}

apply(require(__dirname + "/retorts.js"))

console.write("Connecting... ")

client.login(fs.readFileSync("token.txt", "utf-8").replace(/\r?\n|\r/g, ''))
client.on('error', console.error)
client.on("message", m => {
	// Ignore any bot messages
	if(m.author.id == client.user.id) return

	let command = getCommand(m)
	if(command != null) {
		if(command.meta.whitelist.length > 0 && !command.meta.whitelist.includes(m.channel.id)) { return }

		console.write(`${getUsername(m)}: COMMAND | ${m.content}`)

		command.execute(
			m.content.substring(1, m.content.length).split(" ").splice(1), 
			m, 
			(output) => { m.channel.send(output) }
		)
		console.write("\n")
		return
	}

	let retort = retortCommands[m.content]
	if(retort != null) {
		if(retort.whitelist != null && retort.whitelist.length > 0 && !retort.whitelist.includes(""+m.channel.id)) { return }
		
		let text = retort.text.split("%")
		let retortOutput = ""
		for(let i = 0; i < text.length; i++) {
			if(i % 2 == 0) {
				retortOutput += text[i]
			} else {
				//This is a poor solution. Ideal: alternate syntax ($lowerCaseText$) for lowercased
				if(retort.lowerCase != null && retort.lowerCase == true) {
					let newText = retortData[text[i]][random(retortData[text[i]].length)].split("")
					newText[0] = newText[0].toLowerCase();
					retortOutput += newText.join("")
				} else {
					retortOutput += retortData[text[i]][random(retortData[text[i]].length)]
				}
			}
		}

		retortOutput = retortOutput.replace(" ", "")
		console.log(`${getUsername(m)}: RETORT  | "${m.content}" with response "${retortOutput}"`)
		m.channel.send(retortOutput)
	}
})

client.on("ready", () => {
	console.log("We are never ever getting back together.")
})
