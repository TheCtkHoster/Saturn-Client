const config = require("../../config.json")
const Discord = require("discord.js")
const dateformat = require('dateformat');

exports.run = async (client, message, args) => {
    let icon = message.guild.iconURL({size: 2048}); // Server Avatar
    
    let region = {
      "brazil": "Brazil",
      "eu-central": "Central Europe",
      "singapore": "Singapore",
      "london": "London",
      "russia": "Russia",
      "japan": "Japan",
      "hongkong": "Hongkong",
      "sydney": "Sydney",
      "us-central": "U.S. Central",
      "us-east": "U.S East",
      "us-south": "U.S South",
      "us-west": "U.S West",
      "eu-west": "Western Europe"
    }
    
    // Members
    let member = message.guild.members;
    let offline = member.cache.filter(m => m.user.presence.status === "offline").size,
        online = member.cache.filter(m => m.user.presence.status === "online").size,
        idle = member.cache.filter(m => m.user.presence.status === "idle").size,
        dnd = member.cache.filter(m => m.user.presence.status === "dnd").size,
        robot = member.cache.filter(m => m.user.client).size,
        total = message.guild.memberCount;
    
    // Channels
    let channels = message.guild.channels;
    let text = channels.cache.filter(r => r.type === "text").size,
        vc = channels.cache.filter(r => r.type === "voice").size,
        category = channels.cache.filter(r => r.type === "category").size,
        totalchan = channels.cache.size;
    
    // Region
    let location = region[message.guild.region];
    
    // Date
    let x = Date.now() - message.guild.createdAt;
    let h = Math.floor(x / 86400000) // 86400000, 5 digits-zero.
    let created = dateformat(message.guild.createdAt); // Install "dateformat" first.
   
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTimestamp(new Date())
    .setAuthor(message.guild.name, icon)
    .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    .setThumbnail(icon)
    .addField("Server owner", `${message.guild.owner.user.tag} <:Owner:742557045898739882>\n(${message.guild.owner.user.id})`, true)
    .addField("Server region", location, true)
    .addField("Server ID", message.guild.id, true)
    .addField("Server created when", `${created} \n> ${h} Days Ago`, true)
    .addField(`Server members (Total: [${total}])`, `<:dnd:742557115876638762> | Do Not Disturb: ${dnd} \n<:idle:742557093432655905> | Idle: ${idle} \n<:online:742557148730359819> | Online: ${online} \n<:offline:742557131026464768> | Offline: ${offline} \n<:Bot_Sign:742557008628154480> | Bots: ${robot}`, true)
    .addField(`Server channels (Total: [${totalchan}])`, `<:category:745264504157503498> | Category: ${category} \n<:channel:745264480946225252> | Text: ${text} \n<:voice:745264517017108540> | Voice: ${vc}`, true)
    message.channel.send(embed); // Let's see if it's working!
}

exports.help = {
    name: "server-info",
    description: "Let you know the information of this server.",
    usage: [`${config.prefix}server-info`],
    example: [`${config.prefix}server-info`]
}
  
  exports.conf = {
    aliases: ["s-i"],
    cooldown: 1
}