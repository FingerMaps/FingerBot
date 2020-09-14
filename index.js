const fs = require("fs")
const Discord = require("discord.js")
const {prefix,joinLeaveChannelID,memberRoleID} = require("./config.json")
require("dotenv").config()

const client = new Discord.Client()
client.commands = new Discord.Collection()
module.exports.client = client

for (const file of fs.readdirSync("./commands").filter(file => file.endsWith('.js'))) {
	const command = require(`./commands/${file}`)
	client.commands.set(command.name, command)
}

const cooldowns = new Discord.Collection()

client.once("ready", () => console.log("bot running") )

client.on("message", message => {

	if (!message.content.startsWith(prefix)) return

	const args = message.content.slice(prefix.length).split(/ +/)
	const command = args.shift().toLowerCase()
	
	if (!client.commands.has(command)) return;

	// cooldown stuff
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection())
	}
	const now = Date.now()
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000
	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing that command.`)
		}
	}
	timestamps.set(message.author.id, now)
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)

	try {
		client.commands.get(command).execute(message, args)
	} catch (error) {
		console.error(error)
		message.reply('There was an error trying to execute that command!')
	}
})

// join message
client.on('guildMemberAdd', member => {
    client.channels.cache.get(joinLeaveChannelID).send(`Hey <@${member.id}>, welcome to the FingerMaps Official Discord Server!`)
    member.roles.add(member.guild.roles.cache.find(role=>role.id==memberRoleID)).catch(error=>console.error(error))
})

client.login(process.env.discordtoken)