const axios = require("axios");
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
      const guildID = "1357115287044100216"; // sunucuayar.json dosyasında tanımlı olmalı
      if (!guildID) return message.reply("Sunucu ID bilgisi bulunamadı!");

      const response = await axios.get(`https://discord.com/api/v10/guilds/${guildID}/vanity-url`, {
        headers: {
          Authorization: `Bot ${client.token}`
        }
      }).catch(() => null);

      if (!response || !response.data) {
        return message.reply("Vanity URL bilgisi alınamadı! Botun yeterli yetkisi olmayabilir.");
      }

      const { code, uses } = response.data;

      message.channel.send(`discord.gg/${code}\n\`Kullanım:\` **${uses}**`);

    } catch (error) {
      console.error("Vanity URL alınırken hata oluştu:", error);
      message.reply("Bir hata oluştu, lütfen tekrar deneyin.");
    }
  },
};
