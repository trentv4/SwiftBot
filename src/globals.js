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