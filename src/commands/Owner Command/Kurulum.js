const { Database } = require("ark.db");
const { ChannelType, PermissionsBitField, ButtonStyle, ComponentType, ActionRowBuilder, ButtonBuilder,StringSelectMenuBuilder,EmbedBuilder } = require("discord.js");
const allah = require("../../../config.js");
const {istatistik} = require("../../../settings/configs/emojis.json")

module.exports = {
conf: {
aliases: [],
name: "kurulum",
help: "kurulum",
category: "sahip",
owner: true,
},

run: async (client, message, args) => {

if (message.guild === null) {
return message.reply({ content: `Bu komutu sadece Sunucuda kullanabilirsin!`, ephemeral: true })
} else if (!allah.owners.includes(message.author.id)) {
return message.reply({ content: ":x: Bot developerı olmadığın için kurulumu yapamazsın.", ephemeral: true })
} else {

const row = new ActionRowBuilder()
.addComponents(
new StringSelectMenuBuilder()
.setCustomId('rolmenü')
.setPlaceholder('Kurulum Menüsü Açar')
.addOptions([
{
label: `Rol Kurulum`,
description: `Menü Rol Kurulum`,
emoji: istatistik,
value: "rol",
},
{
label: `Kanal Kurulum`,
description: `Log Kanalarını Kurulum Saglarsın`,
emoji: istatistik,
value: "kanal",
},
{
label: `Emoji Kurulum`,
description: `Emoji Kurulum`,
emoji: istatistik,
value: "emoji",
},
]),
);


let westina = new EmbedBuilder()
.setDescription(`**Kurulum Menüsü Aşagıdaki Menülerden Seçim Yapa bilirsiniz lütfen** \`60 sn\` **seçim yapın yoksa iptal eder**`)
.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })

let msg = await message.channel.send({ embeds: [westina], components : [row],})
 
 var filter = (button) => button.user.id === message.author.id;
 let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })


 collector.on("collect", async (interaction) => {

    if (interaction.values[0] === "rol") {
    await interaction.deferUpdate();
    
     await interaction.guild.roles.create({
    name: "------------------------",
    color: "#000000",
    permissions: "0",
    reason: "Rol seçim menüsü için oluşturuldu."
    });
    
    await interaction.guild.roles.create({
    name: "🍫",
    color: "#050505",
    permissions: "0",
    reason: "Rol seçim menüsü için oluşturuldu."
    });
    
    await interaction.guild.roles.create({
    name: "🥥",
    color: "#ffffff",
    permissions: "0",
    reason: "Rol seçim menüsü için oluşturuldu."
    });
    
    await interaction.guild.roles.create({
    name: "🍒",
    color: "#ff0000",
    permissions: "0",
    reason: "Rol seçim menüsü için oluşturuldu."
    });
    
    await interaction.guild.roles.create({
    name: "💦",
    color: "#009dff",
    permissions: "0",
    reason: "Rol seçim menüsü için oluşturuldu."
    });
    
    await interaction.guild.roles.create({
    name: "🥕",
    color: "#ff8400",
    permissions: "0",
    reason: "Rol seçim menüsü için oluşturuldu."
    });

    await interaction.guild.roles.create({
    name: "🍋",
    color: "#daff00",
    permissions: "0",
    reason: "Rol seçim menüsü için oluşturuldu."
    });

    await interaction.guild.roles.create({
    name: "🍇",
    color: "#6e00f8",
    permissions: "0",
    reason: "Rol seçim menüsü için oluşturuldu."
    });
    
    await interaction.guild.roles.create({
    name: "🥝",
    color: "#08ff00",
    permissions: "0",
    reason: "Rol seçim menüsü için oluşturuldu."
    });

    await interaction.guild.roles.create({
    name: "------------------------",
    color: "#000000",
    permissions: "0",
    reason: "Rol seçim menüsü için oluşturuldu."
    });
    
    await interaction.guild.roles.create({
    name: "Sevgilim Yok 💔",
    color: "#b0d0f7",
    permissions: "0",
    reason: "Rol seçim menüsü için oluşturuldu."
    });
    
    await interaction.guild.roles.create({
    name: "Sevgilim Var 💍",
    color: "#e73084",
    permissions: "0",
    reason: "Rol seçim menüsü için oluşturuldu."
    });
    
    await interaction.guild.roles.create({
    name: "------------------------",
    color: "#000000",
    permissions: "0",
    reason: "Rol seçim menüsü için oluşturuldu."
    });
    
    await interaction.guild.roles.create({
    name: "Çekiliş Katılımcısı 🎉",
    color: "#f89292",
    permissions: "0",
    reason: "Rol seçim menüsü için oluşturuldu."
    });
    
    await interaction.guild.roles.create({
    name: "Etkinlik Duyuru 🎉",
    color: "#f89292",
    permissions: "0",
    reason: "Rol seçim menüsü için oluşturuldu."
    });
    
    await interaction.guild.roles.create({
    name: "------------------------",
    color: "#000000",
    permissions: "0",
    reason: "Rol seçim menüsü için oluşturuldu."
    });
    
    await interaction.guild.roles.create({
    name: "♏ Akrep",
    color: "#ffffff",
    permissions: "0",
    reason: "Rol seçim menüsü için oluşturuldu."
    });
    
    await interaction.guild.roles.create({
    name: "♉ Boğa",
    color: "#ffffff",
    permissions: "0",
    reason: "Rol seçim menüsü için oluşturuldu."
    });
    
    await interaction.guild.roles.create({
    name: "♍ Başak",
    color: "#ffffff",
    permissions: "0",
    reason: "Rol seçim menüsü için oluşturuldu."
    });
    
    await interaction.guild.roles.create({
    name: "♊ İkizler",
    color: "#ffffff",
    permissions: "0",
    reason: "Rol seçim menüsü için oluşturuldu."
    });
    
    await interaction.guild.roles.create({
    name: "♒ Kova",
    color: "#ffffff",
    permissions: "0",
    reason: "Rol seçim menüsü için oluşturuldu."
    });
    
    await interaction.guild.roles.create({
    name: "♈ Koç",
    color: "#ffffff",
    permissions: "0",
    reason: "Rol seçim menüsü için oluşturuldu."
    });
    
    await interaction.guild.roles.create({
    name: "♋ Yengeç",
    color: "#ffffff",
    permissions: "0",
    reason: "Rol seçim menüsü için oluşturuldu."
    });
    
    await interaction.guild.roles.create({
    name: "♑ Oğlak",
    color: "#ffffff",
    permissions: "0",
    reason: "Rol seçim menüsü için oluşturuldu."
    });
    
    await interaction.guild.roles.create({
    name: "♎ Terazi",
    color: "#ffffff",
    permissions: "0",
    reason: "Rol seçim menüsü için oluşturuldu."
    });
    
    await interaction.guild.roles.create({
    name: "♌ Aslan",
    color: "#ffffff",
    permissions: "0",
    reason: "Rol seçim menüsü için oluşturuldu."
    });
    
    await interaction.guild.roles.create({
    name: "♓ Balık",
    color: "#ffffff",
    permissions: "0",
    reason: "Rol seçim menüsü için oluşturuldu."
    });
    
    await interaction.guild.roles.create({
    name: "♐ Yay",
    color: "#ffffff",
    permissions: "0",
    reason: "Rol seçim menüsü için oluşturuldu."
    });
    
    await interaction.guild.roles.create({
    name: "------------------------",
    color: "#000000",
    permissions: "0",
    reason: "Rol seçim menüsü için oluşturuldu."
    });
    
    await interaction.guild.roles.create({
    name: "🎮 CS:GO",
    color: "#ffa7a7",
    permissions: "0",
    reason: "Rol seçim menüsü için oluşturuldu."
    });
    
    await interaction.guild.roles.create({
    name: "🎮 League of Legends",
    color: "#ffa7a7",
    permissions: "0",
    reason: "Rol seçim menüsü için oluşturuldu."
    });
    
    await interaction.guild.roles.create({
    name: "🎮 Valorant",
    color: "#ffa7a7",
    permissions: "0",
    reason: "Rol seçim menüsü için oluşturuldu."
    });
    
    await interaction.guild.roles.create({
    name: "🎮 Gta V",
    color: "#ffa7a7",
    permissions: "0",
    reason: "Rol seçim menüsü için oluşturuldu."
    });
    
    await interaction.guild.roles.create({
    name: "🎮 PUBG",
    color: "#ffa7a7",
    permissions: "0",
    reason: "Rol seçim menüsü için oluşturuldu."
    });
    
    await interaction.guild.roles.create({
    name: "🎮 Fortnite",
    color: "#ffa7a7",
    permissions: "0",
    reason: "Rol seçim menüsü için oluşturuldu."
    });
    
    await interaction.guild.roles.create({
    name: "------------------------",
    color: "#000000",
    permissions: "0",
    reason: "Rol seçim menüsü için oluşturuldu."
    });

    await interaction.guild.roles.create({
        name: "Katıldı",
        color: "#00ff3c",
        permissions: "0",
        reason: "Rol seçim menüsü için oluşturuldu."
    });

    await interaction.guild.roles.create({
        name: "Streamer",
        color: "#1c0f45",
        permissions: "0",
           reason: "Rol seçim menüsü için oluşturuldu."
    });
    
    msg.reply({ content: `Menü için gerekli Rollerin kurulumu başarıyla tamamlanmıştır.\n**Not:** Renk rollerini booster ve taglı rollerinin üstüne taşıyınız.`, ephemeral: true })
    
    }
if (interaction.values[0] === "kanal") {
await interaction.deferUpdate();
 
const parent = await interaction.guild.channels.create({ name: 'Log',
type: ChannelType.GuildCategory,
permissionOverwrites: [{
id: interaction.guild.id,
deny: [PermissionsBitField.Flags.ViewChannel],
}]
});
await interaction.guild.channels.create({ name: 'role_log', 
type: ChannelType.GuildText,
parent: parent.id
});
await interaction.guild.channels.create({ name: 'kayıtsız_log', 
type: ChannelType.GuildText,
parent: parent.id
});
await interaction.guild.channels.create({ name: 'kayıt_log', 
    type: ChannelType.GuildText,
    parent: parent.id
    });
await interaction.guild.channels.create({ name: 'command_log',
type: ChannelType.GuildText,
parent: parent.id
});
await interaction.guild.channels.create({ name: 'message_log', 
type: ChannelType.GuildText,
parent: parent.id
});
await interaction.guild.channels.create({ name: 'voice_log', 
type: ChannelType.GuildText,
parent: parent.id
});
await interaction.guild.channels.create({ name: 'name_log', 
type: ChannelType.GuildText,
parent: parent.id
});
await interaction.guild.channels.create({ name: 'ban_log',
type: ChannelType.GuildText,
parent: parent.id
});
await interaction.guild.channels.create({ name: 'jail_log',
type: ChannelType.GuildText,
parent: parent.id
});
await interaction.guild.channels.create({ name: 'mute_log',
type: ChannelType.GuildText,
parent: parent.id
});
await interaction.guild.channels.create({ name: 'fake_Hesap_log',
type: ChannelType.GuildText,
parent: parent.id
});
await interaction.guild.channels.create({ name: 'cezapuan_log',
type: ChannelType.GuildText,
parent: parent.id
});
await interaction.guild.channels.create({ name: 'priv_log',
type: ChannelType.GuildText,
parent: parent.id
});
await interaction.guild.channels.create({ name: 'stream_log', 
type: ChannelType.GuildText,
parent: parent.id
});
await interaction.guild.channels.create({ name: 'camera_log', 
type: ChannelType.GuildText,
parent: parent.id
});
msg.reply({ content: `Log Kanallarının kurulumu başarıyla tamamlanmıştır.`, ephemeral: true })
}
if (interaction.values[0] === "emoji") {
await interaction.deferUpdate();
const emojis = [
{ name: "green", url: "https://cdn.discordapp.com/emojis/1350471905856978976.png?size=96"},
{ name: "red", url: "https://cdn.discordapp.com/emojis/1352281742408417350.gif?size=96&quality=high"},
{ name: "nokta", url: "https://cdn.discordapp.com/emojis/1145071840612593674.png?size=96"},
{ name: "ses", url: "https://cdn.discordapp.com/emojis/1349504902703091743.png?size=96"},
{ name: "sesmute", url: "https://cdn.discordapp.com/emojis/1352281302920855595.png?size=96"}, 
{ name: "mute", url: "https://cdn.discordapp.com/emojis/1336796436058341426.png?size=96"}, 
{ name: "pc", url: "https://cdn.discordapp.com/emojis/1168300434440589342.png?size=96"}, 
{ name: "mesaj", url: "https://cdn.discordapp.com/emojis/1336796556158046229.gif?size=96&quality=high"}, 
{ name: "info", url: "https://cdn.discordapp.com/emojis/947134506484244501.gif?size=96&quality=high"}, 
{ name: "istatistik", url: "https://cdn.discordapp.com/emojis/852453245468803132.png?size=96"},
{ name: "bann", url: "https://cdn.discordapp.com/emojis/1067098726381920256.gif?size=96&quality=high"},
{ name: "cekilis", url: "https://cdn.discordapp.com/emojis/1286376288906641562.gif?size=96&quality=high"},
{ name: "ok", url: "https://cdn.discordapp.com/emojis/1128068155223310518.gif?size=96&quality=high"},
{ name: "Hello", url: "https://cdn.discordapp.com/emojis/928882564385615873.gif?size=96&quality=high"},
{ name: "Loading", url: "https://cdn.discordapp.com/emojis/928317729759440957.gif?size=96&quality=high"},
{ name: "Tac", url: "https://cdn.discordapp.com/emojis/1264989481753120808.png?size=96&quality=high"},
{ name: "jail", url: "https://cdn.discordapp.com/emojis/1123085953351823410.png?size=96"},
{ name: "exxen", url: "https://cdn.discordapp.com/emojis/1257313521910284331.png?size=96&quality=high"},
{ name: "netflix", url: "https://cdn.discordapp.com/emojis/1113933109793148938.png?size=96&quality=high"},
{ name: "spotify", url: "https://cdn.discordapp.com/emojis/1019284777662169118.png?size=96&quality=high"},
{ name: "youtube", url: "https://cdn.discordapp.com/emojis/1226636396060475462.gif?size=96&quality=high"},
{ name: "boostluNitro", url: "https://cdn.discordapp.com/emojis/1024690406467829862.gif?size=96&quality=high"},
{ name: "hac", url: "https://cdn.discordapp.com/emojis/1259230260906557643.gif?size=96&quality=high"},
{ name: "locked", url: "https://cdn.discordapp.com/emojis/1347068390686199844.png?size=96"},
{ name: "unlocked", url: "https://cdn.discordapp.com/emojis/1352292199462731797.png?size=96"},
{ name: "kalp", url: "https://cdn.discordapp.com/emojis/1031131250901139486.gif?size=96&quality=high"},
{ name: "as", url: "https://cdn.discordapp.com/emojis/1352369858914025483.png?size=96"},
{ name: "yetkili", url: "https://cdn.discordapp.com/emojis/1334734473333440512.png?size=96"}

]
const SayıEmojis = [
{ name: "sifir", url: "https://cdn.discordapp.com/emojis/1197766386555039834.gif?size=80&quality=high" },
{ name: "bir", url: "https://cdn.discordapp.com/emojis/1197766388979347606.gif?size=80&quality=high" },
{ name: "iki", url: "https://cdn.discordapp.com/emojis/1197766405806903406.gif?size=80&quality=high" },
{ name: "uc", url: "https://cdn.discordapp.com/emojis/1197766379462459463.gif?size=80&quality=high" },
{ name: "dort", url: "https://cdn.discordapp.com/emojis/1197766384264958053.gif?size=80&quality=high" },
{ name: "bes", url: "https://cdn.discordapp.com/emojis/1197766403474853951.gif?size=80&quality=high" },
{ name: "alti", url: "https://cdn.discordapp.com/emojis/1197766394322890852.gif?size=80&quality=high" },
{ name: "yedi", url: "https://cdn.discordapp.com/emojis/1197766392024420382.gif?size=80&quality=high" },
{ name: "sekiz", url: "https://cdn.discordapp.com/emojis/1197766389222617098.gif?size=80&quality=high" },
{ name: "dokuz", url: "https://cdn.discordapp.com/emojis/1197766397074350170.gif?size=80&quality=high" }
]

////////////////////////////////////////////////SAYI VERİ TABAN/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
emojis.forEach(async (x) => {
    if (message.guild.emojis.cache.find((e) => x.name === e.name)) global.emojidb.set(x.name, message.guild.emojis.cache.find((e) => x.name === e.name).toString());
    if (message.guild.emojis.cache.find((e) => x.name === e.name)) return;
    const emoji = await interaction.guild.emojis.create({ attachment: x.url, name: x.name });
    await global.emojidb.set(x.name, emoji.toString()); 
    message.channel.send({ content: `\`${x.name}\` isimli emoji oluşturuldu! (${emoji.toString()})`, ephemeral: true })
    
    })
    
    SayıEmojis.forEach(async (x) => {
    if (message.guild.emojis.cache.find((e) => x.name === e.name)) global.emojidb.set(x.name, message.guild.emojis.cache.find((e) => x.name === e.name).toString());
    if (message.guild.emojis.cache.find((e) => x.name === e.name)) return;
    const emoji = await interaction.guild.emojis.create({ attachment: x.url, name: x.name });
    await global.emojidb.set(x.name, emoji.toString()); 
    message.channel.send({ content: `\`${x.name}\` isimli sayı emojisi oluşturuldu! (${emoji.toString()})`, ephemeral: true })
    
    })
    
    }
    
    })
    
    }
    },
    };