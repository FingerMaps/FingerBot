const {prefix,rules} = require("../config.json")

module.exports = {
    name: "rules",
    cooldown: 5,
    execute (message, args) {
        if (Object.keys(rules).includes(args[0])) {
            message.channel.send(rules[args[0]])
            message.delete()
        }
        else message.channel.send(`Usage: \`${prefix}rules [number]\`\ne.g. \`${prefix}rules 4\``)
    }
}