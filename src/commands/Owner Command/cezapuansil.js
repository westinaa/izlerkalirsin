const { PermissionsBitField, EmbedBuilder } = require("discord.js");
const cezapuan = require("../../../settings/schemas/cezapuan");
const moment = require("moment");
moment.locale("tr");
const { red, green } = require("../../../settings/configs/emojis.json");
const allah = require("../../../config.js");

module.exports = {
  conf: {
    aliases: ["cezapuansil", "cpsil"],
    name: "cezapuansil",
    help: "cezapuansil <üye/ID> <miktar>",
    category: "sahip",
  },

  run: async (client, message, args) => {

     // Üye kontrolü
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) {
      return message.reply({ content: `${red} Geçerli bir üye belirtmelisin!` }).then(e => setTimeout(() => e.delete(), 5000));
    }

    // Miktar kontrolü
    const miktar = parseInt(args[1]);
    if (isNaN(miktar) || miktar <= 0) {
      return message.reply({ content: `${red} Geçerli bir miktar belirtmelisin!` }).then(e => setTimeout(() => e.delete(), 5000));
    }

    // Ceza puanı veritabanı kontrolü
    const cezapuanData = await cezapuan.findOne({ userID: member.user.id });
    if (!cezapuanData || cezapuanData.cezapuan < miktar) {
      return message.reply({ content: `${red} Bu kullanıcıda bu kadar ceza puanı bulunmamaktadır!` }).then(e => setTimeout(() => e.delete(), 5000));
    }

    // Ceza puanını silme işlemi
    cezapuanData.cezapuan -= miktar;
    if (cezapuanData.cezapuan < 0) cezapuanData.cezapuan = 0; // Ceza puanı sıfırın altına inmemeli

    await cezapuanData.save();

    message.react(green);
    message.reply({
      embeds: [
        new EmbedBuilder()
          .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
          .setDescription(`${green} ${member} üyesinin **${miktar}** ceza puanı başarıyla silindi. Kalan ceza puanı: \`${cezapuanData.cezapuan}\``)
      ]
    }).then(e => setTimeout(() => e.delete(), 5000));

    // Log kaydı (Opsiyonel)
    const logChannel = message.guild.channels.cache.get(allah.logChannel); // Log kanalının ID'sini burada kullanabilirsiniz
    if (logChannel) {
      const logEmbed = new EmbedBuilder()
        .setTitle("Ceza Puanı Silindi")
        .setDescription(`**${message.author.tag}** tarafından **${member.user.tag}** üyesinin **${miktar}** ceza puanı silindi.`)
        .addFields(
          { name: "Yeni Ceza Puanı", value: `${cezapuanData.cezapuan}`, inline: true },
          { name: "Silinen Puan", value: `${miktar}`, inline: true }
        )
        .setFooter({ text: `Tarih: ${moment().format("LLL")}` });

      logChannel.send({ embeds: [logEmbed] });
    }
  },
};
