module.exports = {
    name: "feedback",
    cooldown: 5,
    execute (message, args) {
        message.channel.send("Have an idea? Go submit your feedback here: <https://www.fingermaps.net/contact>")
        message.delete()
    }
}
