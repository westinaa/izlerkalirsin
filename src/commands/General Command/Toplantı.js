const { PermissionsBitField, ButtonStyle, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const { red, green, nokta } = require("../../../settings/configs/emojis.json");
const conf = require("../../../settings/configs/sunucuayar.json");
const allah = require("../../../config.js");
const meetings = require('../../../settings/schemas/meeting');
const ayar = require("../../../settings/configs/ayarName.json");

module.exports = {
  conf: {
    aliases: ["toplanti", "yoklama", "meeting"],
    name: "toplantı",
    help: "toplantı",
    category: "yönetim",
  },

  run: async (client, message, args) => {
    let kanallar = ayar.KomutKullanımKanalİsim;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) {
      return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.` }).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    }

    if (!conf.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) { 
      message.reply({ content: `Gerekli yetkiye sahip değilsin.` }).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
      return;
    }

    let embed = new EmbedBuilder();
    const guild = client.guilds.cache.get(allah.GuildID);
    let MeetingData = await meetings.findOne({ guildID: message.guild.id });

    // Toplantı verisini kontrol et ve null kontrolü yap
    let meetingStatus = MeetingData?.Toplantı || false;
    const toplantiKanal = message.member.voice.channel;
    
    if (!toplantiKanal) {
      return message.reply(`Toplantı sistemi için herhangi bir ses kanalında bulunmalısınız.`).then(x => setTimeout(() => { x.delete().catch(err => {}) }, 7500));
    }

    if (toplantiKanal && toplantiKanal.members.size < 1) {
      return message.reply(`Toplantı sistemi için ses kanalınızda en az bir kişi olmalı.`).then(x => setTimeout(() => { x.delete().catch(err => {}) }, 7500));
    }

    if (MeetingData && MeetingData.userID && MeetingData.channelId && MeetingData.Toplantı && message.guild.channels.cache.get(MeetingData.channelId) && message.member.voice.channel.id !== MeetingData.channelId) {
      return message.reply(`Şuan da aktif bir toplantı var. ${message.guild.channels.cache.get(MeetingData.channelId) ? message.guild.channels.cache.get(MeetingData.channelId) : "#silinen-kanal"} kanalına girerek toplantıyı yönetebilirsin.`).then(x => setTimeout(() => { x.delete().catch(err => {}) }, 7500));
    }

    let Row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("toplantıAç")
          .setLabel(`Toplantı ${meetingStatus ? "Bitir" : "Başlat"}`)
          .setStyle(meetingStatus ? ButtonStyle.Danger : ButtonStyle.Success),
      );

    if (MeetingData && MeetingData.userID && MeetingData.channelId && MeetingData.Date && MeetingData.endAuthorId && MeetingData.endDate && MeetingData.Joining && MeetingData.Leaving) {
      embed.addFields({ name: `${nokta} Son Toplantı Bilgisi`, value: `
        > Toplantıya **\`${MeetingData.Joining.length}\`** yetkili katılmış ${green}
        > Toplantıya **\`${MeetingData.Leaving.length}\`** yetkili katılmamış ${red}
        > Toplantıya **\`${MeetingData.Leaving.length + MeetingData.Joining.length}\`** yetkili katılması beklendi.
        > Yetkililerin **\`%${(MeetingData.Joining.length / (MeetingData.Leaving.length + MeetingData.Joining.length) * 100).toFixed(1) || 0}\`** katılmış. **\`%${(MeetingData.Leaving.length / (MeetingData.Leaving.length + MeetingData.Joining.length) * 100).toFixed(1) || 0}\`** katılmamış.
        > Toplantı ${message.guild.channels.cache.get(MeetingData.channelId) ? message.guild.channels.cache.get(MeetingData.channelId) : "#silinen-kanal"} kanalında gerçekleşmiş.
        > Toplantı <t:${Math.floor(MeetingData.Date / 1000)}:R> tarihinde <@${MeetingData.userID}> tarafından başlatılmış.
        > Toplantı <t:${Math.floor(MeetingData.endDate / 1000)}:R> tarihinde <@${MeetingData.endAuthorId}> tarafından bitirilmiş.
        > Toplantı **\`${meetingTime(MeetingData.endDate - MeetingData.Date)}\`**  sürmüş.` 
      });
    }

    message.reply({ components: [Row], embeds: [
      embed.setDescription(`**Merhaba** ${message.member.user.tag}
      **${guild.name}** sunucusunda şuan da toplantı durumu: **${meetingStatus ? "Aktif" : "Devre-dışı"}** ${meetingStatus ? green : red}`)
    ]}).then(async (msg) => {
        var filter = (i) => i.user.id === message.member.id;
        let collector = msg.createMessageComponentCollector({ filter: filter, time: 120000 });
        collector.on('collect', async (i) => {
          if (i.customId === "toplantıAç") {
              let meetingStatus = MeetingData?.Toplantı || false;
              if (meetingStatus) {
                await meetings.updateOne({ guildID: allah.GuildID }, { $set: { Toplantı: false } }, { upsert: true });
                await meetings.updateOne({ guildID: message.guild.id }, { $set: { "endDate": Date.now(), "endAuthorId": i.user.id } }, { upsert: true });
                let KatilimData = await meetings.findOne({ guildID: message.guild.id }) || { Joining: [], Leaving: [] };
                msg.delete().catch(err => {});
                await message.channel.send({ embeds: [new EmbedBuilder().setDescription(`Başarıyla ${message.member.voice.channel} kanalında bulunan toplantı bitirildi. Son olarak katılım sağlayan tüm yetkililere ${message.guild.roles.cache.has(ayar.Katıldı) ? message.guild.roles.cache.get(ayar.Katıldı) : "@katıldı"} rolü dağıtılmaya başlandı.\n
${nokta} **Bitirilen Toplantı Bilgisi**
> Bu toplantıda katılması beklenen **(\`${KatilimData.Leaving.length + KatilimData.Joining.length} yetkili\`)**
> Bu toplantıda katılım sağlayan: **(\`${KatilimData.Joining.length} yetkili\`)** ${green}
> Bu toplantıda katılım sağlamayan: **(\`${KatilimData.Leaving.length} yetkili\`)** ${red}
> Bu toplantı  **\`${meetingTime(KatilimData.endDate - KatilimData.Date)}\`** sürmüş.`)], components: [] });
                if (KatilimData && KatilimData.Joining.length > 0) {
                  KatilimData.Joining.forEach(async (id) => {
                    let uye = message.guild.members.cache.get(id);
                    if (uye) uye.roles.add(ayar.Katıldı).catch(err => {});
                  });
                }
                await i.deferUpdate().catch(err => {});
              } else {
                msg.delete().catch(err => {});
                let katildiRolü = message.guild.roles.cache.get(ayar.Katıldı);
                if (katildiRolü) {
                  const members = [...guild.members.cache.filter(member => member.roles.cache.has(ayar.Katıldı)).values()].splice(0, 10);
                  for await (const member of members) {
                    await member.roles.remove(katildiRolü.id).catch(err => {});
                  }
                }
                await message.channel.send({ embeds: [new EmbedBuilder().setDescription(`Başarıyla ${message.member.voice.channel} kanalında toplantı başladı.\nLütfen biraz bekleyiniz toplantı kanalında yoklama alınıyor.`)] });
                await i.deferUpdate().catch(err => {});
                await meetings.deleteMany({ guildID: message.guild.id });
                let datax = await meetings.findOne({ guildID: allah.GuildID });
                if (!datax) { await meetings.updateOne({ guildID: allah.GuildID }, { $set: { Toplantı: true } }, { upsert: true }) }
                await meetings.updateOne({ guildID: message.guild.id }, { $set: { "Date": Date.now(), "userID": i.user.id, "channelId": message.member.voice.channel.id } }, { upsert: true });
              }
          }
        });
        collector.on('end', async (i) => {
          msg.delete().catch(err => {});
        });
    });
  },
};

function meetingTime(duration) {  
  let arr = [];
  if (duration / 3600000 > 1) {
    let val = parseInt(duration / 3600000);
    let durationn = parseInt((duration - (val * 3600000)) / 60000);
    arr.push(`${val} saat`);
    arr.push(`${durationn} dakika`);
  } else {
    let durationn = parseInt(duration / 60000);
    arr.push(`${durationn} dakika`);
  }
  return arr.join(", ");
};
