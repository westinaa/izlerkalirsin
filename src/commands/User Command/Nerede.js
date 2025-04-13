const {
    EmbedBuilder,
    PermissionsBitField,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
  } = require("discord.js");
  const moment = require("moment");
  moment.locale("tr");
  
  module.exports = {
    conf: {
      aliases: ["n"],
      name: "n",
      help: "n @kullanıcı / ID",
      category: "kullanıcı",
    },
  
    run: async (client, message, args) => {
      const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      const authorMember = message.member;
  
      if (!authorMember.voice.channel)
        return message.reply({ content: "Bir ses kanalında olmalısın!" });
  
      if (!member)
        return message.reply({ content: "Bir kullanıcı etiketlemelisin veya ID girmelisin." });
  
      if (!member.voice.channel)
        return message.reply({ content: "Etiketlediğin kişi bir sesli kanalda değil." });
  
      if (authorMember.voice.channel.id === member.voice.channel.id)
        return message.reply({ content: "Zaten aynı ses kanalındasınız." });
  
      const gitButonRow = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("git")
          .setLabel("Yanına Git")
          .setStyle(ButtonStyle.Primary)
      );
  
      const gitMesaj = await message.channel.send({
        content: `${member}`,
        embeds: [new EmbedBuilder().setColor("#5865F2").setDescription(`${member} kişisinin bulunduğu kanal: \`${member.voice.channel.name}\``)],
        components: [gitButonRow],
      });
  
      const filter = (i) => i.customId === "git" && i.user.id === authorMember.id;
      const collector = gitMesaj.createMessageComponentCollector({ filter, time: 15000 });
  
      collector.on("collect", async (i) => {
        await i.deferUpdate();
  
        // Yönetici yetkisi varsa onay istemeden geçiş yap
        if (authorMember.permissions.has(PermissionsBitField.Flags.Administrator)) {
          await authorMember.voice.setChannel(member.voice.channel);
  
          await message.channel.send({
            content: `${authorMember}, ${member} kişisinin yanına ışınlandın (yönetici yetkisiyle).`,
          });
  
          const logEmbed = new EmbedBuilder()
            .setColor("#43b581")
            .setAuthor({
              name: message.guild.name,
              iconURL: message.guild.iconURL({ dynamic: true }),
            })
            .setDescription(
              `🎧 ${authorMember} (Yönetici) \`.n\` komutunu kullanarak ${member} kişisinin yanına direkt gitti.`
            )
            .setFooter({ text: moment().format("LLL") });
  
          const logChannel = message.guild.channels.cache.get("1359992320811864176");
          if (logChannel) logChannel.send({ embeds: [logEmbed] });
  
          return;
        }
  
        // Yönetici değilse onay sistemi başlasın
        const embed = new EmbedBuilder()
          .setColor("#2f3136")
          .setAuthor({ name: member.user.username, iconURL: member.displayAvatarURL({ dynamic: true }) })
          .setDescription(`${member}, ${authorMember} senin yanına gelmek istiyor.`)
          .setFooter({ text: "30 saniye içinde onay vermezsen işlem iptal edilir." });
  
        const buttonRow = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("kabul_et")
            .setLabel("Kabul Et")
            .setStyle(ButtonStyle.Success),
          new ButtonBuilder()
            .setCustomId("reddet")
            .setLabel("Reddet")
            .setStyle(ButtonStyle.Danger)
        );
  
        const onayMesaj = await message.channel.send({
          content: `${member}`,
          embeds: [embed],
          components: [buttonRow],
        });
  
        const onayFilter = (btn) => btn.user.id === member.id;
        const onayCollector = onayMesaj.createMessageComponentCollector({
          filter: onayFilter,
          time: 30000,
        });
  
        onayCollector.on("collect", async (btn) => {
          await btn.deferUpdate();
  
          if (btn.customId === "kabul_et") {
            await authorMember.voice.setChannel(member.voice.channel);
  
            await onayMesaj.edit({
              content: "İşlem onaylandı, kullanıcı yanına geldi.",
              components: [],
            });
  
            const logEmbed = new EmbedBuilder()
              .setColor("#43b581")
              .setAuthor({
                name: message.guild.name,
                iconURL: message.guild.iconURL({ dynamic: true }),
              })
              .setDescription(
                `🎧 ${authorMember} \`.n\` komutunu kullanarak ${member} kişisinin yanına gitti.`
              )
              .setFooter({ text: moment().format("LLL") });
  
            const logChannel = message.guild.channels.cache.get("1359992320811864176");
            if (logChannel) logChannel.send({ embeds: [logEmbed] });
          }
  
          if (btn.customId === "reddet") {
            await onayMesaj.edit({
              content: "İşlem reddedildi.",
              components: [],
            });
          }
        });
  
        onayCollector.on("end", async (collected) => {
          if (collected.size === 0) {
            await onayMesaj.edit({
              content: "⏰ İşlem zaman aşımına uğradı.",
              components: [],
            });
          }
        });
      });
    },
  };
  