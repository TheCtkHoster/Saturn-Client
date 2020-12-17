const config = require("../../config.json")
const Discord = require("discord.js")
const db = require("quick.db");
exports.run = async (client, message) => {
    if (message.deletable) {
        message.delete({ timeout: 10000 });
    }
    
        const prefix = config.prefix;
        let args = message.content.slice(prefix.length).trim().split(/ +/g);
    
        const status = new db.table("AFKs");
        let afk = await status.fetch(message.author.id);
        const embed = new Discord.MessageEmbed().setColor("RANDOM")
        
        if (!afk) {
          embed.setDescription(`\`\`\`yml\n${message.author.tag} is now AFK.\nReason: ${args.join(" ") || "AFK!"}\`\`\``)
          embed.setTimestamp()
          embed.setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    
          status.set(message.author.id, args.join(" ") || `AFK`);
        } else {
          embed.setDescription("You are no longer AFK.");
          status.delete(message.author.id);
        }
        
        message.channel.send(embed).then(m => m.delete({ timeout: 15000 }));
}

exports.help = {
    name: "afk",
    description: "Set your afk status globaly!",
    usage: [`${config.prefix}afk <Reason>`],
    example: [`${config.prefix}afk Im busy!`]
}
  
  exports.conf = {
    aliases: [""],
    cooldown: 1
}