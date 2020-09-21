module.exports = {
    name: "chrome",
    cooldown: 5,
    execute (message, args) {
        message.channel.send("Need help installing a Chrome Theme? Here's a tutorial https://youtu.be/8elax6XIzpg")
        message.delete()
    }
}