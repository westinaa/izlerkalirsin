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
      const özelURL = conf.serverURL; // Özel davet linki (sunucuayar.json içinde tanımlı olmalı)
      
      const özelDavet = invites.find(inv => inv.code === özelURL);
      if (!özelDavet) return message.reply("Özel davet bağlantısı bulunamadı!");
      
      const embed = new EmbedBuilder()
        .setTitle("Özel Sunucu Daveti")
        .setDescription(`🔗 **Davet Bağlantısı:** ${özelURL}\n👥 **Kullanım Sayısı:** ${özelDavet.uses}`)
        .setColor("Random")
        .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL() });
      
      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error("Davetleri çekerken hata oluştu:", error);
      message.reply("Bir hata oluştu, lütfen tekrar deneyin.");
    }
  },
};
