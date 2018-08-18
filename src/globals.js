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