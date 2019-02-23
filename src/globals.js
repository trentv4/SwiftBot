// Console.log without the trailing \n
console.write = (message) => {
	process.stdout.write(message);
}

Math.randomS = (length) => {
	return Math.floor(Math.random() * length)
}

ROLE_ANTI_SHITPOST = { id: 309851110829457410, level: 1}
ROLE_MOD_ABUSE = { id: 332707439906390018, level: 2}
ROLE_SERVER_ADMINS = { id: 263762720719896578, level: 3}

// Gets the nickname if available, or defaults to username if not.
getUsername = (message) => {
	if(message.member == null) return "Unknown :shrug:"
	return message.member.nickname == null ? message.author.username : message.member.nickname;
}

isSymbolCommandTrigger = (symbol) => {
	return (symbol == "=")
}

getPermissionLevel = (user) => {
	let roles = user.roles.array()
	let maxPerm = 0
	for(let i = 0; i < roles.length; i++) {
		if(roles[i].id == ROLE_ANTI_SHITPOST.id && maxPerm < ROLE_ANTI_SHITPOST.level) maxPerm = ROLE_ANTI_SHITPOST.level
		if(roles[i].id == ROLE_MOD_ABUSE.id && maxPerm < ROLE_MOD_ABUSE.level) maxPerm = ROLE_MOD_ABUSE.level
		if(roles[i].id == ROLE_SERVER_ADMINS.id && maxPerm < ROLE_SERVER_ADMINS.level) maxPerm = ROLE_SERVER_ADMINS.level
	}
	return maxPerm
}

META_GENERAL = {
	hidden: false,
	category: "general",
	permissions: 0
}

META_MARKOV = {
	hidden: false,
	category: "markov",
	permissions: 0
}

META_MARKOV_HESALITE = {
	hidden: false,
	category: "markov-hesalite",
	permissions: 0
}

META_MARKOV_OLEMISSTEXAN = {
	hidden: false,
	category: "markov-olemisstexan",
	permissions: 0
}

META_MARKOV_TAYTAY = {
	hidden: false,
	category: "markov-taytay",
	permissions: 0
}

META_RESPONSES = {
	hidden: false,
	category: "responses",
	permissions: 0
}

META_DEBUG = {
	hidden: true,
	category: "debug",
	permissions: 0	
}

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
			message.channel.send(output)
		}
	}
}