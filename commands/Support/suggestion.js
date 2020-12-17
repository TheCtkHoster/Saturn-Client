const config = require("../../config.json")
const Discord = require("discord.js")

exports.run = async (client, message, args) => {
    const well = new Discord.MessageEmbed()
    .setDescription(`Pls type a suggestion..`)
    let arg = message.content.split(" ").slice(1);
    const arg1 = arg.join(" ");
    if(!arg1) return message.channel.send(well);

    user = config.owners;

    const embed = new Discord.MessageEmbed()
    .setTitle(`New Suggestion`)
    .setColor("RANDOM")
    .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
    .addField(`Suggestion:`, arg1)
    .setDescription(`Sender: <@${message.author.id}>\n\`Name: ${message.author.tag}\nUser ID: ${message.author.id}\nServer: ${message.guild.name}\nServer ID: ${message.guild.id}\``)

    message.channel.send('Successfuly send your suggestion!').then(msg = client.channels.cache.find(x => x.id === "763688268457836576").send(embed));

}

exports.help = {
    name: "suggestion",
    description: "Make a suggestion for Saturn Client.",
    usage: [`${config.prefix}suggestion <Message>`],
    example: [`${config.prefix}suggestion Make a command!`]
}
  
  exports.conf = {
    aliases: ["suggest"],
    cooldown: 1
}