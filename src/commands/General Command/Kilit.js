const { PermissionsBitField, ButtonStyle, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const { red, green, locked, unlocked } = require("../../../settings/configs/emojis.json")
let conf = require("../../../settings/configs/sunucuayar.json"); 

module.exports = {
  conf: {
    aliases: ["kilit","lock"],
    name: "kilit",
    help: "kilit",
    category: "yönetim",
  },

  run: async (client, message, args) => {  
    if(!conf.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) 
    { 
    message.reply({ content:`Kanal kilitlemek için yeterli yetkiye sahip değilsin.`}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }

    let ac = new ButtonBuilder()
    .setCustomId("ac")
    .setStyle(ButtonStyle.Secondary)
    .setEmoji(`${unlocked}`);

    let kapa = new ButtonBuilder()
    .setCustomId("kapa")
    .setStyle(ButtonStyle.Secondary)
    .setEmoji(`${locked}`);

    
    if (message.channel.permissionsFor(message.guild.id).has(PermissionsBitField.Flags.SendMessages) === (true || null)) {
      ac.setStyle(ButtonStyle.Success).setDisabled(true);
    } else {
      ac.setStyle(ButtonStyle.Success);
    }

    if (message.channel.permissionsFor(message.guild.id).has(PermissionsBitField.Flags.SendMessages) === false) {
      kapa.setStyle(ButtonStyle.Danger).setDisabled(true);
    } else {
      kapa.setStyle(ButtonStyle.Danger);
    }

    const row = new ActionRowBuilder()
    .addComponents([ ac, kapa ]);
  
  
    let westina = new EmbedBuilder()
    .setColor("#ffffff")
    .setDescription(`${message.author} Kanal Kilidini Aktifleştirmek ve Deaktifleştirmek için butonları kullanınız. Gereksiz kullanımda westina ile görüşmeniz sorun yaratabilir.`)
    .setFooter({ text: `Kapalı olan buton şuanki kanalın kilit durumunu gösterir tekrar kullanılamaz.`})
    .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));

  let msg = await message.channel.send({ embeds: [westina], components: [row] })

  var filter = button => button.user.id === message.author.id;

  let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })

  collector.on("collect", async (button) => {

    if (button.customId === "ac") {
      await button.deferUpdate();
      let everyone = message.guild.roles.cache.find(r => r.name === "@everyone");
      message.channel.permissionOverwrites.edit(everyone.id, {
        SendMessages: null
      }).then(async() => {
          message.react(`${unlocked}`)
          await msg.edit({ content: `Kanalın kilidi başarıyla açıldı.`, embeds: [], components: [] });
      })
    }
    if (button.customId === "kapa") {
      await button.deferUpdate();
      let everyone = message.guild.roles.cache.find(r => r.name === "@everyone");
      message.channel.permissionOverwrites.edit(everyone.id, {
        SendMessages: false
      }).then(async() => {
          message.react(`${locked}`)
          await msg.edit({ content: `Kanal başarıyla kilitlendi.`, embeds: [], components: [] });
      })
    }

  })
  },
};
