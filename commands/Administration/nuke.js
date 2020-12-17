const config = require("../../config.json")
const Discord = require("discord.js")

exports.run = async (client, message, args) => {
  const well = new Discord.MessageEmbed()
  .setDescription(`Hello ${message.author}, Look like you dont have Manage_CHannels Permission. Try again later..`)

    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(well);

    let channel = client.channels.cache.get(message.channel.id)
    var posisi = channel.position;
 
    channel.clone().then((channel2) => {
      channel2.setPosition(posisi)
      channel.delete()
      channel2.send(`**Channel Has Been Nuked**`).then(m => {m.delete({timeout: 60000})}); 
      channel2.send('https://tenor.com/view/explosion-mushroom-cloud-atomic-bomb-bomb-boom-gif-4464831').then(m => {m.delete({timeout: 60000})});
 
    })
}

exports.help = {
    name: "nuke",
    description: "Nuke some useless channel :D",
    usage: [`${config.prefix}nuke`],
    example: [`${config.prefix}nuke`]
}
  
  exports.conf = {
    aliases: ["reset"],
    cooldown: 1
}