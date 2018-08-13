const markov = require("markovchain")
const fs = require("fs")

const SHITPOST_CHANNEL_ID = 478663825910923274
const DATA_HESALITE = JSON.parse(fs.readFileSync("data/hesalite.json"))
const DATA_OLEMISSTEXAN = JSON.parse(fs.readFileSync("data/OLEMISSTEXAN.json"))
const DATA_TAYLOR = JSON.parse(fs.readFileSync("data/TAYLOR.json"))

function markovFile(inputFile) {
	let chain = new markov(inputFile.join("."))
	let startPhrase = inputFile[Math.floor(Math.random() * inputFile.length)].split(" ")[0]
	let length = Math.floor((Math.random() * 20) + 60)
	return chain.start(startPhrase).end(length).process()
}

let commands = {
	summary: (commands, message) => {
		// Only allowed in shitposting channel
		if(message.channel.id != SHITPOST_CHANNEL_ID) return

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

			message.channel.send(markov(filteredMessages))
		}).catch(e => console.log(e))
	},
	mimic: (commands, message) => {
		// Only allowed in shitposting channel
		if(message.channel.id != SHITPOST_CHANNEL_ID) return

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
			message.channel.send(markov(all))
		})
	}, 
	//Hesalite triggers
	dog: (commands, message) => {
		message.channel.send(markovFile(DATA_HESALITE))
	},
	girlfriend: (commands, message) => {
		message.channel.send(markovFile(DATA_HESALITE))
	},
	BAR: (commands, message) => {
		message.channel.send(markovFile(DATA_HESALITE))
	},
	FNMilitaryCollector: (commands, message) => {
		message.channel.send(markovFile(DATA_HESALITE))
	},
	// OleMissTexan triggers
	serve: (commands, message) => {
		message.channel.send(markovFile(DATA_OLEMISSTEXAN))
	},
	oink: (commands, message) => {
		message.channel.send(markovFile(DATA_OLEMISSTEXAN))
	},
	protect: (commands, message) => {
		message.channel.send(markovFile(DATA_OLEMISSTEXAN))		
	},
	// Taylor Swift triggers
	basicbitch: (commands, message) => {
		let verse = ""
		for(let i = 0; i <= 5; i++) {
			verse += markovFile(DATA_TAYLOR) + "\n"
		}
		message.channel.send(verse)
	},
	starbucks: (commands, message) => {
		let verse = ""
		for(let i = 0; i <= 5; i++) {
			verse += markovFile(DATA_TAYLOR) + "\n"
		}
		message.channel.send(verse)
	},
	nevereverever: (commands, message) => {
		let verse = ""
		for(let i = 0; i <= 5; i++) {
			verse += markovFile(DATA_TAYLOR) + "\n"
		}
		message.channel.send(verse)
	}
}



module.exports = commands
