// Console.log without the trailing \n
console.write = (message) => {
	process.stdout.write(message);
}

random = (input) => {
	return Math.floor(Math.random() * input);
}

getUsername = (message) => {
	if(message.member == null) return "Unknown :shrug:"
	return message.member.nickname == null ? message.author.username : message.member.nickname;
}

isSymbolCommandTrigger = (symbol) => { return symbol == "=" }

META_GENERAL = {
	hidden: false,
	category: "general",
	permissions: 0,
	whitelist: []
}

META_RESPONSES = {
	hidden: false,
	category: "responses",
	permissions: 0,
	whitelist: []
}

META_DEBUG = {
	hidden: true,
	category: "debug",
	permissions: 0,
	whitelist: []
}

require(__dirname + "/retorts.js")

commandList = {
	commands: {
		meta: META_GENERAL,
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

			output += "**retorts:**\n"
			for(let item in retortCommands) {
				if(item.hidden == null || !item.hidden) {
					output += item + ", "
				}
			}
			message.channel.send(output)
		}
	}
}
