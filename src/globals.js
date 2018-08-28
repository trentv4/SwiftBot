// Console.log without the trailing \n
console.write = (message) => {
	process.stdout.write(message);
}

// Gets the nickname if available, or defaults to username if not.
getUsername = (message) => {
	return message.member.nickname == null ? message.author.username : message.member.nickname;
}

isSymbolCommandTrigger = (symbol) => {
	return (symbol == "!" || symbol == "%" || symbol == ";" || symbol == "~")
}

getPermissionLevel = (userID, guild) => {
	let user = guild.members.get(userID)
	let roles = user.roles.array()
	let permLevel = 0
	roles.forEach(e => {
		if(e.id == 480216395205050368 || e.name == "mod" || e.name == "Jake") {
			permLevel = 1
		}
	})

	return permLevel
}

USER_IN_AND_OUT_ID = "483891990388539393"
MOD_LOGS_ID = "483892001025032193"
SHITPOST_ID = "478663825910923274"

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

META_MODERATOR = {
	hidden: false,
	category: "moderation",
	permissions: 1
}

messageBuffer = []
