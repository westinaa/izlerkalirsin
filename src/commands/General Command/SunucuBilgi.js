const { EmbedBuilder, ChannelType } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
moment.locale("tr");

module.exports = {
  conf: {
    aliases: ["serverinfo", "sunucubilgi", "sunucu", "sb"],
    name: "serverbilgi",
    help: "serverbilgi",
    category: "genel",
  },

  run: async (client, message, args, prefix) => {
    const guild = message.guild;

    // Üyeleri fetch et
    const members = await guild.members.fetch();
    const bots = members.filter((m) => m.user.bot).size;
    const users = members.size - bots;

    // Kanal türlerine göre sayılar
    const channels = guild.channels.cache;
    const textChannels = channels.filter(c => c.type === ChannelType.GuildText).size;
    const voiceChannels = channels.filter(c => c.type === ChannelType.GuildVoice).size;
    const categories = channels.filter(c => c.type === ChannelType.GuildCategory).size;
    const stageChannels = channels.filter(c => c.type === ChannelType.GuildStageVoice).size;
    const forumChannels = channels.filter(c => c.type === ChannelType.GuildForum).size;

    // Rol, emoji, sticker sayıları
    const roles = guild.roles.cache.sort((a, b) => b.position - a.position).map(r => r.name);
    const emojis = guild.emojis.cache.size;
    const stickers = guild.stickers.cache.size;

    // Son katılanlar
    const recentMembers = Array.from(members.values())
      .filter(m => m.joinedTimestamp)
      .sort((a, b) => b.joinedTimestamp - a.joinedTimestamp)
      .slice(0, 5);

    const recentUsers = recentMembers
      .map(m => `<@${m.user.id}> - <t:${Math.floor(m.joinedTimestamp / 1000)}:R>`)
      .join("\n");

    // Aktif ve inaktif kullanıcı oranı
    const onlineUsers = members.filter((m) => m.presence?.status === "online").size;
    const offlineUsers = members.filter((m) => !m.presence || m.presence.status === "offline").size;

    // Sesli kanalda aktif kullanıcılar
    const voiceMembers = members.filter(m => m.voice?.channel).size;

    // En kalabalık ses kanalı
    const voiceChannelsActive = channels.filter(c => c.type === ChannelType.GuildVoice && c.members.size > 0);
    const mostCrowdedChannel = voiceChannelsActive.sort((a, b) => b.members.size - a.members.size).first();

    const mostCrowdedText = mostCrowdedChannel
      ? `${mostCrowdedChannel.name} kanalında **${mostCrowdedChannel.members.size}** kişi var.`
      : "Şu anda aktif bir ses kanalı yok.";

    const embed = new EmbedBuilder()
      .setColor("Blurple")
      .setAuthor({ name: guild.name, iconURL: guild.iconURL({ dynamic: true }) })
      .setThumbnail(guild.iconURL({ dynamic: true, size: 512 }))
      .addFields(
        {
          name: "<:mavi_bilgi:1361322787108687903> Genel Bilgiler",
          value: `<:mavi_bilet:1361322784537448640> **Sunucu Adı:** ${guild.name}\n<:3199blurplejoin:1361323015815565452> **ID:** ${guild.id}\n<:timeout:1361011169283801392> **Oluşturulma:** <t:${Math.floor(guild.createdTimestamp / 1000)}:F> (<t:${Math.floor(guild.createdTimestamp / 1000)}:R>)\n<:btac:1362154535723733003> **Sahibi:** <@${guild.ownerId}>`,
          inline: false,
        },
        {
          name: "<:member:1362153697982812453> Üye Bilgileri",
          value: `<:mavi_arkadasekle:1361322770935447715> **Toplam:** ${members.size}\n<:member:1362153697982812453> **Kullanıcılar:** ${users}\n<:bot:1362157536895176947> **Botlar:** ${bots}`,
          inline: true,
        },
        {
          name: "<:mavi_rehber:1361322809292226740> Kanal Bilgileri",
          value: `<:tag:1362160034120732904> **Metin:** ${textChannels}\n<:8719blurpleundeafened:1361322324959301703> **Ses:** ${voiceChannels}\n<:8319folder:1361323126507704350> **Kategoriler:** ${categories}\n<:Stage_Event:1362163515212824576> **Stage:** ${stageChannels}\n<:mavi_sohbet:1361322813272883460> **Forum:** ${forumChannels}`,
          inline: true,
        },
        {
          name: "<:mavi_bilgi:1361322787108687903> Roller & Emojiler",
          value: `<:mavi_rehber:1361322809292226740> **Rol Sayısı:** ${roles.length}\n<a:dc:1361778193010262236> **Emojiler:** ${emojis}\n<:mavi_resim:1361322811171409960> **Stickerlar:** ${stickers}`,
          inline: true,
        },
        {
          name: "<:9372blurpleboostlevel9:1361322337386893392> Boost Bilgisi",
          value: `<:blurple_rocket:1362163698088677546> **Seviye:** ${guild.premiumTier}\n<:Subscription_levels_mobile:1362163508434829676> **Boost Sayısı:** ${guild.premiumSubscriptionCount || 0}`,
          inline: true,
        },
        {
          name: "<:mavi_bilgi:1361322787108687903> Diğer",
          value: `<:emoji_25:1358335646090920036> **Doğrulama Seviyesi:** ${guild.verificationLevel}\n<:mavi_resim:1361322811171409960> **Banner:** ${guild.banner ? "[Görüntüle](" + guild.bannerURL({ size: 1024 }) + ")" : "Yok"}\n<:mavi_resim:1361322811171409960> **Splash Image:** ${guild.splash ? "[Görüntüle](" + guild.splashURL({ size: 1024 }) + ")" : "Yok"}`,
          inline: false,
        },
        {
          name: "<:timeout:1361011169283801392> Son Katılanlar",
          value: recentUsers || "Hiç katılım yok.",
          inline: false,
        },
        {
          name: "<:blurple_voicechannel:1362166090687582339> Aktif Sesli Kullanıcılar",
          value: `Şu anda **${voiceMembers}** kişi bir ses kanalında.`,
          inline: false,
        },
        {
          name: "<:stat:1362160182972649483> En Kalabalık Ses Kanalı",
          value: mostCrowdedText,
          inline: false,
        },
        {
          name: "<:blurple_support:1362163705076388121> Çevrimiçi / Çevrimdışı Kullanıcı Oranı",
          value: `<:online:1362150449339437098> **Çevrimiçi Kullanıcılar:** ${onlineUsers} | <:offline:1362150471695077557> **Çevrimdışı Kullanıcılar:** ${offlineUsers}`,
          inline: false,
        }
      )
      .setFooter({ text: `${message.author.tag} tarafından istendi`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
      .setTimestamp();

    message.reply({ embeds: [embed] });
  },
};
