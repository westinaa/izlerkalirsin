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

    const createdAt = `<t:${Math.floor(user.createdTimestamp / 1000)}:F> (<t:${Math.floor(user.createdTimestamp / 1000)}:R>)`;
    const joinedAt = `<t:${Math.floor(member.joinedTimestamp / 1000)}:F> (<t:${Math.floor(member.joinedTimestamp / 1000)}:R>)`;

    const devices = member.presence?.clientStatus
      ? Object.keys(member.presence.clientStatus).map(dev => dev.charAt(0).toUpperCase() + dev.slice(1)).join(", ")
      : "Bilinmiyor";

    const fetchedUser = await user.fetch();
    const bannerURL = fetchedUser.bannerURL({ dynamic: true, size: 1024 });

    // Profil rozetlerini kontrol et
    const isBooster = member.premiumSince ? true : false;
    const tagRoleID = "1357161320679477459"; // <-- TAG ROLÜ
    const isTag = member.roles.cache.has(tagRoleID) ? "Taglı" : "Tagsız";

    // Nitro kontrolü: banner varsa varsayım olarak nitro
    const isNitro = fetchedUser.banner ? "Evet" : "Hayır";

    const embed = new EmbedBuilder()
      .setColor(member.displayHexColor || "Random")
      .setAuthor({ name: `${user.tag}`, iconURL: user.displayAvatarURL({ dynamic: true }) })
      .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
      .addFields(
        {
          name: "<:mavi_bilgi:1361322787108687903> Genel Bilgiler",
          value: `<:mavi_bilet:1361322784537448640> **Ad:** ${user.username}\n<:member:1362153697982812453> **Etiket:** #${user.discriminator}\n<:blurple_search:1362163700487688223> **ID:** ${user.id}`,
          inline: true,
        },
        {
          name: "<:blurple_support:1362163705076388121> Oluşturulma Tarihi",
          value: createdAt,
          inline: true,
        },
        {
          name: "<:blurple_plus:1362163695358181478> Sunucuya Katılım",
          value: joinedAt,
          inline: true,
        },
        {
          name: "<:8912blurplehypsquadevent:1361322328180396133> Profil Rozetleri",
          value: `${isBooster ? "<:9372blurpleboostlevel9:1361322337386893392> **Booster**" : "<:blurple_cross:1362172098164031528> **Booster değil**"}\n**Tag Durumu:** ${isTag}`,
          inline: false,
        },
        {
          name: "<:mod:1362160134792548392> En Yüksek Rol",
          value: member.roles.highest.name,
          inline: true,
        },
        {
          name: "<:staff:1362171335291175063> Yönetici mi?",
          value: member.permissions.has("Administrator") ? "Evet" : "Hayır",
          inline: true,
        },
        {
          name: "<:Website:1362163490332344380> Aktif Cihaz(lar)",
          value: devices,
          inline: true,
        },
        {
          name: "<:nitro:1362171568825831595> Discord Nitro",
          value: `${isNitro}`,
          inline: false,
        }
      );

    // Profil açıklaması (bio)
    if (fetchedUser.bio) {
      embed.addFields({
        name: "<:blurple_shop:1362163706821349417> Bio",
        value: fetchedUser.bio,
        inline: false
      });
    }

    // Banner resmi varsa
    if (fetchedUser.banner) embed.setImage(bannerURL);

    message.reply({ embeds: [embed] });
  },
};
