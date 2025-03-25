const { EmbedBuilder } = require("discord.js");
const conf = require("../../../settings/configs/sunucuayar.json");

module.exports = {
  conf: {
    aliases: ["url"],
    name: "url",
    help: "url",
    category: "sahip",
    owner: true,
  },

  run: async (client, message, args) => {
    try {
      const invites = await message.guild.invites.fetch();
      let özelURL = conf.serverUrl; // Özel davet linki (sunucuayar.json içinde tanımlı olmalı)
      
      // Eğer özelURL tam link olarak tanımlıysa, sadece kod kısmını al
      if (özelURL.startsWith("https://discord.gg/")) {
        özelURL = özelURL.split("/").pop();
      }
      
      const özelDavet = invites.find(inv => inv.code === özelURL);
      if (!özelDavet) return message.reply("Özel davet bağlantısı bulunamadı!");
      
      message.channel.send(`${özelURL}\n**Kullanım Sayısı:** \`${özelDavet.uses}\``);
    } catch (error) {
      console.error("Davetleri çekerken hata oluştu:", error);
      message.reply("Bir hata oluştu, lütfen tekrar deneyin.");
    }
  },
};
