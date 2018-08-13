const fs = require("fs")
const client = new (require("discord.js")).Client( { autoReconnect: true } );

// This is the global commandList that other commands are added to.
const commandList = {
	commands: (commands, message) => {
		let cmdList = []
		Object.keys(commandList).forEach(command => { cmdList.push(command)	})
		message.channel.send("**Commands**: \n" + cmdList.join(", "))
	}
}

// Console.log without the trailing \n
console.write = (message) => {
	process.stdout.write(message);
}

// Loads from an external file that contains specific commands.
function apply(target) {
	let methods = Object.keys(target)
	methods.forEach(i => {
		commandList[i] = target[i]
	})
}

// Gets the nickname if available, or defaults to username if not.
function getUsername(message) {
	return message.member.nickname == null ? message.author.username : message.member.nickname;
}

apply(require(__dirname + "/markov.js"))
apply(require(__dirname + "/responses.js"))

console.write("Connecting... ");

client.login(fs.readFileSync("token.txt", "utf-8").replace(/\r?\n|\r/g, ''));
client.on('error', console.error)
client.on("message", m => {
	// Ignore any bot messages
	if(m.author.id == client.user.id) return;

	// Ignore any messages that don't have "!" or "%", etc as the start of the message
	// "!" for normal commands, "%;~" for special markov commands. In reality, any of
	// these will work, but this preserves familiarity to the old commands. ex. "%protect"
	// will work just as well as "!protect" or ";protect". 
	if(m.content[0] == "!" || m.content[0] == "%" || m.content[0] == ";" || m.content[0] == "~") {
		let command = m.content.substring(1, m.content.length).split(" ");

		if(commandList[command[0]] != null)
		{
			console.write("Running command by " + getUsername(m) + ": " + m.content + "   ")
			commandList[command[0]](command.splice(1), m)
		}
		console.write("\n")
	}
})
client.on("ready", () => {
	console.log("The Constable is ready to report NFA offenses.");
})
