const config = require("../../config.json")
const Discord = require("discord.js")
const c = require("../../config.json")

exports.run = async (client, message, args) => {
  const well = new Discord.MessageEmbed()
  .setDescription(`Hello ${message.author}, Look like you dont have Manage nicknames Permission. Try again later..`)

    if (!message.member.hasPermission("MANAGE_NICKNAMES", "ADMINISTRATOR")) return message.reply(well);
  
    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);
    const well1 = new Discord.MessageEmbed()
    .setDescription(`Please mention the user.`)

    if (!user) return message.channel.send(well1);
    
    let member = message.guild.members.cache.get(user.id);
    
    await member.setNickname(null).then(() => {
      const well3 = new Discord.MessageEmbed()
      .setDescription(`**Success**, Successfully reset nickname of **${user.tag}** to **${nick}**.`)
      return message.channel.send(well3);
    }).catch(err => {
      const well4 = new Discord.MessageEmbed()
      .setDescription(`**Error**, failed to reset nickname for **${user.tag}**. \nMake sure role **${client.user.username}** is higher than members role.`)
      return message.channel.send(well4);
    });
}

exports.help = {
    name: "reset-nickname",
    description: "reset a nickname for a user.",
    usage: [`${config.prefix}reset-nickname <Mentioned member>`],
    example: [`${config.prefix}reset-nickname @Greblue#6328`]
}
  
  exports.conf = {
    aliases: [""],
    cooldown: 1
}