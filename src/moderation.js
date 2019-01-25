const fs = require("fs")

const USER_IN_AND_OUT_ID = "483891990388539393"
const MOD_LOGS_ID = "483892001025032193"
const SHITPOST_ID = "478663825910923274"

function getTimeFromInput(input) {
	if(input == undefined) return -1
	let modifier = input[input.length-1]
	let val = input.substring(0, input.length-1)

	if(modifier != "d" && modifier != "h" && modifier != "m" && modifier != "s") {
		modifier = "s" 
		val = input
	}

	if(isNaN(val)) return -1

	switch(modifier) {
		case "d": val *= 24
		case "h": val *= 60
		case "m": val *= 60
		case "s": val *= 1000
	}

	return val
}

let commands = {
	ban: {
		meta: META_MODERATOR, 
		execute: (commands, message) => {
			if(message.mentions.users.first() == undefined) {
				message.channel.send(":x: **User not found.**")
				return
			}

			let time = 0
			if(commands[1] != undefined) time = getTimeFromInput(commands[1])

			if(time == -1) {
				message.channel.send(":x: **Invalid time specified.**")
				return
			}

			let user = message.guild.members.get(message.mentions.users.first().id)
			let name = user.user.username + "#" + user.user.discriminator

			user.ban().then(() => {
				message.channel.send(":white_check_mark: Banned ***" + name + "***")

				message.channel.guild.channels.get(USER_IN_AND_OUT_ID).send({embed: {
					color: 3447003,
					description: user.toString() + " " + user.user.username + "#" + user.user.discriminator,
					author: {
						name: "Member Banned",
						icon_url: user.user.avatarURL
					},
					timestamp: new Date(),
				}})

				message.channel.guild.channels.get(MOD_LOGS_ID).send({embed: {
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

				if(time > 0) {
					setTimeout(() => {
						message.channel.guild.unban(user.id).catch(console.error)
					}, time)
				}
			}).catch(() => {
				message.channel.send(":x: **Not allowed to ban user.**")
			})
		}
	},
	kick: {
		meta: META_MODERATOR, 
		execute: (commands, message) => {
			if(message.mentions.users.first() == undefined) {
				message.channel.send(":x: **User not found.**")
				return
			}
			let user = message.guild.members.get(message.mentions.users.first().id)
			let name = user.user.username + "#" + user.user.discriminator

			user.kick().then(() => {
				message.channel.send(":white_check_mark: Kicked ***" + name + "***")

				message.channel.guild.channels.get(USER_IN_AND_OUT_ID).send({embed: {
					color: 3447003,
					description: user.toString() + " " + user.user.username + "#" + user.user.discriminator,
					author: {
						name: "Member Kicked",
						icon_url: user.user.avatarURL
					},
					timestamp: new Date(),
				}})

				message.channel.guild.channels.get(MOD_LOGS_ID).send({embed: {
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
	},
	mute: {
		meta: META_MODERATOR, 
		execute: (commands, message) => {
			if(message.mentions.users.first() == undefined) {
				message.channel.send(":x: **User not found.**")
				return
			}

			let time = 0
			if(commands[1] != undefined) time = getTimeFromInput(commands[1])

			if(time == -1) {
				message.channel.send(":x: **Invalid time specified.**")
				return
			}

			let role = message.guild.roles.find(e => e.name == "Muted")
			let user = message.guild.members.get(message.mentions.users.first().id)
			user.addRole(role)

			if(time > 0) {
				setTimeout(() => {
					user.removeRole(role)
				}, time)
			}
		}
	},
	unmute: {
		meta: META_MODERATOR, 
		execute: (commands, message) => {
			if(message.mentions.users.first() == undefined) {
				message.channel.send(":x: **User not found.**")
				return
			}

			let role = message.guild.roles.find(e => e.name == "Muted")
			let user = message.guild.members.get(message.mentions.users.first().id)
			user.removeRole(role)
		}
	},
	get_messages: {
		meta: META_MODERATOR,
		execute: (commands, message) => {
			let lastMessages = ""

			message.channel.fetchMessages({limit: 5}).then(all => {
				let messages = all.array()
				let formatted = ""
				for(let i = messages.length-1; i >= 0; i--) {
					let e = messages[i]			
					let date = e.createdAt
					let dateString = date.getFullYear() + "/" + (date.getMonth()+1) + "/" + date.getDate() + "-"

					dateString += (date.getHours()+"".length == 1 ? "0" + date.getHours()  :  date.getHours()) + ":"
					dateString += (date.getMinutes()+"".length == 1 ? "0" + date.getMinutes()  :  date.getMinutes())

					formatted += "[" + dateString + "] "
					formatted += "**" + e.author + "**: "
					formatted += e.content + "\n"
				}

				message.channel.send(formatted)
			}).catch(e => console.error)
		}
	}
}

/*
client.on("guildMemberAdd", (member) => {
	return;
	let user = member.user

	member.guild.channels.get(USER_IN_AND_OUT_ID).send({embed: {
		color: 3447003,
		description: user.toString() + " " + user.username + "#" + user.discriminator,
		author: {
			name: "Member Joined",
			icon_url: user.avatarURL
		},
		timestamp: new Date(),
	}})
})
client.on("guildMemberRemove", (member) => {
	return;
	let user = member.user
	member.guild.channels.get(USER_IN_AND_OUT_ID).send({embed: {
		color: 3447003,
		description: user.toString() + " " + user.username + "#" + user.discriminator,
		author: {
			name: "Member Left",
			icon_url: user.avatarURL
		},
		timestamp: new Date(),
	}})
})
*/

module.exports = commands
