const config = require("../../config.json")
const Discord = require("discord.js")

exports.run = async (client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setTitle('Click here to join my support server.')
    .setURL('https://discord.gg/PgtWuVv')
    .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    .setColor("RANDOM")
    .setTimestamp()

message.channel.send(embed);
}

exports.help = {
    name: "support-server",
    description: "Join our support server.",
    usage: [`${config.prefix}support-server`],
    example: [`${config.prefix}support-server`]
}
  
  exports.conf = {
    aliases: ["s-s"],
    cooldown: 1
}