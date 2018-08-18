const markov = require("markovchain")
const fs = require("fs")

// Change to appropriate shitposting hole while in developer mode
const SHITPOST_CHANNEL_ID = 478663825910923274
// Constant data that is loaded from files and never changes.
const DATA_HESALITE = JSON.parse(fs.readFileSync("data/hesalite.json"))
const DATA_OLEMISSTEXAN = JSON.parse(fs.readFileSync("data/olemisstexan.json"))
const DATA_TAYLOR = JSON.parse(fs.readFileSync("data/taylor.json"))

function markovFile(dataset, length) {
	let chain = new markov(dataset.join("."))

	let assignedLength = length == undefined ? Math.floor((Math.random() * 30) + 10) : length
	let currentLength = assignedLength
	let response = ""

	while(response.split(" ").length <= assignedLength) {
		let startPhrase = dataset[Math.floor(Math.random() * dataset.length)].split(" ")[0]
		let output = chain.start(startPhrase).end(currentLength).process()
		currentLength -= output.split(" ").length + 1

		let lastChar = output[output.length-1]
		if(lastChar == "," || lastChar == "." || lastChar == "!" || lastChar == ".") {
			response += output + " "
		} else {
			response += output + ". "
		}
	}

	return response
}

function isChannelAllowed(message) {
	return message.channel.id == SHITPOST_CHANNEL_ID || message.guild.id == 478602305302954000;
}

function sendMarkovMessage(message, name, dataset, length) {
	if(isChannelAllowed(message)) {
		message.channel.send("**" + name + "**: \n" + markovFile(dataset, length))
	}
}

let commands = {
	// Feeds a channel into a markov chain
	summary: (commands, message) => {
		// Only allowed in shitposting channel
		if(!isChannelAllowed(message)) return

		let channel = message.mentions.channels.first()
		if(channel == undefined) {
			message.channel.send("Channel not found.")
			return
		}
		channel.fetchMessages({limit: 10}).then(all => {
			let filteredMessages = []
			all.forEach(item => {
				if(item.content == "") return
				if(item.content[0] == "!") return
				filteredMessages.push(item.content)				
			})

			message.channel.send(markovFile(filteredMessages))
		}).catch(e => console.log(e))
	},
	// Feeds a user into a markov chain
	mimic: (commands, message) => {
		// Only allowed in shitposting channel
		if(!isChannelAllowed(message)) return

		let target = undefined
		try {
			target = message.mentions.users.first().id
		} catch(e) {
			return
		}
		let userLogs = []
		let guild = message.channel.guild
		let channels = guild.channels.array()

		let promises = []

		for(let i = 0; i < channels.length; i++) {
			let channel = channels[i]
			if(channel.type != "text") continue

			promises.push(new Promise((resolve, reject) => {
				channel.fetchMessages({limit: 100}).then(messages => {
					let l = []
					messages.forEach(message => {
						if(message.author.id != target) return
						if(message.content == "") return
						if(message.content[0] == "!") return
						l.push(message.content)
					})
					resolve(l)
				})
			}))
		}

		Promise.all(promises).then(out => {
			let all = []
			for(let i = 0; i < out.length; i++) {
				for(let g = 0; g < out[i].length; g++) {
					all.push(out[i][g])
				}
			}
			message.channel.send(markovFile(all))
		}).catch(e => console.log(e))
	}, 
	//Hesalite triggers
	dog: (commands, message) => {
		sendMarkovMessage(message, "Hesalite", DATA_HESALITE)
	},
	girlfriend: (commands, message) => {
		sendMarkovMessage(message, "Hesalite", DATA_HESALITE)
	},
	BAR: (commands, message) => {
		sendMarkovMessage(message, "Hesalite", DATA_HESALITE)
	},
	FNMilitaryCollector: (commands, message) => {
		sendMarkovMessage(message, "Hesalite", DATA_HESALITE)
	},
	// OleMissTexan triggers
	serve: (commands, message) => {
		sendMarkovMessage(message, "OleMissTexan", DATA_OLEMISSTEXAN)
	},
	oink: (commands, message) => {
		sendMarkovMessage(message, "OleMissTexan", DATA_OLEMISSTEXAN)
	},
	protect: (commands, message) => {
		sendMarkovMessage(message, "OleMissTexan", DATA_OLEMISSTEXAN)
	},
	// Taylor Swift triggers
	basicbitch: (commands, message) => {
		if(!isChannelAllowed(message)) return

		let verse = "**Taylor Swift**: \n"
		for(let i = 0; i < 4; i++) {
			verse += markovFile(DATA_TAYLOR, Math.floor((Math.random() * 10) + 10)) + "\n"
		}
		message.channel.send(verse)
	},
	starbucks: (commands, message) => {
		if(!isChannelAllowed(message)) return

		let verse = "**Taylor Swift**: \n"
		for(let i = 0; i < 4; i++) {
			verse += markovFile(DATA_TAYLOR, Math.floor((Math.random() * 10) + 10)) + "\n"
		}
		message.channel.send(verse)
	},
	nevereverever: (commands, message) => {
		if(!isChannelAllowed(message)) return

		let length = 2000
		let verse = ""

		while(length >= 2000) {
			verse = "**Taylor Swift**: \n"
			for(let g = 0; g < 4; g++) {
				for(let i = 0; i < 4; i++) {
					verse += markovFile(DATA_TAYLOR, Math.floor((Math.random() * 10) + 10)) + "\n"
				}
				verse += "\n"
			}
			length = verse.length
		}
		message.channel.send(verse)
	}
}

module.exports = commands