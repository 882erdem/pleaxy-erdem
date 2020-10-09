const Discord = require('discord.js');
const db = require('quick.db')

exports.run = (client,message,args) => {
/* Hata embed
message.channel.send(
    new Discord.RichEmbed() 
.setColor('RED')
.setTitle('Hata :x:')
.setDescription(''))
*/
/* başarılı embed
message.channel.send(
    new Discord.RichEmbed() 
.setColor('GREEN')
.setTitle('Başarılı :white_check_mark:')
.setDescription(''))
*/

/*
db.set(`${message.guild.id}`)
db.delete(`${message.guild.id}`)
*/
if(!message.member.hasPermissions("ADMINISTRATOR")) return message.channel.send(
    new Discord.RichEmbed() 
.setColor('RED')
.setTitle('Hata :x:')
.setDescription('Bu komutu kullana bilmek için `YÖNETİCİ` yetkisine sahip olmalısın!'))


let boş = args.slice(0).join(' ')
if(!boş) return message.channel.send(
    new Discord.RichEmbed() 
.setColor('RED')
.setTitle('Hata :x:')
.setDescription('Yanlış kullanım! \nKullanabileceklerin: `aç`,`kapat`,`rol`,`kanal`'))

if(args[0] == "aç") {
    if(!message.member.hasPermissions("ADMINISTRATOR")) return message.channel.send(
        new Discord.RichEmbed() 
    .setColor('RED')
    .setTitle('Hata :x:')
    .setDescription('Bu komutu kullana bilmek için `YÖNETİCİ` yetkisine sahip olmalısın!'))


   db.set(`otorol_${message.guild.id}`, "açık") 
   message.channel.send(
    new Discord.RichEmbed() 
.setColor('GREEN')
.setTitle('Başarılı :white_check_mark:')
.setDescription('Otorol başarıyla açıldı.'))
}

if(args[0] == "kapat") {
    if(!message.member.hasPermissions("ADMINISTRATOR")) return message.channel.send(
        new Discord.RichEmbed() 
    .setColor('RED')
    .setTitle('Hata :x:')
    .setDescription('Bu komutu kullana bilmek için `YÖNETİCİ` yetkisine sahip olmalısın!'))


   db.delete(`otorol_${message.guild.id}`) 
   message.channel.send(
    new Discord.RichEmbed() 
.setColor('GREEN')
.setTitle('Başarılı :white_check_mark:')
.setDescription('Otorol başarıyla kapatıldı.'))
}

if(args[0] == "rol") {
    if(!message.member.hasPermissions("ADMINISTRATOR")) return message.channel.send(
        new Discord.RichEmbed() 
    .setColor('RED')
    .setTitle('Hata :x:')
    .setDescription('Bu komutu kullana bilmek için `YÖNETİCİ` yetkisine sahip olmalısın!'))
 
let endlesscode = message.mentions.roles.first()
 if(!endlesscode) return message.channel.send(
    new Discord.RichEmbed() 
.setColor('RED')
.setTitle('Hata :x:')
.setDescription('Lütfen bir rol etiketle!'))



   db.set(`otorolrol_${message.guild.id}`, endlesscode.id) 
   message.channel.send(
    new Discord.RichEmbed() 
.setColor('GREEN')
.setTitle('Başarılı :white_check_mark:')
.setDescription(`Sunucuya girenlere ${endlesscode} rolünü vereceğim.`))
}


if(args[0] == "kanal") {
    if(!message.member.hasPermissions("ADMINISTRATOR")) return message.channel.send(
        new Discord.RichEmbed() 
    .setColor('RED')
    .setTitle('Hata :x:')
    .setDescription('Bu komutu kullana bilmek için `YÖNETİCİ` yetkisine sahip olmalısın!'))
 let EndlessCode = message.mentions.channels.first()
 if(!EndlessCode) return message.channel.send(
    new Discord.RichEmbed() 
.setColor('RED')
.setTitle('Hata :x:')
.setDescription('Lütfen bir kanal etiketle!'))



   db.set(`otorolkanal_${message.guild.id}`, EndlessCode.id) 
   message.channel.send(
    new Discord.RichEmbed() 
.setColor('GREEN')
.setTitle('Başarılı :white_check_mark:')
.setDescription(`Sunucuya girenlere rol verdiğimde ${EndlessCode} kanalına mesaj atacağım.`))
}
}
exports.conf = {
enabled: true,
guildOnly: false,
permLevel: 0,
aliases: []
}


exports.help = {
name: 'otorol-ayarla'
}