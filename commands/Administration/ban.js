const config = require("../../config.json")
const Discord = require("discord.js")

exports.run = async (client, message, args) => {
    let args1 = message.content.split(" ");
    const args2 = args1.slice(1);
    let reason1 = args2.slice(1).join(" ");

    const well = new Discord.MessageEmbed()
    .setDescription(`Hello ${message.author}, Look like you dont have Ban Member Permission. Try again later..`)

    if (!message.member.hasPermission("BAN_MEMBERS", "ADMINISTRATOR")) return message.channel.send(well);
    let user = message.mentions.users.first();

    let member = message.guild.member(user) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.join(" ") || x.user.username === args[0]);
    
    const DMs = new Discord.MessageEmbed()
    .setTimestamp()
    .setThumbnail(message.guild.iconURL())
    .setDescription(`You has been banned!\n\`\`\`Reason: ${reason1}\nBanned By: ${message.author.tag}\`\`\``)
    .setColor("RANDOM")
    .setFooter(message.guild.name, message.guild.iconURL())

    const example1 = new Discord.MessageEmbed()
    .setDescription(`Pls try again with a reason`)

    const example = new Discord.MessageEmbed()
    .setDescription(`Pls mention the user.`)

    const example2 = new Discord.MessageEmbed()
    .setDescription(`Well, Look like i was unable to ban the user.`)

    const example3 = new Discord.MessageEmbed()
    .setDescription(`You cant ban yourself!`)

    const example4 = new Discord.MessageEmbed()
    .setDescription(`You cant ban me!`)

    if (!user) return message.channel.send(example);
    if (user.id === message.author.id) return message.channel.send(example3);
    if (user.id === client.user.id) return message.channel.send(example4);
    if (!reason1) return message.channel.send(example1);

    member.ban({reason: reason1}).then(() => {
        const embed = new Discord.MessageEmbed()
        .setTimestamp()
        .setDescription(`Successfully Banned\n\`\`\`yml\nBanned: ${user.tag}\nReason: ${reason1}\nBanned By: ${message.author.tag}\`\`\``)
        .setColor("RANDOM")
        .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        
        message.channel.send(embed);
    }).catch(err => {
        message.channel.send(example2);
    })
}

exports.help = {
    name: "ban",
    description: "Ban the rules breaker!",
    usage: [`${config.prefix}ban <Mentioned member> [Reason]`],
    example: [`${config.prefix}ban @Greblue#6328 Stupid spammer..`]
}
  
  exports.conf = {
    aliases: [],
    cooldown: 1
}