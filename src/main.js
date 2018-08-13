const fs = require("fs")
const client = new (require("discord.js")).Client( { autoReconnect: true } );

const commandList = {
	commands: (commands, message) => {
		let cmdList = []
		Object.keys(commandList).forEach(command => { 
			cmdList.push(command)
		})
		let string = ""
		string += "**Commands**: \n" + cmdList.join(", ")
		message.channel.send(string)
	},
	apply: (target) => {
		let methods = Object.keys(target)
		methods.forEach(i => {
			commandList[i] = target[i]
		})
	}
}

commandList.apply(require(__dirname + "/markov.js"))
commandList.apply(require(__dirname + "/responses.js"))

console.write = (message) => {
	process.stdout.write(message);
}

function getUsername(message) {
	return message.member.nickname == null ? message.author.username : message.member.nickname;
}

console.write("Connecting... ");

client.login(fs.readFileSync("token.txt", "utf-8").replace(/\r?\n|\r/g, ''));
client.on('error', console.error)
client.on("message", m => {
	// Ignore any bot messages
	if(m.author.id == client.user.id) return;

	// Special exemptions for Hesalite and OleMissTexan
	if(m.content.includes("%dog")) {
		commandList["hesalite"](undefined, m)
	}

	if(m.content.includes(";protect")) {
		commandList["olemisstexan"](undefined, m)
	}

	// Ignore any messages that don't have "!" as the start of the message
	if(m.content[0] != "!") return;

	let command = m.content.substring(1, m.content.length).split(" ");

	if(commandList[command[0]] != null)
	{
		console.write("Running command by " + getUsername(m) + ": " + m.content + "   ")
		commandList[command[0]](command.splice(1), m)
	}
	console.write("\n")
})
client.on("ready", () => {
	console.log("The Constable is ready to report NFA offenses.");
})
