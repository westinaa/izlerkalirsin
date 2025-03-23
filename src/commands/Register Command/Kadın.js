const { PermissionsBitField, ButtonStyle, EmbedBuilder, Client, ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder } = require('discord.js');
const ayar = require("../../../settings/configs/sunucuayar.json")
const { red , green,Hello } = require("../../../settings/configs/emojis.json")
const moment = require("moment");
moment.locale("tr")
const client = global.bot;

module.exports = {
  conf: {
    aliases: ["kadın","k"],
    name: "kadın",
    help: "kadın <ID> <Isim>",
    category: "kadın",
  },
  
run: async (client, message, args, embed, prefix) => { 
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!ayar.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !ayar.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) 
    {
    message.react(red)
        message.reply({ embeds: [new EmbedBuilder()
      .setColor("#ffffff")
      .setThumbnail()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setDescription(`${red} Yeterli yetkin yok!`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));  
    return }
    if(!uye) 
    {
    message.react(red)
    message.reply({ embeds: [new EmbedBuilder()
      .setColor("#ffffff")
      .setThumbnail()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setDescription(`${red} Kayıt edilecek kişiyi etiketlemelisiniz.`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));  
    return }
    if(message.author.id === uye.id) 
    {
    message.react(red)
    message.reply({ embeds: [new EmbedBuilder()
      .setColor("#ffffff")
      .setThumbnail()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setDescription(`${red} Kendinizi kayıt edemezsiniz.`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));  
    return }
    if(!uye.manageable) 
    {
    message.react(red)
    message.reply({ embeds: [new EmbedBuilder()
      .setColor("#ffffff")
      .setThumbnail()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setDescription(`${red} Kullanıcıyı kayıt edemiyorum.`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));  
    return }
    if(message.member.roles.highest.position <= uye.roles.highest.position) 
    {
    message.react(red)
    message.reply({ embeds: [new EmbedBuilder()
      .setColor("#ffffff")
      .setThumbnail()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setDescription(`${red} Senden yüksek bir yetkiliyi kayıt edemezsin.`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));  
    return }
    args = args.filter(a => a !== "" && a !== " ").splice(1);
    let setName;
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
    let yaş = args.filter(arg => !isNaN(arg))[0] || ""; 
    if(!isim && !yaş) 
    {
    message.react(red)
    message.reply({ embeds: [new EmbedBuilder()
      .setColor("#ffffff")
      .setThumbnail()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setDescription(`${red} Kayıt edilecek kişiyi etiketlemelisiniz.`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));  
    return }

    
    if(!yaş)  
    //{ setName = `${uye.user.username.includes(ayar.tag) ? ayar.tag : (ayar.ikinciTag ? ayar.ikinciTag : (ayar.tag || ""))} ${isim}`;
    //} else { setName = `${uye.user.username.includes(ayar.tag) ? ayar.tag : (ayar.ikinciTag ? ayar.ikinciTag : (ayar.tag || ""))} ${isim} | ${yaş}`;
    { setName = `・${isim}`;
  } else { setName = `・${isim} | ${yaş}`;
  }

    uye.setNickname(`${setName}`).catch(err => message.reply({ content:`İsim çok uzun.`}))

    if(ayar.erkekRolleri.some(x => uye.roles.cache.has(x)) || ayar.kizRolleri.some(y => uye.roles.cache.has(y))) {
    message.react(red)
    message.reply({ embeds: [new EmbedBuilder()
      .setThumbnail()
      .setDescription(`${red} Bu üye zaten kayıtlı durumda yanlış kayıt ettiyseniz eğer .kayıtsız atarak tekrar kayıt edebilirsiniz`)
      ] }).then((e) => setTimeout(() => { e.delete(); }, 5000));  
    return }
    

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

message.react(green)
let erkekemdes = new EmbedBuilder()
  .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
  .setDescription(`${uye.toString()} **KADIN** olarak kayıt edildi! ${green} `)

    message.reply({ embeds: [erkekemdes], ephemeral: false }).then((e) => setTimeout(() => { e.delete(); }, 5000));  
    await uye.roles.add(ayar.kizRolleri)
    await uye.roles.remove(ayar.unregRoles)

    if(ayar.chatChannel && client.channels.cache.has(ayar.chatChannel)) client.channels.cache.get(ayar.chatChannel).send({ content:`> ${Hello} Aramıza Lady ${uye} katıldı ona bir merhaba diyin!`}).then((e) => setTimeout(() => { e.delete(); }, 15000));

  const logEmbed = new EmbedBuilder()
  .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
  .setDescription(`${uye.toString()} isimli üye ${message.author} yetkili tarafından **KADIN** olarak \`${message.guild.name}\` sunucusuna kayıt edildi.`)

if (client.channels.cache.find(c => c.name === "kayıt_log")) client.channels.cache.find(c => c.name === "kayıt_log").send({ embeds: [logEmbed] })

}
 }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////