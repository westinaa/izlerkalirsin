const { PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const conf = require("../../../settings/configs/sunucuayar.json");
const { red, green, Loading } = require("../../../settings/configs/emojis.json");
const emoji = require("../../../settings/configs/emojis.json");
const allah = require("../../../config.js");
const ayar = require("../../../settings/configs/ayarName.json");
const moment = require("moment");
moment.locale("tr");

// Sayıları emoji'ye dönüştürmek için bir fonksiyon
const numberEmojis = {
  0: "<a:sifir:1352949730858111018>",
  1: "<a:bir:1352949743088570390>",
  2: "<a:iki:1352949750004977734>",
  3: "<a:uc:1352949728320426094>",
  4: "<a:dort:1352949733341003846>",
  5: "<a:bes:1352949737258745916>",
  6: "<a:alti:1352949746972753931>",
  7: "<a:yedi:1352949740223987742>",
  8: "<a:sekiz:1352949734729580595>",
  9: "<a:dokuz:1352949771727409182>"
};

function convertNumberToEmoji(number) {
  // Sayıyı string'e çevirip her bir basamağını emoji'ye dönüştürür
  return number.toString().split('').map(digit => numberEmojis[digit]).join('');
}

module.exports = {
  conf: {
    aliases: ["say"],
    name: "say",
    help: "say",
    category: "yetkili",
  },

  run: async (client, message, args, embed) => {
    let kanallar = ayar.KomutKullanımKanalİsim;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) {
      return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.` }).then((e) => setTimeout(() => { e.delete(); }, 10000));
    }

    if (!conf.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has('ADMINISTRATOR')) {
      message.react(red);
      return;
    }
    let Tag = conf.tag;

    var takviye = (message.guild.premiumSubscriptionCount);
    var takviyesayı = (message.guild.premiumTier);
    var TotalMember = (message.guild.memberCount);
    var AktifMember = (message.guild.members.cache.filter(m => m.presence && m.presence.status !== "offline").size);
    var sesli = (message.guild.members.cache.filter((x) => x.voice.channel).size);

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("detaylısay")
          .setLabel("Detaylı Say")
          .setEmoji(green)
          .setStyle(ButtonStyle.Secondary),

        new ButtonBuilder()
          .setCustomId("yenile")
          .setLabel("Yenile")
          .setEmoji(Loading)
          .setStyle(ButtonStyle.Secondary),
      );

    message.react(green);

    let sayembed = new EmbedBuilder()
      //.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
      .setColor("#ffffff")
      .setFooter({ text: `${moment(Date.now()).format("LLL")}`})
      .setAuthor({
        name: message.guild.name,  // Sunucunun ismi
        iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })  // Sunucunun profil fotoğrafı        
      })
      .setDescription(`
<t:${Math.floor(Date.now() / 1000)}:R> **Tarihli Sunucu Verisi**

\`•\` Sunucuda ${convertNumberToEmoji(TotalMember)} (${convertNumberToEmoji(AktifMember)} **Aktif**) üye bulunuyor.
\`•\` Şu an toplam ${convertNumberToEmoji(sesli)} (+${convertNumberToEmoji(message.guild.members.cache.filter(x => x.user.bot && x.voice.channel).size)} **Bot**) kişi sesli kanallarda.
\`•\` Sunucuya toplam ${convertNumberToEmoji(takviye)} boost basılmış.
`)

    let msg = await message.channel.send({ embeds: [sayembed], components: [row], });

    var filter = (button) => button.user.id === message.author.id;
    let collector = await msg.createMessageComponentCollector({ filter, time: 30000 });

    collector.on("collect", async (button) => {

      if (button.customId === "yenile") {

        let sayembed1 = new EmbedBuilder()
        .setColor("#ffffff")
          .setFooter({ text: `${moment(Date.now()).format("LLL")}`})
          //.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
          .setAuthor({
            name: message.guild.name,  // Sunucunun ismi
            iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })  // Sunucunun profil fotoğrafı        
          })
          .setDescription(`
<t:${Math.floor(Date.now() / 1000)}:R> **Tarihli Sunucu Verisi**

\`•\` Sunucuda ${convertNumberToEmoji(TotalMember)} (${convertNumberToEmoji(AktifMember)} **Aktif**) üye bulunuyor.
\`•\` Şu an toplam ${convertNumberToEmoji(sesli)} (+${convertNumberToEmoji(message.guild.members.cache.filter(x => x.user.bot && x.voice.channel).size)} **Bot**) kişi sesli kanallarda.
\`•\` Sunucuya toplam ${convertNumberToEmoji(takviye)} boost basılmış.
`)

        button.update({
          embeds: [sayembed1], components: [row]
        });
      }

      if (button.customId === "detaylısay") {

        const row2 = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder().setCustomId("yenile").setLabel("◀️ Geri").setStyle(ButtonStyle.Secondary),
          );

        var ToplamYetkili = message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(conf.teyitciRolleri[0])).size;

        button.update({
          embeds: [embed
            .setColor("#ffffff")
            .setFooter({ text: `${moment(Date.now()).format("LLL")}`})
            .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
            .setDescription(`
\`\`\`fix
Aşağıda A S T E L I A sunucusunun detaylı verileri bulunmaktadır.
\`\`\`
       \` • \` **Toplam Üye Sayısı :** ${convertNumberToEmoji(message.guild.memberCount)}
       \` • \` **Toplam Aktif Kullanıcı Sayısı :** ${convertNumberToEmoji(AktifMember)}
       \` • \` **Sesteki Toplam Üye Sayısı :** ${convertNumberToEmoji(sesli)}
       \` • \` **Sesteki Toplam Bot Sayısı :** ${convertNumberToEmoji(message.guild.members.cache.filter(x => x.user.bot && x.voice.channel).size)}
       \` • \` **Toplam Yetkili Sayısı :** ${convertNumberToEmoji(ToplamYetkili)}
       \` • \` **Boost Sayısı :** ${convertNumberToEmoji(takviye)}
       \` • \` **Bot Sayısı :** ${convertNumberToEmoji(message.guild.members.cache.filter(x => x.user.bot).size)}
\`\`\`fix
Aşağıda belirli zamanlara göre sunucuya giriş sayıları verilmiştir.
\`\`\`
       \` • \` **Son 1 saatte :** ${convertNumberToEmoji(message.guild.members.cache.filter(westina => (new Date().getTime() - westina.joinedTimestamp) < 1000 * 60 * 60).size)} kullanıcı giriş yapmış.
       \` • \` **Son 1 günde :** ${convertNumberToEmoji(message.guild.members.cache.filter(westina => (new Date().getTime() - westina.joinedTimestamp) < 1000 * 60 * 60 * 24).size)} kullanıcı giriş yapmış.
       \` • \` **Son 1 haftada :** ${convertNumberToEmoji(message.guild.members.cache.filter(westina => (new Date().getTime() - westina.joinedTimestamp) < 1000 * 60 * 60 * 24 * 7).size)} kullanıcı giriş yapmış.
       \` • \` **Son 1 ayda :**${convertNumberToEmoji(message.guild.members.cache.filter(westina => (new Date().getTime() - westina.joinedTimestamp) < 1000 * 60 * 60 * 24 * 30).size)} kullanıcı giriş yapmış.
      `)

        ], components: [row2]
        });
      }

    });

    collector.on('end', () => {
      const timeoutroww = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder().setCustomId("detaylısay").setLabel("Detaylı").setStyle(ButtonStyle.Secondary).setDisabled(true),
          new ButtonBuilder().setCustomId("yenile").setLabel("♻️ Yenile").setStyle(ButtonStyle.Secondary).setDisabled(true),
        );
      msg.edit({ components: [timeoutroww] });
    });

  }
};
