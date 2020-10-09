const Discord = require('discord.js');
const moment = require('moment');
const { version } = require("discord.js");
const os = require('os');
let cpuStat = require("cpu-stat");
const { stripIndents } = require('common-tags');
require('moment-duration-format');

var ayarlar = require('../ayarlar.json');

exports.run = (bot, message, args) => {
    let cpuLol;
    cpuStat.usagePercent(function(err, percent, seconds) {
        if (err) {
            return console.log(err);
        }
        const duration = moment.duration(bot.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
        const embedStats = new Discord.RichEmbed()
            .setAuthor(bot.user.username + " | İstatistikler", bot.user.avatarURL)
            .setColor(0x36393F)
            .addField("<a:B_Ileri:763439354190233640> ❯ Bellek Kullanımı", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`)
            .addField("<a:B_Ileri:763439354190233640> ❯ Çalışma Süresi ", `${duration}`)
            .addField("<a:B_Ileri:763439354190233640> ❯ Bot İstatistikleri", stripIndents`
            »Kullanıcı: ${bot.users.size.toLocaleString()}
            » Sunucu: ${bot.guilds.size.toLocaleString()}
            » Kanal: ${bot.channels.size.toLocaleString()}
            » Müzik Çalınan Sunucu Sayısı: ${bot.voiceConnections.size ? bot.voiceConnections.size : '0'}
            » Ping: ${Math.round(bot.ping)}ms.
            `)
            .addField("<a:B_Ileri:763439354190233640>❯ Versiyonlar", stripIndents`
            » Discord.js: v${version}
            » Node.js: ${process.version}
            `)
            .addField("<a:Grey:763483751526957097>❯ CPU", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
            .addField("<a:Grey:763483751526957097>❯ CPU Kullanımı", `\`${percent.toFixed(2)}%\``)
            .addField("<a:greencircle:763483802852392981>❯ Bit", `\`${os.arch()}\``, true)
            .addField(":computer:❯ İşletim Sistemi", `\`\`${os.platform()}\`\``)
            .addField("<a:9123_red_circle:763483707499610183>❯ Sunucu lokasyonu","Türkiye,İzmir")
        message.channel.send(embedStats)
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['i'],
    permLevel: `Yetki gerekmiyor. (${0})`
  };
  
  exports.help = {
    name: 'istatistik',
    category: "bot",
    description: 'Botun istatistiklerini gösterir.',
    usage: '.istatistik'
  };