const fs = require("fs")

let commands = {
	ban: {
		meta: {
			hidden: false,
			category: "moderation",
			permissions: 1
		}, 
		execute: (commands, message) => {
			if(message.mentions.users.first() == undefined) {
				message.channel.send("User not found.")
				return
			}
			let user = message.guild.members.get(message.mentions.users.first().id)
			let name = user.user.username + "#" + user.user.discriminator

			user.ban().then(() => {
				message.channel.send("Banned ***" + name + "***")
			}).catch(console.error)
		}
	},
	kick: {
		meta: {
			hidden: false,
			category: "moderation",
			permissions: 1
		}, 
		execute: (commands, message) => {
			if(message.mentions.users.first() == undefined) {
				message.channel.send("User not found.")
				return
			}
			let user = message.guild.members.get(message.mentions.users.first().id)
			let name = user.user.username + "#" + user.user.discriminator

			user.kick().then(() => {
				message.channel.send("Kicked ***" + name + "***")
			}).catch(console.error)
		}
	},
	analyze: {
		meta: {
			hidden: false,
			category: "moderation",
			permissions: 1
		},
		execute: (commands, message) => {
			message.channel.send("Allowed")
		}
	}
}

module.exports = commands
