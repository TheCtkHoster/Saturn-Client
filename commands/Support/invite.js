const config = require("../../config.json")
const Discord = require("discord.js")

exports.run = async (client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setTitle('Click here to invite me.')
    .setURL('https://discord.com/api/oauth2/authorize?client_id=782516877908901889&permissions=8&scope=bot')
    .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    .setColor('RANDOM')
    .setTimestamp()

    message.channel.send(embed)
}

exports.help = {
    name: "invite",
    description: `Invite Saturn Client to your server!`,
    usage: [`${config.prefix}invite`],
    example: [`${config.prefix}invite`]
}
  
  exports.conf = {
    aliases: [""],
    cooldown: 1
}