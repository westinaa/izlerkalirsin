const { EmbedBuilder } = require("discord.js");
const conf = require("../../../settings/configs/sunucuayar.json");

module.exports = {
  conf: {
    aliases: ["url"],
    name: "url",
    help: "url",
    category: "sahip",
  },

  run: async (client, message, args) => {
    try {
      let özelURL = conf.serverUrl; // Özel davet linki (sunucuayar.json içinde tanımlı olmalı)
      
      // Eğer özelURL tam link olarak tanımlıysa, sadece kod kısmını al
      if (özelURL.startsWith("https://discord.gg/")) {
        özelURL = özelURL.split("/").pop();
      }
      
      // Daveti doğrudan API'den çekmeyi deniyoruz
      const özelDavet = await client.fetchInvite(özelURL).catch(() => null);
      if (!özelDavet) return message.reply("Özel davet bağlantısı bulunamadı veya geçersiz!");
      
      message.channel.send(`discord.gg/${özelURL}\n\`Kullanım:\` **${özelDavet.uses || 0}**`);
    } catch (error) {
      console.error("Davetleri çekerken hata oluştu:", error);
      message.reply("Bir hata oluştu, lütfen tekrar deneyin.");
    }
  },
};