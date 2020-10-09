const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const Jimp = require('jimp');
const moment = require('moment');
require('./util/eventLoader')(client);
const db = require('quick.db');

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};



client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});


client.login(ayarlar.token);


client.on('message', async msg => {
  if (msg.content.toLowerCase() === 'sa') {
    await msg.react('🇦');
    msg.react('🇸');
    msg.reply('Aleyküm selam Dostum')
  }
  });


// ===> SAYAÇ <===
// SAYAÇ DOLDUMU KANALA TEBRİK MESAJI GÖNDERİYOR .setDescription DAN DÜZENLEYEBİLİRSİN!
client.on("message", async message => {
  let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  if(message.channel.type !== "dm") {
  if(sayac[message.guild.id]) {
      if(sayac[message.guild.id].sayi <= message.guild.members.size) {
          const embed = new Discord.RichEmbed()
              .setDescription(`Tebrikler ${message.guild.name}! Başarıyla ${sayac[message.guild.id].sayi} kullanıcıya ulaştık! Sayaç sıfırlandı!`)
              .setColor('RANDOM')
              .setTimestamp()
          message.channel.send({embed})
          delete sayac[message.guild.id].sayi;
          delete sayac[message.guild.id];
          fs.writeFile("./ayarlar/sayac.json", JSON.stringify(sayac), (err) => {
              console.log(err)
          })
      }
  }
  }
});

// CHANNEL.SEND KOMUTUNDAKİ MESAJI DÜZENLEYEBİLİRSİN SAYAÇ OYUNCU KATILMA MESAJIDIR!

client.on("guildMemberAdd", async member => {
	let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
	if (!sayac[member.guild.id]) return;
	let sysc = sayac[member.guild.id].sayi;
	if (!sysc) return;
	let channel = member.guild.channels.find(c => c.name === "sayaç") // SAYAÇ KANALINA MESAJI GÖNDERSİN!
	if (!channel) return;
	channel.send(`:inbox_tray: **| ${member.user.tag}** Katıldı ${sysc} olmamıza son ${sysc - member.guild.members.size} Kişi Kaldı! :tada:`)
})

// CHANNEL.SEND KOMUTUNDAKİ MESAJI DÜZENLEYEBİLİRSİN SAYAÇ OYUNCU AYRILMA MESAJIDIR!

client.on("guildMemberRemove", async member => {
	let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
	if (!sayac[member.guild.id]) return;
	let sysc = sayac[member.guild.id].sayi;
	if (!sysc) return;
	let channel = member.guild.channels.find(c => c.name === "sayaç")// SAYAÇ KANALINA MESAJI GÖNDERSİN!
	if (!channel) return;
	channel.send(`:outbox_tray: **| ${member.user.tag}** Ayrıldı ${sysc} olmamıza son ${sysc - member.guild.members.size} Kişi Kaldı! :tada:`)
});



const GIFEncoder = require('gifencoder'); 

client.on("message", async message => {
  var user = message.mentions.users.first() || message.author;
    if (message.content.toLowerCase() === prefix + "trigger") {
        const options = {
            size: 256,
          
            frames: 16
        }

        message.channel.send("İşleniyor.. Lütfen bekleyiniz. ⏲").then(m => m.delete(1000));

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        const args = message.content.split(' ').slice(1);
        let member = message.mentions.users.first()
        if (args[0] === undefined) member = message.author;
        let avatarurl = member.avatarURL;
        if (['jpg', 'jpeg', 'gif', 'png', 'webp'].some(x => args.join(' ').includes(x))) {
            avatarurl = args.join(' ').replace(/gif|webp/g, 'png');
        }
        const base = new Jimp(options.size, options.size);
        const avatar = await Jimp.read(avatarurl);
        const text = await Jimp.read('https://cdn.glitch.com/0d67db36-47cc-40d0-a627-e75808dffff1%2Ftriggered.png?1535859226904');
        const tint = await Jimp.read('https://cdn.glitch.com/0d67db36-47cc-40d0-a627-e75808dffff1%2Fred.png?1535859218092');
        avatar.resize(320, 320);
        tint.scaleToFit(base.bitmap.width, base.bitmap.height);
        tint.opacity(0.2);
        text.scaleToFit(280, 60);
        const frames = [];
        const buffers = [];
        const encoder = new GIFEncoder(options.size, options.size);
        const stream = encoder.createReadStream();
        let temp;
         stream.on('data', async buffer => await buffers.push(buffer));
        stream.on('end', async () => {
            return await message.channel.send({
                files: [{
                    name: 'thaypontriggerd.gif',
                    attachment: Buffer.concat(buffers)
                }]
            });
        });
        for (let i = 0; i < options.frames; i++) {
            temp = base.clone();
            if (i === 0) {
                temp.composite(avatar, -16, -16);
            } else {
                temp.composite(avatar, -32 + getRandomInt(-16, 16), -32 + getRandomInt(-16, 16));
            }
            temp.composite(tint, 0, 0);
            if (i === 0) temp.composite(text, -10, 200);
            else temp.composite(text, -12 + getRandomInt(-8, 8), 200 + getRandomInt(-0, 12));
            frames.push(temp.bitmap.data);
        }
        encoder.start();
        encoder.setRepeat(0);
        encoder.setDelay(20);
        for (const frame of frames) {
            encoder.addFrame(frame);
        }
        encoder.finish();
    }
});


client.on("guildMemberAdd", async member => {
         let anan = member.user.avatarURL || member.user.defaultAvatarURL
    let memberChannel = await db.fetch(`memberChannel_${member.guild.id}`)
    if (!member.guild.channels.get(memberChannel)) return console.log('memberChannel')
        let username = member.user.username;
        if (member.guild.channels.get(memberChannel) === undefined || member.guild.channels.get(memberChannel) === null) return;
        if (member.guild.channels.get(memberChannel).type === "text") {
            const bg = await Jimp.read("https://cdn.discordapp.com/attachments/450693709076365323/473184528148725780/guildAdd.png");
            const userimg = await Jimp.read(anan);
            var font;
            if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
            else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
            else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
            await bg.print(font, 430, 170, member.user.tag);
            await userimg.resize(362, 362);
            await bg.composite(userimg, 43, 26).write("./img/"+ member.id + ".png");
              setTimeout(function () {
                    member.guild.channels.get(memberChannel).send(new Discord.Attachment("./img/" + member.id + ".png"));
              }, 1000);
              setTimeout(function () {
                fs.unlink("./img/" + member.id + ".png");
              }, 10000);
        }
    })

client.on("guildMemberRemove", async member => {
         let anan = member.user.avatarURL || member.user.defaultAvatarURL
    let memberChannel = await db.fetch(`memberChannel_${member.guild.id}`)
    if (!member.guild.channels.get(memberChannel)) return console.log('memberChannel')
        let username = member.user.username;
        if (member.guild.channels.get(memberChannel) === undefined || member.guild.channels.get(memberChannel) === null) return;
        if (member.guild.channels.get(memberChannel).type === "text") {
            const bg = await Jimp.read("https://cdn.discordapp.com/attachments/450693709076365323/473184546477572107/guildRemove.png");
            const userimg = await Jimp.read(anan);
            var font;
            if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
            else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
            else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
            await bg.print(font, 430, 170, member.user.tag);
            await userimg.resize(362, 362);
            await bg.composite(userimg, 43, 26).write("./img/"+ member.id + ".png");
              setTimeout(function () {
                    member.guild.channels.get(memberChannel).send(new Discord.Attachment("./img/"+ member.id + ".png"));
              }, 1000);
              setTimeout(function () {
                fs.unlink("./img/" + member.id + ".png");
              }, 10000);
        }
    })



///
client.on("guildMemberAdd", endlesscode => {
let otorol = db.get(`otorol_${endlesscode.guild.id}`)
if(otorol ==  "açık") {
 let otorolRol = db.get(`otorolrol_${endlesscode.guild.id}`)
let otorolkanal = db.get(`otorolkanal_${endlesscode.guild.id}`)

client.channels.get(otorolkanal).send(
    new Discord.RichEmbed()
    .setColor('GREEN')
    .setTitle('Otorol')
    .setDescription(`${endlesscode} Aramıza katıldı, rolü verildi.`)
)
endlesscode.addRole(otorolRol)
}

})
//
client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;


if (message.content.toLowerCase().startsWith(prefix + `destek-aç`)) {
    const reason = message.content.split(" ").slice(1).join(" ");
    if (!message.guild.roles.exists("name", "👔 | Pleaxy")) return message.channel.send(`Sunucu  \`👔 | Pleaxy\` rolüne sahip değil, bu yüzden yardım talebiniz oluşturulamıyor.`);
    if (message.guild.channels.exists("name", "destek-" + message.author.id)) return message.channel.send(`Bir yardım talebine zaten sahipsin.`);
  if (!message.guild.channels.filter(c => c.type === 'category').find(c => c.name === 'Destek')) {
    let knl = message.guild.createChannel('Destek', 'category').then(ds => {
        message.guild.createChannel(`destek-${message.author.id}`, "text").then(c => {
          let role = message.guild.roles.find("name", "👔 | Pleaxy");
          let role2 = message.guild.roles.find("name", "@everyone");
          c.overwritePermissions(role, {
              SEND_MESSAGES: true,
              READ_MESSAGES: true
          });
          c.overwritePermissions(role2, {
              SEND_MESSAGES: false,
              READ_MESSAGES: false
          });
          c.overwritePermissions(message.author, {
              SEND_MESSAGES: true,
              READ_MESSAGES: true
          });
          message.channel.send(`:white_check_mark: Yardım talebiniz oluşturuldu, #${c.name}.`);
          const embed = new Discord.RichEmbed()
          .setColor(0xCF40FA)
          .addField(`Hey ${message.author.username}!`, `Yardım talebini neden açtığınızı açıkca anlatın. Destek ekibi en kısa zamanda cevap verecektir`)
          .setTimestamp();
          c.send({ embed: embed });
        c.setParent(ds)
      }).catch(console.error);
    })
    }
  let kanal = message.guild.channels.filter(c => c.type === 'category').find(c => c.name === 'Destek');
  if (kanal) {
    message.guild.createChannel(`destek-${message.author.id}`, "text").then(c => {
        let role = message.guild.roles.find("name", "👔 | Pleaxy");
        let role2 = message.guild.roles.find("name", "@everyone");
        c.overwritePermissions(role, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.overwritePermissions(role2, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
        });
        c.overwritePermissions(message.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
      
        message.channel.send(`:white_check_mark: Yardım talebiniz oluşturuldu, #${c.name}.`);
        const embed = new Discord.RichEmbed()
        .setColor(0xCF40FA)
        .addField(`Hey ${message.author.username}!`, `Yardım talebini neden açtığınızı açıkca anlatın. Destek ekibi en kısa zamanda cevap verecektir`)
        .setTimestamp();
        c.send({ embed: embed });
      c.setParent(kanal)
    }).catch(console.error);
  }
    }

if (message.content.toLowerCase().startsWith(prefix + `destek-kapat`)) {
    if (!message.channel.name.startsWith(`destek-`)) return message.channel.send(`Yardım talebinizi yardım talebi kanalınızın dışındaki kanallarda kapatamazsınız.`);

    message.channel.send(`Emin misin? Onayladıktan sonra geri alınamaz!\nOnaylamak için,\`p!onayla\`. Yazmak için 10 saniyen var yoksa kendiliğinden iptal olur.`)
    .then((m) => {
      message.channel.awaitMessages(response => response.content === 'p!onayla', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then((collected) => {
          message.channel.delete();
        })
        .catch(() => {
          m.edit('Kapatma talebinin zamanı geçti yardım talebin kapatılmadı.').then(m2 => {
              m2.delete();
          }, 3000);
        });
    });
}

});
//-----------------------------------------------------
const Constants = require('discord.js/src/util/Constants.js')
Constants.DefaultOptions.ws.properties.$browser = 'Discord iOS'
//main'e atın (bot.js - server.js - 
