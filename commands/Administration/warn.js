const config = require("../../config.json")
const Discord = require("discord.js")
const conf = require('../../config.json')
const db = require(`quick.db`)
const discord = require(`discord.js`)

exports.run = async (client, message, args) => {
    const well = new Discord.MessageEmbed()
    .setDescription(`Hello ${message.author}, Look like you dont have Manage Server Permission. Try again later..`)

    if (!message.member.hasPermission("MANAGE_GUILD", "ADMINISTRATOR")) return message.channel.send(well);

    let arg = message.content.split(" ").slice(1);
    const arg1 = arg.join(" ");
      let prefix = conf.prefix;
      let args1 = message.content.slice(prefix.length).trim().split(/ +/g);
      let reason1 = args1.slice(2).join(" ");
      let user = message.mentions.users.first();

      const well1 = new Discord.MessageEmbed()
      .setDescription(`Pls mention the user!`)
      if (!user) return message.channel.send(well1);
      
      let warnings = db.get(`warn_${message.guild.id}_${user.id}`)

      const wel12 = new Discord.MessageEmbed()
      .setDescription(`You cant warn me!`)
      if (user.id === client.user.id) return message.channel.send(wel12);

      const well3 = new Discord.MessageEmbed()
      .setDescription(`You cant warn yourself!`)
      if (user.id === message.author.id) return message.channel.send(well3);

      const well4 = new Discord.MessageEmbed()
      .setDescription(`Pls type a reason!`)
      if (!reason1) return message.channel.send(well4);
      
      if (message.deletable) {
        message.delete();
    }
    
      const embed = new discord.MessageEmbed()
      .setFooter(message.guild.name, message.guild.iconURL({size: 2048}))
      .setTitle('You has been warned!')
      .setDescription(`\`\`\`yml\nWarned by: ${message.author.tag}\nReason: ${reason1}\`\`\``)
      .setColor("RED")
      .setTimestamp()//Simple LOLOLOLOL

      if(warnings === null) {
        db.add(`warning_${message.guild.id}_${user.id}`, 1)
        db.set(`latestwarn.${user.id}`, reason1)
        const well4 = new Discord.MessageEmbed()
        .setDescription(`${user} has been warned!`)
        user.send(embed).then(() => message.channel.send(well4)).catch(() => message.channel.send("Something wrong.. try again."));
      }
}

exports.help = {
    name: "warn",
    description: "warn the rules breaker!",
    usage: [`${config.prefix}warn <Mentioned user> [Reason]`],
    example: [`${config.prefix}warn Greblue Spamming!`]
}
  
  exports.conf = {
    aliases: [""],
    cooldown: 1
}