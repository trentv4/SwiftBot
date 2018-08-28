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
				message.channel.send(":x: **User not found.**")
				return
			}
			let user = message.guild.members.get(message.mentions.users.first().id)
			let name = user.user.username + "#" + user.user.discriminator

			user.ban().then(() => {
				message.channel.send(":white_check_mark: Banned ***" + name + "***")
				message.channel.send({embed: {
					color: 3447003,
					author: {
						name: "Ban | " + user.user.username + "#" + user.user.discriminator,
						icon_url: user.user.avatarURL
					},
					fields: [{
						name: "User",
						value: user.toString(),
						inline: true
					}, {
						name: "Moderator",
						value: message.author.toString(),
						inline: true
					}, {
						name: "Reason",
						value: commands[1] == undefined ? "None" : commands[1],
						inline: true
					}],
					timestamp: new Date(),
				}})
			}).catch(() => {
				message.channel.send(":x: **Not allowed to ban user.**")
			})
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
				message.channel.send(":x: **User not found.**")
				return
			}
			let user = message.guild.members.get(message.mentions.users.first().id)
			let name = user.user.username + "#" + user.user.discriminator

			user.kick().then(() => {
				message.channel.send(":white_check_mark: Kicked ***" + name + "***")
				message.channel.send({embed: {
					color: 3447003,
					author: {
						name: "Kick | " + user.user.username + "#" + user.user.discriminator,
						icon_url: user.user.avatarURL
					},
					fields: [{
						name: "User",
						value: user.toString(),
						inline: true
					}, {
						name: "Moderator",
						value: message.author.toString(),
						inline: true
					}, {
						name: "Reason",
						value: commands[1] == undefined ? "None" : commands[1],
						inline: true
					}],
					timestamp: new Date(),
				}})
			}).catch(() => {
				message.channel.send(":x: **Not allowed to kick user.**")
			})
		}
	}
}

module.exports = commands
