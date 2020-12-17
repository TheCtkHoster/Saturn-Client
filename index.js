const Discord = require("discord.js");
const config = require("./config.json")
const example = require("./handler/ClientBuilder.js");
const client = new example();
const alexa = require('alexa-bot-api');
let ai = new alexa("aw2plm");
const db = require('quick.db');

require("./handler/module.js")(client);
require("./handler/Event.js")(client);

client.package = require("./package.json");
client.on("warn", console.warn);
client.on("error", console.error);

client.once('ready', () => {
  console.log('Ready!');
});

client.on('message', async message => {
    if (message.author.bot) return;
    
          if(message.content.startsWith(`<@${client.user.id}>`) || message.content.startsWith(`<@!${client.user.id}>`)){
    const well = new Discord.MessageEmbed()
    .setDescription(`Hello there ${message.author}, my prefix is **${config.prefix}**\nYou can start by typing **${config.prefix}help**, it's will show you a list of **<@${client.user.id}>**'s commands`)
    return message.channel.send(well);
  }
    
    let afk = new db.table("AFKs"),
    authorStatus = await afk.fetch(message.author.id),
    mentioned = message.mentions.members.first();

    if (mentioned) {
      let status = await afk.fetch(mentioned.id);
  
      if (status) {
        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`\`\`\`yml\n${mentioned.user.tag} is AFK!\nReason: ${status}\`\`\``)
        .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        message.channel.send(embed).then(m => m.delete({ timeout: 15000 }));
      }
    }

    if (authorStatus) {
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`\`\`\`yml\n${message.author.tag} is no longer AFK.\nBecause he/she is chatting\`\`\``)
    .setTimestamp()
    .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    message.channel.send(embed);
    afk.delete(message.author.id).then(m => m.delete({ timeout: 15000 }));
    }
    
    if (message.channel.id === "782860023135076362") {

      let content = message.content;
  
      ai.getReply(content).then(r => message.channel.send(`${message.author}, ${r}`)); 
      } else {
          return;
      }
});

client.on('guildMemberAdd', async (member, message) => {
  const channel = member.guild.channels.cache.get('761168220034957330')
  const joinMessage = `Dear ${member}, welcome to **${member.guild.name}**!\nwe are happy to see you here. We hope you enjoy this server! :partying_face:\n\nPls read the rules at <#767311101011689482>\nand take some roles at <#768090474807558186>`
  if (channel === null) {
    return;
  }
  const embed = new Discord.MessageEmbed()
  .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
  .setDescription(joinMessage)
  .setColor("RANDOM")
  .setTimestamp()

  channel.send(member, embed)

    if (!channel) return;
});

client.on("guildMemberRemove", (member, message) => {
  const channel = member.guild.channels.cache.get('767315035600191518')
  const leaveMessage = `Goodbye ${member}, hope you remember with **${member.guild.name}** :cry: :wave:`
  if (channel === null) {
    return;
  }
  const embed = new Discord.MessageEmbed()
  .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
  .setDescription(leaveMessage)
  .setColor("RANDOM")
  .setTimestamp()

  channel.send(embed)

    if (!channel) return;
});

client.login(config.saturn).catch(console.error);
