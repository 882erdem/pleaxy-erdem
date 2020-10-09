module.exports = member => {
  const channel = member.guild.channels.find('name', 'giris-cıkıs');
  if (!channel) return;
  channel.send(`**📥 |** ${member} **Sunucuya giriş yaptı!**`);
};