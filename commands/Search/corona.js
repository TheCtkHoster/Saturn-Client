const config = require("../../config.json")
const Discord = require("discord.js")
const fetch = require("node-fetch");

exports.run = async (client, message, args) => {
    let arg = message.content.split(" ").slice(1);
    const arg1 = arg.join(" ");
      let prefix = config.prefix;
      let args1 = message.content.slice(prefix.length).trim().split(/ +/g);
  
      let countries = args;

      const well = new Discord.MessageEmbed()
      .setDescription(`Try again, Pls type a country name.`)
      if(!arg1) return message.channel.send(well)
      
      fetch(`https://corona.lmao.ninja/v2/countries/${countries}`)
      .then(res => res.json())
      .then(data => {
        let country = data.country;
        let flag = data.countryInfo.flag; // Turns out -> Link.
        let confirmed = data.cases.toLocaleString();
        let todayconfirmed = data.todayCases.toLocaleString();
        let deaths = data.deaths.toLocaleString();
        let todaydeaths = data.todayDeaths.toLocaleString();
        let recovered = data.recovered.toLocaleString();
        let critical = data.critical.toLocaleString();
        let active = data.active.toLocaleString();
        let todayrecovered = data.todayRecovered.toLocaleString();
        // Add .toLocaleString() if you wanna separate 3 numbers with commas.
        
        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setThumbnail(flag)
  //      .setThumbnail('https://cdn.pixabay.com/photo/2020/04/19/07/13/coronavirus-5062185_960_720.png')
        .setAuthor("Corona virus Statistics")
        .setDescription(`> Statistics for **${country}**`)
        .addField(`**Total Case**`, `\`\`\`yml\nConfirmed: ${confirmed}\nDeath: ${deaths}\nRecovered: ${recovered}\`\`\``, true)
        .addField(`**Today Case**`, `\`\`\`yml\nConfirmed: ${todayconfirmed}\nDeath: ${todaydeaths}\nRecovered: ${todayrecovered}\`\`\``, true)
        .addField(`**Other Case**`, `\`\`\`yml\nActive: ${active}\nCritical: ${critical}\`\`\``, true)
        .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        
        message.channel.send(embed);
        // Let's test it out!
      })
}

exports.help = {
    name: "corona",
    description: "See the corona statistics in spesific country!",
    usage: [`${config.prefix}corona <Country>`],
    example: [`${config.prefix}corona Canada`]
}
  
  exports.conf = {
    aliases: ["covid"],
    cooldown: 1
}