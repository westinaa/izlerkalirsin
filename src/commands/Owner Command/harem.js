const { PermissionsBitField } = require("discord.js");
const ayar = require("../../../settings/configs/ayarName.json");

module.exports = {
  conf: {
    aliases: ["harem"],
    name: "harem",
    help: "harem <@etiket veya ID>",
    category: "kullanıcı",
  },

  run: async (client, message, args, embed, prefix) => {
    const allowedUsers = ["812204329535668234", "474006896408264712"];
    const roleId = "1353594262029074453";
    
    let kanallar = ayar.KomutKullanımKanalİsim;
    if (!allowedUsers.includes(message.author.id) && !kanallar.includes(message.channel.name)) {
      return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`})
        .then((e) => setTimeout(() => { e.delete(); }, 10000));
    }
    
    if (!message.guild) return;
    
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) {
      return message.reply("<a:amw:1353018181886677094> **Sultanım**, \nLütfen haremine ekleyeceğin kullanıcıyı etiketle...");
    }
    
    const role = message.guild.roles.cache.get(roleId);
    if (!role) {
      return message.reply("Belirtilen rol bulunamadı.");
    }
    
    if (member.roles.cache.has(roleId)) {
      await member.roles.remove(roleId);
      return message.reply(`<a:abowblue2:1353018169551360011> **Sultanım Çok Yaşa!** \n${member} haremden kovuldu!`);
    } else {
      await member.roles.add(roleId);
      return message.reply(`<a:abowblue2:1353018169551360011> **Sultanım Çok Yaşa!** \n${member} başarıyla hareme alındı!`);
    }
  },
};
