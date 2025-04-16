const { EmbedBuilder } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
moment.locale("tr");

module.exports = {
  conf: {
    aliases: ["kbilgi", "kullanıcıbilgi", "kb"],
    name: "kullanıcıbilgi",
    help: "kullanıcıbilgi [@kullanıcı]",
    category: "genel",
  },

  run: async (client, message, args) => {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const user = member.user;

    // Kullanıcı oluşturulma ve katılım tarihlerini Türkçe formatta alalım
    const createdAt = `\`${moment(user.createdTimestamp).format("LL")}\` (<t:${Math.floor(user.createdTimestamp / 1000)}:R>);`;  // Türkçe formatta oluşturulma tarihi
    const joinedAt = `\`${moment(member.joinedTimestamp).format("LL")}\` (<t:${Math.floor(member.joinedTimestamp / 1000)}:R>)`;  // Türkçe formatta katılım tarihi

    // Cihaz isimlerini Türkçeleştiren kısım
    const devices = member.presence?.clientStatus
      ? Object.keys(member.presence.clientStatus)
          .map(dev => {
            if (dev === "desktop") return "PC";
            if (dev === "mobile") return "Mobil";
            if (dev === "web") return "Tarayıcı";
            return dev;
          })
          .join(", ")
      : "Bilinmiyor";

    const fetchedUser = await user.fetch();
    const bannerURL = fetchedUser.bannerURL({ dynamic: true, size: 1024 });

    const isBooster = member.premiumSince ? true : false;
    const tagRoleID = "1357161320679477459"; // <-- TAG ROLÜ
    const isTag = member.roles.cache.has(tagRoleID) ? "Taglı" : "Tagsız";
    const isNitro = fetchedUser.banner ? "Evet" : "Hayır";

    // Kullanıcı durumunu kontrol et
    const userStatus = member.presence ? member.presence.status : "offline"; // Durum bilgisi: online, idle, dnd, offline

    // Durumu insan anlaşılır formatta dönüştürme
    let statusMessage = "Bilinmiyor";
    if (userStatus === "online") statusMessage = "<:online1:1362185128608141323> Çevrimiçi";
    else if (userStatus === "idle") statusMessage = "<:idle:1362185213618425968> Boşta";
    else if (userStatus === "dnd") statusMessage = "<:dnd1:1362185302168305724> Rahatsız Etmeyin";
    else if (userStatus === "offline") statusMessage = "<:offline1:1362185272535548147> Çevrimdışı/Görünmez";

    const embed = new EmbedBuilder()
      .setColor(member.displayHexColor || "Random")
      .setAuthor({ name: `${user.tag}`, iconURL: user.displayAvatarURL({ dynamic: true }) })
      .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
      .addFields(
        {
          name: "<:mavi_bilgi:1361322787108687903> Genel Bilgiler:",
          value: `<:mavi_bilet:1361322784537448640> **Ad:** ${user.username}\n<:member:1362153697982812453> **ID:** ${user.id}\n<:blurple_search:1362163700487688223> **Etiket:** <@${user.id}>`,
          inline: false,
        },
        {
          name: "<:blurple_support:1362163705076388121> Oluşturulma Tarihi:",
          value: createdAt,
          inline: false,
        },
        {
          name: "<:blurple_plus:1362163695358181478> Sunucuya Katılım:",
          value: joinedAt,
          inline: false,
        },
        {
          name: "<:8912blurplehypsquadevent:1361322328180396133> Profil Rozetleri:",
          value: `${isBooster ? "<:9372blurpleboostlevel9:1361322337386893392> **Booster**" : "<:blurple_cross:1362172098164031528> **Booster değil**"}\n<:3199blurplejoin:1361323015815565452> **Tag Durumu:** ${isTag}`,
          inline: false,
        },
        {
          name: "<:mod:1362160134792548392> En Yüksek Rol:",
          value: `<@&${member.roles.highest.id}>`,
          inline: true,
        },
        {
          name: "<:staff:1362171335291175063> Yönetici mi?:",
          value: member.permissions.has("Administrator") ? "Evet" : "Hayır",
          inline: true,
        },
        {
          name: "<:Website:1362163490332344380> Aktif Cihaz(lar):",
          value: devices,
          inline: false,
        },
        {
          name: "<:nitro:1362171568825831595> Discord Nitro:",
          value: `${isNitro}`,
          inline: false,
        },
        {
          name: "<:statt:1362184848193622088> Kullanıcı Durumu:", // Durumu buraya ekleyelim
          value: statusMessage, // Durum burada gösterilecek
          inline: false,
        }
      );

    if (fetchedUser.bio) {
      embed.addFields({
        name: "<:blurple_shop:1362163706821349417> Bio:",
        value: fetchedUser.bio,
        inline: false,
      });
    }

    if (fetchedUser.banner) embed.setImage(bannerURL);

    // Eğer kullanıcı nitroluysa ve banner varsa, banner açıklaması ekle
    if (isNitro === "Evet" && fetchedUser.banner) {
      embed.addFields({
        name: "\u200B",
        value: "<:mavi_guncelleme:1361322791290404987> Banner",
        inline: false,
      });
    }

    message.reply({ embeds: [embed] });
  },
};
