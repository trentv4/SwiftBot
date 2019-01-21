const fs = require("fs")

function initialize(client) {
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
}

module.exports = initialize
