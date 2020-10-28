module.exports = {
    name: "chrome",
    cooldown: 5,
    execute (message, args) {
        message.channel.send("Need help installing a Chrome Theme? Here's a tutorial <https://youtu.be/UELG2xVy3-w>")
        message.delete()
    }
}