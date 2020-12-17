const conf = require("../config.json")

module.exports = client => {
  console.log(`${client.user.username} is now ready to be online.`)

//  function randomStatus() {
//    let status = [`Saturn Planet!`]
//    let rstatus = Math.floor(Math.random() * status.length);
      
 	  client.user.setActivity("Saturn Planet!", {type: "STREAMING", url: "https://www.twitch.tv/justgreblue" });    
//    client.user.setActivity(status[rstatus], {type: "WATCHING"});
//  }
//  setInterval(randomStatus, 30000);
}