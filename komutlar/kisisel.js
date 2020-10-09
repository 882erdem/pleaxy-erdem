const Discord = require("discord.js");
const moment = require("moment");
const colors = require("colors");
var green = process.env.NODE_DISABLE_COLORS ? '' : '\x1b[32m';

require("moment-duration-format");

exports.run = (client, msg) => {
  const duration = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
  msg.channel.sendCode("KULLANICI KOMUTLARI:",`
p!yetkilerim:  ^Sunucudaki Yetkilerine Bakarsın.^
p!roller:      ^Sunucudaki Rolleri Gösterir.^
p!davet:       ^Botun davet linkini gönderir.^
p!istatistik:  ^Botun istatistiklerini atar.^
p!kullanıcı:   ^Yazan kullanıcının hakkında bilgiler verir.^
p!ping:        ^Botun pingini gösterir.^
p!sunucubilgi: ^Sunucu hakkında bilgiler verir.^
p!yardım:      ^Yardım komutlarını gösterir.^
p!bugünhavanasıl:^Hava Durumunu Gösterir.^
p!trigger:      ^Trigger.^
p!kullanıcı:        ^Kullanıcının bilgilerini gösterir.^
p!urlkısalt:        ^verdiğiniz linkleri kısaltır.^
p!radyo:      ^adı yeterince açıklayıcı değilmi,^


* örn: d!davet

`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'kişisel',
  description: 'Tüm komutları listeler. İsterseniz bir komut hakkında yardım eder..',
  usage: 'kişisel'
};