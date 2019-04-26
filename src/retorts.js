const fs = require("fs")

retortList = {}

let imported = JSON.parse(fs.readFileSync("retorts.json"))
Object.keys(imported).forEach(i => {
	retortList[i] = imported[i]
})

let commands = {
	retortconfig: {
		meta: {
			hidden: false,
			category: "responses",
			permissions: 4,
			whitelist: []
		},
		execute: (commands, message) => {
			if(commands[0] == "help") {
				// send help message
			}

			if(commands[0] == "show") {
				let retort = retortList[commands[1]]
				if(retort == null) {
					message.channel.send("No such retort.")
					return
				}

				message.channel.send(`**"${commands[1]}":**\n**Whitelist:** ${retort.whitelist == null ? "All" : retort.whitelist.join(", ")}\n**Responses:**${retort.responses.join(", ")}`)
			}

			let retort = commands[1]
			w(retort)
			if(commands[0] == "add") {

			}

			if(commands[0] == "del") {

			}

		}
	}
}

if(retortList.wuteat != null && retortList.wutdrink != null) {
	commands.wutmeal = {
		meta: META_RESPONSES,
		execute: (commands, m) => {
			if(retortList.wutdrink.whitelist.length > 0 && !retortList.wutdrink.whitelist.includes(m.channel.id)) { return }
			if(retortList.wuteat.whitelist.length > 0 && !retortList.wuteat.whitelist.includes(m.channel.id)) { return }

			m.channel.send(`**${retortList.wuteat.responses[Math.floor(Math.random() * retortList.wuteat.responses.length)]}** and **${retortList.wutdrink.responses[Math.floor(Math.random() * retortList.wutdrink.responses.length)]}**`)
		}
	}
}

module.exports = commands