const markov = require("markovchain")
const fs = require("fs")

const SHITPOST_CHANNEL_ID = 478602548442300427
const HESALITE = JSON.parse(fs.readFileSync("data/hesalite.json"))
const OLEMISSTEXAN = JSON.parse(fs.readFileSync("data/OLEMISSTEXAN.json"))

function getUsername(message) {
	return message.member.nickname == null ? message.author.username : message.member.nickname;
}

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
			console.log(filteredMessages)
			let chain = new markov(filteredMessages.join("."))
			let startPhrase = filteredMessages[Math.floor(Math.random() * filteredMessages.length)].split(" ")[0]
			let length = Math.floor((Math.random() * 20) + 60)

			message.channel.send(chain.start(startPhrase).end(length).process())
		}).catch(e => console.log(e))
	},
	mimic: (commands, message) => {
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
			let chain = new markov(all.join(" "))
			message.channel.send(chain.start(all[Math.floor(Math.random() * all.length)].split(" ")[0]).end((Math.random() * 10) + 20).process())
		})
	},
	hesalite: (commands, message) => {
		message.channel.send(markovFile(HESALITE))
	},
	olemisstexan: (commands, message) => {
		message.channel.send(markovFile(OLEMISSTEXAN))		
	}
}



module.exports = commands
