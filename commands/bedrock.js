export const name = "bedrock"
export const cooldown = 5
export function execute(message, args) {
    message.channel.send("We do not support Bedrock Editions of Minecraft due to its differences to Java Edition, most notably the command differences.")
}