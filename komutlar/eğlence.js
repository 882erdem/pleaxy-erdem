const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
var prefix = ayarlar.prefix;

exports.run = (client, message, params) => {
  const embedyardim = new Discord.RichEmbed()
  .setTitle("Eğlence komutları")
  .setDescription('')
  .setColor(0x00ffff)
      .setDescription('**•** p!yaz = Bota İstediğin Seyi Yazdırırsın.\n**•** p!askölçer = Aşkınızı Ölçer.\n**•** p!invert = Profil Resminizi Ters Rengine Çevirir. \n**•** p!jdi = Yes Do It.\n**•** p!mesajdöndür = Yazdığınız mesajı döndürür.\n**•** p!emojiyazı = Yazdığınız yazıyı emojili hale çevirip atar.\n**•** p!atatürk = Atatürk Resimleri Paylasır.\n**•** p!banned = Denede Gör.')
      .setFooter('Örnek kullanım: d!yaz <yazı>')

  if (!params[0]) {
    const commandNames = Array.from(client.commands.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    message.channel.send(embedyardim);
  } else {
    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.author.send('asciidoc', `= ${command.help.name} = \n${command.help.description}\nDoğru kullanım: ` + prefix + `${command.help.usage}`);
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['eğlence'],
  permLevel: 0
};

exports.help = {
  name: 'eğlence',
  description: 'Tüm komutları gösterir.',
  usage: 'eğlence [komut]'
};