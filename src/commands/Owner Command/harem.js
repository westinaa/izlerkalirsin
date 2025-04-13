const { PermissionsBitField } = require("discord.js");
const ayar = require("../../../settings/configs/ayarName.json");

module.exports = {
  conf: {
    aliases: ["harem"],
    name: "harem",
    help: "harem <@etiket veya ID>",
    category: "sahip",
    owner: "true",
  },

  run: async (client, message, args, embed, prefix) => {
    const allowedUsers = ["812204329535668234", "474006896408264712"];
    const roleId = "1357152571776827573";

    if (!allowedUsers.includes(message.author.id)) {
      return message.reply("Harem kontrolü yalnızca sultanıma aittir!")
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