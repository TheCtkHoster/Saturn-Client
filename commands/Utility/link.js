const config = require("../../config.json")
const Discord = require("discord.js")

exports.run = async (client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setTitle('Click here')
    .setURL('https://takeb1nzyto.space/')
    .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    .setColor('RANDOM')
    .setTimestamp()

    message.channel.send(embed)
}

exports.help = {
    name: "link",
    description: `link.`,
    usage: [`${config.prefix}link`],
    example: [`${config.prefix}link`]
}
  
  exports.conf = {
    aliases: [""],
    cooldown: 1
}