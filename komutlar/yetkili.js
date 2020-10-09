const Discord = require("discord.js");
const moment = require("moment");
const colors = require("colors");
var green = process.env.NODE_DISABLE_COLORS ? '' : '\x1b[32m';

require("moment-duration-format");

exports.run = (client, msg) => {
  const duration = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
  msg.channel.sendCode("YETKİLİ KOMUTLARI:",`
p!ban:           ^Kullanıcıyı Yasaklarsınız.^
p!slowmode:      ^Yazma Sınırı Koyar.^
p!reboot:        ^Botu yeniden yapmanızı sağlar.^
p!kilit :        ^Kanalı Kilitler.^
p!otorol-ayarla:         ^Otorol ayrlarsınız.^
p!reklamtaraması:    ^Sunucudaki reklamları tarar.^
p!sil:         ^Belirli miktarda mesajı uzaya yollar.^
p!oylama:        ^Sunucuda oylama yaparsınız.^


* örn: d!ban <sebep>

`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'yetkili',
  description: 'Tüm komutları listeler. İsterseniz bir komut hakkında yardım eder..',
  usage: 'yetkili'
};