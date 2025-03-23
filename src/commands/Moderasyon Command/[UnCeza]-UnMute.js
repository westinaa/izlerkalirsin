const { ButtonStyle, EmbedBuilder, Client, ActionRowBuilder, ButtonBuilder, PermissionsBitField } = require('discord.js');
const moment = require("moment");
moment.locale("tr");
const penals = require("../../../settings/schemas/penals");
const conf = require("../../../settings/configs/sunucuayar.json");
const allah = require("../../../config.js");
const { red, green, sesmute, mesaj } = require("../../../settings/configs/emojis.json");
const ayar = require("../../../settings/configs/ayarName.json");

module.exports = {
  conf: {
    aliases: ["unmute", "uncmute"],
    name: "unmute",
    help: "unmute <westina/ID>",
    category: "cezalandırma",
  },

  run: async (client, message, args, embed) => {
    let kanallar = ayar.KomutKullanımKanalİsim;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) {
      return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.` })
        .then((e) => setTimeout(() => { e.delete(); }, 10000));
    }

    // Yetki Kontrolü
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !conf.cmuteHammer.some(x => message.member.roles.cache.has(x))) {
      message.react(red);
      message.reply({ embeds: [new EmbedBuilder()
        .setAuthor({ name: message.member.displayName, iconURL: message.member.user.displayAvatarURL({ dynamic: true }) })
        .setDescription(`${red} Yeterli yetkin bulunmuyor!`)] })
        .then((e) => setTimeout(() => { e.delete(); }, 5000));
      return;
    }

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) {
      message.react(red);
      message.reply({ embeds: [new EmbedBuilder().setDescription(`${red} Bir üye belirtmelisin!`)] })
        .then((e) => setTimeout(() => { e.delete(); }, 5000));
      return;
    }

    // Mute Kontrolü
    if (!conf.chatMute || !Array.isArray(conf.chatMute) || !conf.chatMute.length) {
      return message.reply({ content: "Chat mute dizisi doğru bir şekilde yüklenmemiş!" });
    }
    if (!conf.voiceMute || !Array.isArray(conf.voiceMute) || !conf.voiceMute.length) {
      return message.reply({ content: "Voice mute dizisi doğru bir şekilde yüklenmemiş!" });
    }

    if (!conf.chatMute.some(x => member.roles.cache.has(x)) && !conf.voiceMute.some(x => member.roles.cache.has(x))) {
      message.react(red);
      message.reply({ embeds: [new EmbedBuilder().setDescription(`${red} Bu üye muteli değil!`)] })
        .then((e) => setTimeout(() => { e.delete(); }, 5000));
      return;
    }

    // Yetki Kontrolü (Kendi Yetkisiyle Karşılaştırma)
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && member.roles.highest.position >= message.member.roles.highest.position) {
      message.react(red);
      message.reply({ embeds: [new EmbedBuilder()
        .setDescription(`${red} Kendinle aynı yetkide ya da daha yetkili olan birinin susturmasını kaldıramazsın!`)] })
        .then((e) => setTimeout(() => { e.delete(); }, 5000));
      return;
    }

    // Üye Yönetilebiliyor mu?
    if (!member.manageable) {
      message.react(red);
      message.reply({ embeds: [new EmbedBuilder().setDescription(`${red} Bu üyenin susturmasını kaldıramıyorum!`)] })
        .then((e) => setTimeout(() => { e.delete(); }, 5000));
      return;
    }

    // Butonları Hazırlama
    let mute = new ButtonBuilder()
      .setCustomId("mute")
      .setLabel("Chat Mute")
      .setStyle(ButtonStyle.Secondary)
      .setEmoji(mesaj);

    let vmute = new ButtonBuilder()
      .setCustomId("vmute")
      .setLabel("Voice Mute")
      .setStyle(ButtonStyle.Secondary)
      .setEmoji(sesmute);

    // Mute Durumlarına Göre Butonları Güncelleme
    if (!conf.chatMute.some(x => member.roles.cache.has(x))) {
      mute.setStyle(ButtonStyle.Secondary).setDisabled(true);
    } else {
      mute.setStyle(ButtonStyle.Success);
    }

    if (!conf.voiceMute.some(x => member.roles.cache.has(x))) {
      vmute.setStyle(ButtonStyle.Secondary).setDisabled(true);
    } else {
      vmute.setStyle(ButtonStyle.Danger);
    }

    const row = new ActionRowBuilder()
      .addComponents([mute, vmute]);

    let westina = new EmbedBuilder()
      .setDescription(`${member} üyesinin kaldırmak istediğiniz chat/voice mute cezalarını butonla aşağıdan seçiniz.`)
      .setFooter({ text: `Kapalı olan buton mutesi olmadığını gösterir kullanılamaz.` })
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));

    let msg = await message.channel.send({ embeds: [westina], components: [row] });

    var filter = button => button.user.id === message.author.id;
    let collector = await msg.createMessageComponentCollector({ filter, time: 30000 });

    collector.on("collect", async (button) => {

      if (button.customId === "mute") {
        await button.deferUpdate();

        mute.setStyle(ButtonStyle.Secondary).setDisabled(true);

        message.react(green);
        // Chat mute rolünü kaldır
        await member.roles.remove(conf.chatMute);
        const data = await penals.findOne({ userID: member.user.id, guildID: message.guild.id, type: "CHAT-MUTE", active: true });
        if (data) {
          data.active = false; // Cezayı geçerli olmaktan çıkar
          await data.save(); // Veritabanına kaydet
        }

        if (allah.Main.dmMessages) member.send({ content: `**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından susturmanız kaldırıldı!` }).catch(() => {});

        let westina = new EmbedBuilder()
          .setDescription(`${member.toString()} üyesinin susturması, ${message.author} tarafından kaldırıldı.`)
          .setFooter({ text: `Kapalı olan buton mutesi olmadığını gösterir kullanılamaz.` })
          .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));

        await msg.edit({ embeds: [westina], components: [row] });

        const log = new EmbedBuilder()
          .setDescription(`**${member ? member.user.tag : member.user.username}** adlı kullanıcının **${message.author.tag}** tarafından Chat Mute cezası kaldırıldı.`)
          .addFields(
            { name: "Affedilen", value: `[${member ? member.user.tag : member.user.username}](https://discord.com/users/${member.user.id})`, inline: true },
            { name: "Affeden", value: `[${message.author.tag}](https://discord.com/users/${message.author.id})`, inline: true },
            { name: "Ceza Bitiş", value: `<t:${Math.floor((Date.now()) / 1000)}:R>`, inline: true },
          )
          .setFooter({ text: `${moment(Date.now()).format("LLL")}` });
        message.guild.channels.cache.get(conf.cmuteLogChannel).wsend({ embeds: [log] });

      }

      if (button.customId === "vmute") {
        await button.deferUpdate();

        vmute.setStyle(ButtonStyle.Secondary).setDisabled(true);

        message.react(green);
        // Sesli mute rolünü kaldır
        await member.roles.remove(conf.voiceMute);
        if (member.voice.channelId && member.voice.serverMute) {
          await member.voice.setMute(false); // Sesli kanal mute kaldır
        }
        const data = await penals.findOne({ userID: member.user.id, guildID: message.guild.id, type: "VOICE-MUTE", active: true });
        if (data) {
          data.active = false; // Cezayı geçerli olmaktan çıkar
          data.removed = true; // Kaldırıldığını belirt
          await data.save(); // Veritabanına kaydet
        }

        if (allah.Main.dmMessages) member.send({ content: `**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından **sesli kanallarda** olan susturmanız kaldırıldı!` }).catch(() => {});

        let westina = new EmbedBuilder()
          .setDescription(`${member.toString()} üyesinin **sesli kanallarda** susturması, ${message.author} tarafından kaldırıldı.`)
          .setFooter({ text: `Kapalı olan buton mutesi olmadığını gösterir kullanılamaz.` })
          .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));

        await msg.edit({ embeds: [westina], components: [row] });

        const log = new EmbedBuilder()
          .setDescription(`**${member ? member.user.tag : member.user.username}** adlı kullanıcının **${message.author.tag}** tarafından Ses Mute cezası kaldırıldı.`)
          .addFields(
            { name: "Affedilen", value: `[${member ? member.user.tag : member.user.username}](https://discord.com/users/${member.user.id})`, inline: true },
            { name: "Affeden", value: `[${message.author.tag}](https://discord.com/users/${message.author.id})`, inline: true },
            { name: "Ceza Bitiş", value: `<t:${Math.floor((Date.now()) / 1000)}:R>`, inline: true },
          )
          .setFooter({ text: `${moment(Date.now()).format("LLL")}` });
        message.guild.channels.cache.get(conf.vmuteLogChannel).wsend({ embeds: [log] });
      }
    });
  },
};
