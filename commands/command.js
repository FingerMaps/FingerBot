module.exports = {
    name: "command",
    cooldown: 5,
    execute (message, args) {
        message.channel.send("If you are on a server and your command blocks aren't working, go to your `server.properties` file and make sure the 25th line matches `enable-command-block=true`, then restart your server")
        message.delete()
    }
}