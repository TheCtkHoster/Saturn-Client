const config = require("../../config.json")
const Discord = require("discord.js")

exports.run = async (client, message, args) => {
    const well = new Discord.MessageEmbed()
    .setDescription(`Hello ${message.author}, Look like you dont have Kick member Permission. Try again later..`)

    if (!message.member.hasPermission("KICK_MEMBERS", "ADMINISTRATOR")) return message.channel.send(well)
    let user = message.mentions.users.first();

    let member = message.guild.member(user);
    
    const example2 = new Discord.MessageEmbed()
    .setDescription(`Well, Look like i was unable to ban the user.`)
    const example = new Discord.MessageEmbed()
    .setDescription(`Pls Mention The User.`)
    const example3 = new Discord.MessageEmbed()
    .setDescription(`You cant kick yourself!`)

    const example4 = new Discord.MessageEmbed()
    .setDescription(`You cant kick me!`)
    if (!user) return message.channel.send(example);
    if (user.id === message.author.id) return message.channel.send(example3);
    if (user.id === client.user.id) return message.channel.send(example4);

    member.kick(user).then(() => {
        const embed = new Discord.MessageEmbed()
        .setTimestamp()
        .setDescription(`Successfully Kicked\n\`\`\`yml\nKicked: ${user.tag}\nKicked By: ${message.author.tag}\`\`\``)
        .setColor("RANDOM")
        .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        
        message.channel.send(embed)
    }).catch(err => {
        message.channel.send(example2);
    })
}

exports.help = {
    name: "kick",
    description: "Kick the fools!",
    usage: [`${config.prefix}kick <Mentioned member>`],
    example: [`${config.prefix}kick @Greblue`]
}
  
  exports.conf = {
    aliases: [],
    cooldown: 1
}