const {roleIDs,channelIDs,color} = require("../config.json")

module.exports = {
    name: "updaterr",
    cooldown: 5,
    execute (message, args) {
        if (message.member.roles.cache.some(role=>role.id==roleIDs.team)) {
			message.guild.channels.cache.get(channelIDs.information).messages.fetch("757710945853112502").then(msg=>{
				msg.edit({embed: {
					color: color,
					title: "Notification Roles",
					description: "React with one of the following emojis to get certain roles. You will be pinged with every announcement or sneakpeek.",
					fields: [
						{
							name: "📢",
							value: "Announcements",
							inline: true
						},
						{
							name: "📷",
							value: "Sneakpeeks",
							inline: true
						},
						{
							name: "🏁",
							value: "Events",
							inline: true
						}
					]
				}}).then(()=>{
					message.react("✅")
					msg.react("🏁")
				})
			})
		} else message.react("🚫")
    }
}