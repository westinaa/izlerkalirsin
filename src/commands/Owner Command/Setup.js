const {
  ComponentType,
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  RoleSelectMenuBuilder,
  ChannelSelectMenuBuilder,
  ChannelType
} = require("discord.js");

const allah = require("../../../config.js");
const ayar = require("../../../settings/configs/sunucuayar.json");
const { red } = require("../../../settings/configs/emojis.json");
const moment = require("moment");
require("moment-duration-format");
moment.locale("tr");

module.exports = {
  conf: {
    aliases: ["kur", "setup"],
    name: "setup",
    help: "setup",
    category: "sahip",
    owner: true,
  },

  run: async (client, message, args) => {
    if (!message.guild) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setDescription(`${red} Bu komutu sadece sunucuda kullanabilirsin.`)
        ]
      }).then((msg) => setTimeout(() => msg.delete().catch(() => {}), 5000));
    }

    if (!allah.owners.includes(message.author.id)) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setDescription(`${red} Bot geliştiricisi olmadığın için bu komutu kullanamazsın.`)
        ]
      }).then((msg) => setTimeout(() => msg.delete().catch(() => {}), 5000));
    }

    const choose = args[0];

    const row = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("select")
        .setPlaceholder("Sunucu Kurulum Menüsü İçin Tıkla!")
        .addOptions([
          {
            label: "Kurulum Menü",
            description: "Sunucu İçerisi Kurulum Menüsü.",
            value: "help",
          },
          {
            label: "Kontrol Menü",
            description: "Sunucuda Kurulmuş Olan Setup Listesi.",
            value: "help2",
          },
        ])
    );

    if (!choose) {
      const westina = new EmbedBuilder()
        .setDescription(`Merhaba ${message.author}, sunucu kurulumu için aşağıdaki menüyü kullan.\nKomutun Kullanıldığı Tarih: \`${moment(Date.now()).format("LLL")}\``)
        .setColor("Random")
        .setAuthor({
          name: message.guild.name,
          iconURL: message.guild.iconURL({ dynamic: true, size: 2048 }),
        })
        .setFooter({
          text: `${message.guild.name} | Setup Sistemi`,
          iconURL: message.guild.iconURL({ dynamic: true }),
        })
        .setThumbnail(message.guild.iconURL({ dynamic: true }));

      await message.reply({ embeds: [westina], components: [row] });

      const filter = (i) => i.user.id === message.author.id;
      const collector = message.channel.createMessageComponentCollector({
        filter,
        componentType: ComponentType.StringSelect,
        time: 120_000,
      });

      collector.on("collect", async (interaction) => {
        if (interaction.values[0] === "help") {
          const rolMenu = new EmbedBuilder()
            .setAuthor({
              name: message.guild.name,
              iconURL: message.guild.iconURL({ dynamic: true, size: 2048 }),
            })
            .setFooter({
              text: `${message.guild.name} | Setup Kurulum Sistemi`,
              iconURL: message.guild.iconURL({ dynamic: true }),
            })
            .setColor("Blurple")
            .setDescription(`
**Rol Kurulum Komutları**
\`\`\`
.kur tag <Örnek: • >
.kur ikinciTag <Örnek: x >
.kur unregRoles <@rol>
.kur manRoles <@rol1 @rol2>
.kur womanRoles <@rol1 @rol2>
.kur boosterRole <@rol>
.kur jailRole <@rol>
.kur yasaklıRole <@rol>
.kur chatMute <@rol>
.kur voiceMute <@rol>
.kur fakeAccRole <@rol>
.kur banHammer <@rol>
.kur jailHammer <@rol>
.kur cmuteHammer <@rol>
.kur vmuteHammer <@rol>
\`\`\`

**Kanal Kurulum Komutları**
\`\`\`
.kur chatChannel <#kanal>
.kur privwelcome <#kanal>
.kur kayıtwelcome <#kanal>
.kur banLogChannel <#kanal>
.kur jailLogChannel <#kanal>
.kur cmuteLogChannel <#kanal>
.kur vmuteLogChannel <#kanal>
.kur cezapuanlog <#kanal>
\`\`\`
            `);

          return interaction.reply({ embeds: [rolMenu], ephemeral: true });
        }

        if (interaction.values[0] === "help2") {
          const formatRoles = (roles) =>
            Array.isArray(roles) && roles.length > 0
              ? roles.map((x) => `<@&${x}>`).join(", ")
              : "`YOK`";

          const formatSingle = (x) => (x ? `<@&${x}>` : "`YOK`");
          const formatChannel = (x) => (x ? `<#${x}>` : "`YOK`");
          const formatUsers = (users) =>
            Array.isArray(users) && users.length > 0
              ? users.map((x) => `<@${x}>`).join(", ")
              : "`YOK`";

          const kontrolEmbed = new EmbedBuilder()
            .setAuthor({
              name: message.guild.name,
              iconURL: message.guild.iconURL({ dynamic: true }),
            })
            .setFooter({
              text: `${message.guild.name} | Kontrol Menüsü`,
              iconURL: message.guild.iconURL({ dynamic: true }),
            })
            .setColor("Green")
            .setDescription(`
> **Kontrol Paneli**
Bot Owner: ${formatUsers(allah.owners)}
Link: \`${ayar.serverUrl || "YOK"}\`
Taglar: \`${ayar.tag || "YOK"}\`, \`${ayar.ikinciTag || "YOK"}\`

Erkek Rolleri: ${formatRoles(ayar.erkekRolleri)}
Kadın Rolleri: ${formatRoles(ayar.kizRolleri)}
Kayıtsız Rol: ${formatRoles(ayar.unregRoles)}
Booster Rol: ${formatSingle(ayar.boosterRolu)}
Teyitçi Rol: ${formatRoles(ayar.teyitciRolleri)}
Sahip Rol: ${formatRoles(ayar.sahipRolu)}
Jail Rol: ${formatRoles(ayar.jailRole)}
Yasaklı Tag Rol: ${formatRoles(ayar.yasaklıRole)}
Mute Rolleri: ${formatRoles(ayar.chatMute)}, ${formatRoles(ayar.voiceMute)}
Hammer Rolleri: ${formatRoles(ayar.banHammer)}, ${formatRoles(ayar.jailHammer)}, ${formatRoles(ayar.cmuteHammer)}, ${formatRoles(ayar.vmuteHammer)}
Fake Hesap Rol: ${formatRoles(ayar.fakeAccRole)}

Kanallar:
Chat: ${formatChannel(ayar.chatChannel)}
Priv Welcome: ${formatChannel(ayar.privwelcome)}
Kayıt Welcome: ${formatChannel(ayar.kayıtwelcome)}
Ban Log: ${formatChannel(ayar.banLogChannel)}
Jail Log: ${formatChannel(ayar.jailLogChannel)}
CMute Log: ${formatChannel(ayar.cmuteLogChannel)}
VMute Log: ${formatChannel(ayar.vmuteLogChannel)}
Ceza Puan Log: ${formatChannel(ayar.cezapuanlog)}
`);

          return interaction.reply({ embeds: [kontrolEmbed], ephemeral: true });
        }
      });

      return; // Eğer menü açıldıysa aşağısı çalışmasın
    }

    // Eğer "choose" verilmişse (örn: `.kur tag •`)
    const select = args.slice(1).join(" ");
    if (!select) return message.reply(`Lütfen bir değer belirtin.`);

    const settingsMap = {
      tag: "tag",
      ikinciTag: "ikinciTag",
      url: "serverUrl",
    };

    const key = Object.keys(settingsMap).find((x) => x.toLowerCase() === choose.toLowerCase());
    if (!key) return message.reply("Geçerli bir kurulum anahtarı belirtin.");

    global.westinasetupxd.set(settingsMap[key], select);
    return message.reply(`**${settingsMap[key]}** değeri olarak \`${select}\` başarıyla kaydedildi.`);
  },
};
