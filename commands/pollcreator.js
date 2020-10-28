const {roleIDs,color} = require("../config.json")

module.exports = {
    name: "pollcreator",
    cooldown: 5,
    execute (message, args) {

		if ( message.guild==null || message.member.roles.cache.some(role=>role.id==roleIDs.team) ) {

			message.react("✅")

			message.author.send("**Poll Creator**\n\nWould you like to create a yes/no/maybe poll or configure multiple choice options yourself?\n\nReact with 1️⃣ for yes/no/maybe and 2️⃣ to configure yourself.")

			.then(pollTypeMessage => {
				(async ()=>{
					await pollTypeMessage.react("1️⃣")
					await pollTypeMessage.react("2️⃣")
				})()

				.then(()=>{
					const filter = (reaction, user) => ["1️⃣","2️⃣"].includes(reaction.emoji.name) && user.id==message.author.id
					pollTypeMessage.awaitReactions(filter, { max:1, time:60000, errors:["time"] })
					
					.then(collected => {
						const reaction = collected.first().emoji.name
						if (reaction=="1️⃣") pollType = "yesNoMaybe"
						else if (reaction=="2️⃣") pollType = "configurable"
						else return
						
						message.author.send("Enter the question for your poll.")

						.then(titleMessage => {
							titleMessage.channel.awaitMessages(()=>true, { max:1, time:60000, errors:["time"] })

							.then(messageCollection=>{
								const title = messageCollection.array()[0].content

								const sendPoll = options => {

									const numberEmojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣"]
									let optionsEmojis = {}
									for (const [index, value] of options.entries()) {
										optionsEmojis[numberEmojis[index]] = value
									}
									
									let prettyOptions = ""
									for (const [key, value] of Object.entries(optionsEmojis)) {
										prettyOptions = prettyOptions + key + ": " + value + "\n"
									}

									const embed = {
										"title": `Poll: ${title}`,
										"description": prettyOptions,
										"color": color
									}

									if (!message.guild==null) message.delete()
									message.author.send(
										`Preview of the poll. React with ✅ to confirm and send in <#${message.channel.id}>.`,
										{embed:embed}
									)

									.then(async previewMessage => {
										(async () => await previewMessage.react("✅") )()

										const filter = (reaction, user) => ["✅"].includes(reaction.emoji.name) && user.id==message.author.id
										previewMessage.awaitReactions(filter, { max:1, time:60000, errors:["time"] })


										.then(collected=>{
											if (collected.first().emoji.name=="✅") {
												message.channel.send({embed:embed})
												.then(async pollMessage => {
													for (emoji of Object.keys(optionsEmojis)) {
														await pollMessage.react(emoji)
													}
													message.author.send(`Message sent successfully.\nFind it here: ${pollMessage.url}`)
												})
											}
										})
									})

								}

								if (pollType=="yesNoMaybe") sendPoll(["Yes", "No", "Maybe"])
								else if (pollType=="configurable") {
									
									message.author.send("Enter the answer choices for your poll. Put each option on a new line. (max 6)")
									
									.then (choicesMessage => {
										choicesMessage.channel.awaitMessages( () => true, { max:1, time:60000, errors:["time"] } )
										.then( messageCollection => sendPoll ( messageCollection.array()[0].content.split("\n") ))
									})
								}
							})
						})
					})
				})
			})
		} else message.channel.send("You don't have the permissions to do that!")
	}
}