const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');

exports.run = (client, message) => {
var request = require('request');
request('https://thaypon-api.glitch.me/api/8ball', function (error, response, body) {
    if (error) return console.log('Hata:', error);
    else if (!error) { 
        var info = JSON.parse(body);
       const embed = new Discord.RichEmbed()
        .setImage(`${info.link}`)
        .setColor(0x36393F)
        .setFooter(`Pleaxy | © 2020 `,client.user.avatarURL)    
      return message.channel.sendEmbed(embed)

    }
}) 
    };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [''],
  permLevel: 0
};

exports.help = {
  name: '8ball',
  description: '',
  usage: ''
};