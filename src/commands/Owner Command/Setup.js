const { ComponentType, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ChannelType } = require("discord.js");
const { RoleSelectMenuBuilder, ChannelSelectMenuBuilder } = require("discord.js");
const allah = require("../../../config.js");
const { Database } = require("ark.db");
const ayar = require("../../../settings/configs/sunucuayar.json");
const { red, green,Loading  } = require("../../../settings/configs/emojis.json")
const moment = require("moment");
require("moment-duration-format");
moment.locale("tr")

module.exports = {
  conf: {
    aliases: ["kur","setup"],
    name: "setup",
    help: "setup",
    category: "sahip",
    owner: true,
  },

  run: async (client, message, args) => {

    if (message.guild === null) {
      return message.reply({ embeds: [new EmbedBuilder()
        .setThumbnail()
        .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setDescription(`${red} Bu komutu sadece Sunucuda kullanabilirsin`)
        ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));  
    } else if (!allah.owners.includes(message.author.id)) {
      return message.reply({ embeds: [new EmbedBuilder()
        .setThumbnail()
        .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setDescription(`${red} Bot developerı olmadığın için kurulumu yapamazsın`)
        ] }).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    } else {

    }

    let choose = args[0]

    const row = new ActionRowBuilder()
    .addComponents(
    new StringSelectMenuBuilder()
    .setCustomId('select')
    .setPlaceholder('Sunucu Kurulum Menüsü İçin Tıkla!')
    .addOptions([
      { label: 'Kurulum Menü', description: 'Sunucu İçerisi Kurulum Menüsü.', value: 'help' },
      { label: 'Kontrol Menü', description: 'Sunucuda Kurulmuş Olan Setup Listesi.', value: 'help2' },
    ]),
    );

    

    
    if(!choose) {
    let westina = new EmbedBuilder()
    .setDescription(`Merhaba ${message.author} Sunucu Kurulumu İçin Aşağıdaki Menüyü Kullan !! Komutun Kullanıldığı Tarih \`${moment(Date.now()).format("LLL")}\` `)
    .setColor("Random")
    .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
    .setFooter({text : `${message.guild.name} | Setup Sistemi`, iconURL : message.guild.iconURL({dynamic : true})})
    .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
    message.reply({ embeds: [westina],components: [row] })
    }

    
    const filter = i => i.user.id == message.author.id    
let collector = await message.channel.createMessageComponentCollector({ filter, componentType: ComponentType.StringSelect, max: 5, time: 120000 })
collector.on("collect", async (interaction) => {
    
if (interaction.values[0] === "help") {
    const rol1 = new EmbedBuilder()
    .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
    .setFooter({text : `${message.guild.name} | Setup Kurulum Sistemi`, iconURL : message.guild.iconURL({dynamic : true})})
    .setDescription(` 
> **Rol Kurulum Menüsü**
\`\`\`fix
.kur tag \`<Örnek: • >\`
.kur ikinciTag \`<Örnek: • >\`
.kur url \`<Örnek: Chavo >\`
.kur unregRoles <Örnek: @Kayıtsız >
.kur manRoles <Örnek: @Erkek1 @Erkek2 >
.kur womanRoles <Örnek: @Kadın1 @Kadın2 >
.kur boosterRole <Örnek: @Booster Rol >
.kur teyitciRolleri <Örnek: @teyitciRolleri >
.kur sahipRoles <Örnek: @Owner @Ceo >
.kur katıldı <Örnek: @Katıldı >(Toplantı)
.kur jailRole <Örnek: @Karantina>
.kur yasaklıRole <Örnek: @Yasaklı Tag>
.kur chatMute <Örnek: @Muted >
.kur voiceMute <Örnek: @V.Muted >
.kur fakeAccRole <Örnek: @Şüpheli >
.kur warnHammer <Örnek: @Warn Hammer >
.kur banHammer <Örnek: @Ban Hammer >
.kur jailHammer <Örnek: @Jail Hammer >
.kur cmuteHammer <Örnek: @Mute Hammer >
.kur vmuteHammer <Örnek: @V.Mute Hammer >
\`\`\`
> **Kanal Kurulum Menüsü**
\`\`\`fix
.kur chatChannel <Örnek: #chat >
.kur privwelcome <Örnek: #privwelcome >
.kur kayıtwelcome <Örnek: #kayıtwelcome >
.kur banLogChannel <Örnek: #ban-log >
.kur jailLogChannel <Örnek: #jail-log >
.kur cmuteLogChannel <Örnek: #mute-bilgi >
.kur vmuteLogChannel <Örnek: #ses-mute-bilgi >
.kur cezapuanlog <Örnek: #ceza-puan-bilgi >
\`\`\`

`)

message.reply({ embeds: [rol1] })
}


    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////
    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////
    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////
    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////    /////

if (interaction.values[0] === "help2") {
// Yardımcı fonksiyonlar
function formatRoles(roller) {
  return Array.isArray(roller) && roller.length > 0
    ? roller.map(x => `<@&${x}>`).join(", ")
    : "`YOK`";
}

function formatSingleRole(rol) {
  return rol ? `<@&${rol}>` : "`YOK`";
}

function formatChannel(channelID) {
  return channelID ? `<#${channelID}>` : "`YOK`";
}

function formatUsers(users) {
  return Array.isArray(users) && users.length > 0
    ? users.map(x => `<@${x}>`).join(", ")
    : "`YOK`";
}

const veri1 = new EmbedBuilder()
  .setAuthor({
    name: message.guild.name,
    iconURL: message.guild.iconURL({ dynamic: true, size: 2048 }),
  })
  .setFooter({
    text: `${message.guild.name} | Kontrol Menüsü Sistemi`,
    iconURL: message.guild.iconURL({ dynamic: true }),
  })
  .setDescription(`
> **Kontrol Menüsü**
Bot-Owner: (${formatUsers(allah.owners)})
Link: (${ayar.serverUrl || "YOK"})
Tag: (\`${ayar.tag || "YOK"}\`) / (\`${ayar.ikinciTag || "YOK"}\`)
Man Roles: (${formatRoles(ayar.erkekRolleri)})
Woman Roles: (${formatRoles(ayar.kizRolleri)})
Unregister Role: (${formatRoles(ayar.unregRoles)})
Booster Role: (${formatSingleRole(ayar.boosterRolu)})
Kayıt Yetkili Roles: (${formatRoles(ayar.teyitciRolleri)})
Sahip Roles: (${formatRoles(ayar.sahipRolu)})
Toplantı Katıldı Role: (${formatSingleRole(ayar.Katıldı)})
Jail Role: (${formatRoles(ayar.jailRole)})
Yasaklı Tag Role: (${formatRoles(ayar.yasaklıRole)})
Chat Mute Role: (${formatRoles(ayar.chatMute)})
Voice Mute Role: (${formatRoles(ayar.voiceMute)})
Fake Account Role: (${formatRoles(ayar.fakeAccRole)})
Ban Hammer Role: (${formatRoles(ayar.banHammer)})
Jail Hammer Role: (${formatRoles(ayar.jailHammer)})
CMute Hammer Role: (${formatRoles(ayar.cmuteHammer)})
VMute Hammer Role: (${formatRoles(ayar.vmuteHammer)})
Chat Channel: (${formatChannel(ayar.chatChannel)})
Kayıt Sistemi Channel: (${formatChannel(ayar.kayıtwelcome)})
Priv Welcome Channel: (${formatChannel(ayar.privwelcome)})
Ban Log Channel: (${formatChannel(ayar.banLogChannel)})
Jail Log Channel: (${formatChannel(ayar.jailLogChannel)})
CMute Log Channel: (${formatChannel(ayar.cmuteLogChannel)})
VMute Log Channel: (${formatChannel(ayar.vmuteLogChannel)})
Ceza-Puan Log Channel: (${formatChannel(ayar.cezapuanlog)})
`);

message.reply({ embeds: [veri1] });



    })
    
    /////
    /////
    const setup1 = [
      { name: ["tag"], conf: "tag", cmdName: "Tag" },
      { name: ["secondarytag", "secondary-tag", "ikincitag", "ikinciTag"], conf: "ikinciTag", cmdName: "İkinci Tag" },
      { name: ["link", "url"], conf: "serverUrl", cmdName: "Url" },
          ]
          
    const setup2 = [
{ name: ["erkekrol","manrole","manRoles","manroles"], conf: "erkekRolleri", cmdName: "Erkek Rol(leri)" },
{ name: ["kadınrol","womanrole","womanRoles","womanroles"], conf: "kizRolleri", cmdName: "Kız Rol(leri)" },
{ name: ["kayıtsızrol","unregisterrole","unregisterRole","unregRoles"], conf: "unregRoles", cmdName: "Kayıtsız Rol(leri)" },
{ name: ["teyitciRolleri","teyitciRolleri","teyitciRolleri","teyitciRolleri","teyitciRolleri"], conf: "teyitciRolleri", cmdName: "Teyitci Yetkili Rol(leri)" },
{ name: ["sahiprol","sahiprole","sahipRole","sahipRoles"], conf: "sahipRolu", cmdName: "Sahip Rol(leri)" },
{ name: ["banHammer","banhammer","banh"], conf: "banHammer", cmdName: "Ban Hammer" },
{ name: ["jailHammer","jailhammer","jailh"], conf: "jailHammer", cmdName: "Jail Hammer" },
{ name: ["cmutehammer","cmuteHammer","cmh"], conf: "cmuteHammer", cmdName: "Chat-Mute Hammer" },
{ name: ["vmutehammer","vmuteHammer","vmh"], conf: "vmuteHammer", cmdName: "Voice-Mute Hammer" },
{ name: ["jail","jailRole","jailRole","jailRoles"], conf: "jailRole", cmdName: "Jail Rol" },
{ name: ["yasaklı","yasaklıRole","yasaklıRole","yasaklıRoles"], conf: "yasaklıRole", cmdName: "Yasaklı Tag Rol" },
{ name: ["chatMute","chatmute","chatMuteRole","chatmterole"], conf: "chatMute", cmdName: "Chat-Mute Rol" },
{ name: ["voiceMute","voicemute","voicemuteRole","voicemuterole"], conf: "voiceMute", cmdName: "Voice-Mute Rol" },
{ name: ["fakeAcc","fakeaccrole","fakeAccRole","fakeAccRoles"], conf: "fakeAccRole", cmdName: "Yeni Hesap Rol" },
{ name: ["rolverici","rolvericirole","rolvericiRole","rolvericiRoles"], conf: "rolverici", cmdName: "Rol Yönetici Rol" },
    ]
    
    const setup3 = [
{ name: ["boosterrol","boosterrole","boosterRole","boosterRoles"], conf: "boosterRolu", cmdName: "Booster Rol" },
{ name: ["katıldırol","katıldırole","katıldıRole","katıldı"], conf: "Katıldı", cmdName: "Katıldı Rol" },
{ name: ["serverUrl","serverUrl","serverUrl","serverUrl"], conf: "serverUrl", cmdName: "Sunucu URL" },
    ]
    
    const setup4 = [
{ name: ["chat","genelchat","chatChannel","chatchannel"], conf: "chatChannel", cmdName: "Chat Kanal" },
{ name: ["privwelcome","privwelcomechat","privwelcomeChannel","privwelcomechannel"], conf: "privwelcomeChannel", cmdName: "Priv Welcome Kanal" },
{ name: ["kayıtwelcome","kayıtwelcome","kayıtwelcomeChannel","kayıtwelcomechannel"], conf: "kayıtwelcomeChannel", cmdName: "Kayıt Sistemi Kanal" },
{ name: ["bankanal","banlog","banLogChannel","banlogchannel"], conf: "banLogChannel", cmdName: "Ban Log Kanal" },
{ name: ["jailkanal","jaillog","jailLogChannel","jaillogchannel"], conf: "jailLogChannel", cmdName: "Jail Log Kanal" },
{ name: ["cmutekanal","cmutelog","cmuteLogChannel","cmutelogchannel"], conf: "cmuteLogChannel", cmdName: "Chat-Mute Log Kanal" },
{ name: ["vmutekanal","vmutelog","vmuteLogChannel","vmutelogchannel"], conf: "vmuteLogChannel", cmdName: "Voice-Mute Log Kanal" },
{ name: ["cezapuankanal","cezapuanlog","cezapuanLogChannel","cezapuanlogchannel"], conf: "cezapuanlog", cmdName: "Ceza Puan Log Kanal" },
    ]
    
     

        setup1.forEach(async (x) => {
if(x.name.some(x => x === choose)) {
let select = args[1];
if (!select) {
message.reply({ content: `Sunucu **${x.cmdName}** belirtmelisin`, ephemeral: true });
return }
global.westinasetupxd.set(`${x.conf}`, `${select}`)
message.reply({ content: `**${select}** ${x.cmdName} listesine başarıyla eklendi.`, ephemeral: true })
    };
    });
    

    setup2.forEach(async (x) => {
    if(x.name.some(x => x === choose)) {
    const selectMenu = new ActionRowBuilder()
    .addComponents([
new RoleSelectMenuBuilder()
.setCustomId("test")
.setMaxValues(10)
    ]);
    
    let msg = await message.channel.send({ content: `Aşağıdaki menüden kurmak istediğiniz **${x.cmdName}** seçiniz.`, components: [selectMenu] })
    
    const filter = i => i.user.id == message.author.id    
    let xxx = await msg.createMessageComponentCollector({ filter, componentType: ComponentType.RoleSelect, max: 1 })
    
    xxx.on("collect", async (interaction) => {
const rol = interaction.values;
if(interaction.customId === "test") {
await interaction.deferUpdate();
if(rol) {
let xd = []
rol.map(x => 
xd.push(`${x}`)
)
global.westinasetupxd.set(`${x.conf}`, xd)
msg.edit({ content: `**${x.cmdName}** olarak ${rol.map(x => `<@&${x}>`)} başarıyla eklendi.` , components: [] });
}
}
    })
    };
    });
    
    setup3.forEach(async (x) => {
    if(x.name.some(x => x === choose)) {
    const selectMenu = new ActionRowBuilder()
    .addComponents([
new RoleSelectMenuBuilder()
.setCustomId("test2")
.setMaxValues(1)
    ]);
    
    let msg = await message.channel.send({ content: `Aşağıdaki menüden kurmak istediğiniz **${x.cmdName}** seçiniz.`, components: [selectMenu] })
    
    const filter = i => i.user.id == message.author.id    
    let xxx = await msg.createMessageComponentCollector({ filter, componentType: ComponentType.RoleSelect, max: 1 })
    
    xxx.on("collect", async (interaction) => {
const rol = interaction.values[0];
if(interaction.customId === "test2") {
await interaction.deferUpdate();
if(rol) {
global.westinasetupxd.set(`${x.conf}`, `${rol}`)
msg.edit({ content: `**${x.cmdName}** olarak <@&${rol}> başarıyla eklendi.` , components: [] });
}
}
    })
    };
    }); 
    
    setup4.forEach(async (x) => {
if(x.name.some(x => x === choose)) {
const selectMenu = new ActionRowBuilder()
.addComponents([
new ChannelSelectMenuBuilder()
.setCustomId("test3")
.addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement)
.setMaxValues(1)
]);

let msg = await message.channel.send({ content: `Aşağıdaki menüden kurmak istediğiniz **${x.cmdName}** seçiniz.`, components: [selectMenu] })

const filter = i => i.user.id == message.author.id    
let xxx = await msg.createMessageComponentCollector({ filter, componentType: ComponentType.ChannelSelect, max: 1 })

xxx.on("collect", async (interaction) => {
const channel = interaction.values[0];
if(interaction.customId === "test3") {
  await interaction.deferUpdate();
  if(channel) {
  global.westinasetupxd.set(`${x.conf}`, `${channel}`)
  msg.edit({ content: `**${x.cmdName}** olarak <#${channel}> başarıyla eklendi.` , components: [] });
}
}
})
};
    }); 

    

}
}
