const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = (bot, message, params) => {
   const embed = new Discord.RichEmbed()
   .setColor("RANDOM")
   .setAuthor(message.guild.name, message.guild.userURL)
   .setThumbnail(message.guild.userURL)
   .addField('Varsayılan rol:', message.guild.defaultRole, true)
   .addField('Roller:', message.guild.roles.map(role => role.name).join(', '), true)
   .setFooter('Rol Listesi', message.guild.userURL)
   .setTimestamp()
   message.channel.send({embed});
   message.react('✅')
 };

 exports.conf = {
   enabled: true,
   guildOnly: false,
   aliases: [],
   permLevel: 0
 };

 exports.help = {
   name: 'roller',
   description: 'Roller.',
   usage: 'roller'
 };