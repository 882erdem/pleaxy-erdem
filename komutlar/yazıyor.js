module.exports.run = async (bot, message, args) => {
const { RichEmbed } = require('discord.js')
if (message.author.id != '753579401710665770') return message.channel("Şuan Yazıyorum Geldi Mi?")
let embed = new RichEmbed()
  .setDescription("Selam botu davet etmek istiyor isen [buraya](https://discord.com/oauth2/authorize?client_id=755384597134704651&permissions=8&scope=bot) tıkla eğer destek sunucusuna da gelmek istiyor isen [buraya](https://discord.gg/n823uWn) tıkla lütfen.")
  .setFooter(bot.user.username, bot.user.avatarURL)
  .setColor(0x1D82B6)
message.channel.send(embed)
      message.channel.startTyping();
  
}
exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: ["pleaxy"],
  permLevel: 0 
};

exports.help = {
  name: 'Pleaxy', 
  description: 'Yazıyor Yazıyor...',
  usage: 'yazıyor'
};
