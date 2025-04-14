const client = global.bot;
const { EmbedBuilder } = require("discord.js");
const inviterSchema = require("../../settings/schemas/inviter");
const inviteMemberSchema = require("../../settings/schemas/inviteMember");
const otokayit = require("../../settings/schemas/otokayit");
const bannedTag = require("../../settings/schemas/bannedTag");
const regstats = require("../../settings/schemas/registerStats");
const conf = require("../../settings/configs/sunucuayar.json");
const allah = require("../../config.js");
const moment = require("moment");
const { green, red } = require("../../settings/configs/emojis.json")
const emoji = require("../../settings/configs/emojis.json")
const forceBans = require("../../settings/schemas/forceBans");
const isimler = require("../../settings/schemas/names");
  // OTOROL SISTEMI
  const otoRolID = "1357152624155037917"; // OTOMATİK VERİLECEK ROL ID
  const otoRolLogKanalID = "1359992316906963086"; // MESAJ ATILACAK KANALIN ID'Sİ

module.exports = async (member) => {

  if (member.user.bot) return;

    // Kullanıcıya belirtilen rolü ver
    member.roles.add(otoRolID).catch(err => {
      console.error("Rol verilemedi:", err);
    });

  const data = await forceBans.findOne({ guildID: allah.GuildID, userID: member.user.id });
  if (data) return member.guild.members.ban(member.user.id, { reason: "Sunucudan kalıcı olarak yasaklandı!" }).catch(() => {});
  
  let guvenilirlik = Date.now()-member.user.createdTimestamp < 1000*60*60*24*7;
  if (guvenilirlik) {
  if(conf.fakeAccRole) member.roles.add(conf.fakeAccRole).catch();
  } else if(conf.unregRoles) member.roles.add(conf.unregRoles).catch();
  /* if (member.user.username.includes(conf.tag)) { member.setNickname(`・Kayıtsız `).catch(); }
  else { member.setNickname(`・Kayıtsız `).catch();} */

  // Log kanalına mesaj gönder
  const logChannel = member.guild.channels.cache.get(otoRolLogKanalID);
  if (logChannel) {
    logChannel.send(`
<:mavi_cizgi:1361322789167960194><:mavi_cizgi:1361322789167960194><:mavi_cizgi:1361322789167960194><:mavi_cizgi:1361322789167960194><:mavi_cizgi:1361322789167960194><:mavi_cizgi:1361322789167960194>

<:emoji_10:1358335186776887447> ${member} **aramıza katıldı!**

<a:botonay:1361460346665046157> Kullanıcıya <@&${otoRolID}> rolünü başarıyla verdim.

<:kisi:1361438602269032770> **Sunucumuz \`${member.guild.memberCount}\` kişi oldu.**

<:mavi_cizgi:1361322789167960194><:mavi_cizgi:1361322789167960194><:mavi_cizgi:1361322789167960194><:mavi_cizgi:1361322789167960194><:mavi_cizgi:1361322789167960194><:mavi_cizgi:1361322789167960194>
    `);
  }

  let memberGün = moment(member.user.createdAt).format("DD");
  let memberTarih = moment(member.user.createdAt).format("YYYY HH:mm:ss");
  let memberAylar = moment(member.user.createdAt).format("MM").replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık");

  var üyesayısı = member.guild.memberCount.toString().replace(/ /g, "    ")
        var üs = üyesayısı.match(/([0-9])/g)
        üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
        if(üs) {
          üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
            return {
              '0': `${emoji.sifir}`,
              '1': `${emoji.bir}`,
              '2': `${emoji.iki}`,
              '3': `${emoji.uc}`,
              '4': `${emoji.dort}`,
              '5': `${emoji.bes}`,
              '6': `${emoji.alti}`,
              '7': `${emoji.yedi}`,
              '8': `${emoji.sekiz}`,
              '9': `${emoji.dokuz}`}[d];
            })
          }     

  const kayitchannel = member.guild.channels.cache.get(conf.kayıtwelcome);

  const res = await bannedTag.findOne({ guildID: allah.GuildID });
  if (!res) return
}; 
/*kayitchannel.wsend({ content:`
> \`${member.guild.name}\` Sunucumuza Hoş Geldin ${member} Seninle beraber sunucumuz (${üyesayısı}) Kişi Oldu! 🎉🎉
> Hesabın \`${memberGün} ${memberAylar} ${memberTarih}\` tarihinde (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>) oluşturulmuş. ${guvenilirlik ? `${red} Şüpheli!` : `${green} Güvenli!` } 

Sunucumuza kayıt olduğunda kurallar kanalına göz atmayı unutmayınız. Kayıt olduktan sonra kuralları okuduğunuzu <@&${conf.teyitciRolleri}>

kabul edeceğiz ve içeride yapılacak cezalandırma işlemlerini bunu göz önünde bulundurarak yapacağız`});*/

module.exports.conf = {
  name: "guildMemberAdd",
};
