const { PermissionsBitField, EmbedBuilder } = require('discord.js');
const { green, red } = require("../../../settings/configs/emojis.json");
const cezapuan = require("../../../settings/schemas/cezapuan");
const ceza = require("../../../settings/schemas/ceza");
const penals = require("../../../settings/schemas/penals");
const ayar = require("../../../settings/configs/ayarName.json");

module.exports = {
  conf: {
    aliases: ["siciltemizle", "cezatemizle"],
    name: "siciltemizle",
    help: "siciltemizle <westina/ID>",
    category: "sahip",
  },

  run: async (client, message, args, embed) => {
    let kanallar = ayar.KomutKullanımKanalİsim;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) {
      return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000));
    }
    
    /* Bot sahibini veya özel yetkiliyi kontrol et
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !conf.botOwner.includes(message.author.id)) {
      return message.reply({ content: `${red} Yeterli yetkiniz yok!` }).then((e) => setTimeout(() => { e.delete(); }, 5000));
    }*/

    // Kullanıcıyı al
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    if (!member) {
      return message.reply({ content: `${red} Böyle bir kullanıcı bulunamadı!` }).then((e) => setTimeout(() => { e.delete(); }, 5000));
    }

    // Ceza ve ceza puanı verilerini al
    const cezaData = await ceza.findOne({ guildID: message.guild.id, userID: member.user.id });
    const cezapuanData = await cezapuan.findOne({ userID: member.user.id });

    if (!cezaData && !cezapuanData) {
      return message.reply({ content: `${green} ${member} kullanıcısının zaten cezalandırma kaydı bulunmuyor!` }).then((e) => setTimeout(() => { e.delete(); }, 5000));
    }

    // Ceza kayıtlarını ve ceza puanlarını sıfırlama işlemi
    await ceza.deleteMany({ guildID: message.guild.id, userID: member.user.id });
    await penals.deleteMany({ guildID: message.guild.id, userID: member.user.id });
    await cezapuan.deleteOne({ userID: member.user.id });

    // Kullanıcıya işlem başarıyla tamamlandığını bildir
    message.reply({ content: `${green} ${member} kullanıcısının tüm ceza kayıtları ve ceza puanı başarıyla sıfırlandı!` }).then((e) => setTimeout(() => { e.delete(); }, 5000));
  }
};
