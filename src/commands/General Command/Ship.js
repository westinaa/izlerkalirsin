const { PermissionFlagsBits, ButtonStyle, ButtonBuilder, ActionRowBuilder, Events, EmbedBuilder } = require("discord.js");
const conf = require("../../../settings/configs/sunucuayar.json");
const { kalp } = require("../../../settings/configs/emojis.json")
const client = global.bot;
const ayar = require("../../../settings/configs/ayarName.json");
const canvafy = require('canvafy');

module.exports = {
  conf: {
    aliases: ["ship","sh", "ships"],
    name: "ship",
    help: "ship <@westina / ID / random>",
    category: "kullanıcı",
  },

  run: async (client, message, args) => {
    // Sunucudaki #ship kanalını buluyoruz
    const shipChannel = message.guild.channels.cache.find(ch => ch.name === 'ship' && ch.type === 'GUILD_TEXT');
  
    // Komutun sadece #ship kanalında çalışmasını sağlıyoruz
    if (message.channel.name !== 'ship') {
      return message.reply({ 
        content: `> **Bu komutu yalnızca \` #ship \` kanalında kullanabilirsiniz.**` 
      });
    }

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.random();
    if (!user) {
      return message.channel.send({ 
        embeds: [new EmbedBuilder().setDescription('> **Geçerli Bir User Belirt!**')] 
      }).then(msg => {
        setTimeout(() => msg.delete(), 5000);
      });
    }

    const ship = await new canvafy.Ship()
      .setAvatars(message.author.displayAvatarURL({ dynamic: true, extension: "png" }), user.user.displayAvatarURL({ dynamic: true, extension: "png" }))
      .setBackground("image", `${message.guild.bannerURL({ extension: "png", size: 2048 }) !== null ? message.guild.bannerURL({ extension: "png", size: 2048 }) : "https://i.imgur.com/sCL0QTh.png"}`)
      .setBorder("#f0f0f0")
      .setOverlayOpacity(0.5)
      .build();

    message.reply({
      content: `> **${message.author.tag} ${kalp} ${user.user.tag}**`,
      files: [{
        attachment: ship,
        name: `ship-${message.member.id}.png`
      }]
    });
  }
};
