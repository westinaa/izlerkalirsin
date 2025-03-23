const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, PermissionsBitField, ButtonBuilder, ButtonStyle } = require("discord.js");
const conf = require("../../../settings/configs/sunucuayar.json")
const emoji = require("../../../settings/configs/emojis.json")
const { green, red } = require("../../../settings/configs/emojis.json")
const allah = require("../../../config.js");
module.exports = {
  conf: {
    aliases: ["help", "y", "help","yardım"],
    name: "yardım",
  },
 
  run: async (client, message, args, embed, prefix) => {
    let kanallar = ["commands"];    
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    

    let butttonRow = new ActionRowBuilder()
    .addComponents(
         new ButtonBuilder()
        .setCustomId("westina")
        .setStyle(2)
        .setLabel(allah.GuildName)
        .setDisabled(true)
    )

let msg = await message.channel.send({ embeds: [embed.setThumbnail(message.author.avatarURL({dynamic: true, size: 2048})).setColor("#ff3030").setDescription(`
> **${message.guild.name}** Kullanılacak Komutlar Aşagıdan Bakarak Görebilirsiniz!

\`\`\`Kayıt Sistemi:\`\`\`
\`.e ID/Kişi\` **İsim Yaş veya İsim**
\`.k ID/Kişi\` **İsim Yaş veya İsim**
\`.kayıtsız ID/Kişi\` **Kişiyi kayıtsıza atar.**
\`.isim ID/Kişi\` **İsim Yaş veya İsim**
\`\`\`İstatistik sistemi\`\`\`
\`.stats\` **Etiketlenen kişinin verilerini gösterir**
\`.rolstat\` **Etiketlenen role sahip kullanıcıların istatistiklerini gösterir.**
\`.topstat\` **Sunucudaki toplam istatistikleri gösterir.**
\`\`\`User\`\`\`
\`.afk\` **Afk kalmanıza yarar.**
\`.avatar\`
\`.banner\`
\`.cihaz\` **Kişinin mobilde mi PCde mi olduğunu gösterir.**
\`.çek\` **Birini bulunduğun odaya çekmene yarar.**
\`.git\` **Birinin bulunduğu odaya gitmeye yarar.**
\`\`\`General\`\`\`
\`.kilit\` **Komutun kullanıldığı kanalı mesaj yazmaya kapatır/açar.**
\`.menülock\` **Menü ile kanal kilitlersin.**
\`.menütaşı\` **Menü ile kişi taşırsın.**
\`.rollog\` **Roldeki kişileri görürsün.**
\`.rolver\` **Kişilere rol vermeyi sağlar.**
\`.say\`
\`.seslog\` **Kullanıcının tüm ses logunu gösterir.**
\`.ship\`
\`.tweet\`
\`.sil\` **Girilen miktar kadar mesaj siler. (En fazla 100 adet)**
\`.sn\` **Son silinen mesajı gösterir.**
\`.svkontrol\` **Sunucu verilerini gösterir.**
\`.taşı\`
\`.toplantı\`
\`.yasaklıtag\`
\`.ysay\` **Aktif olup seste olmayan yetkili sayısını gösterir.**
\`.zengin\` **Boosterların nickini değiştirmesine yarar.**
\`\`\`Moderasyon\`\`\`
\`.banliste\` **Banlı kullanıcıların listesini gösterir**
\`.cezapuan\` **Kişinin ceza puanlarını/skorunu görürsün**
\`.cezasorgu <CezaID>\` **Kişinin belirli cezasının detaylarını görürsün**
\`.sicil\` **Kişinin siciline bakarsın**
\`.topceza\` **Toplu cezaları görürsün**
\`.ban\` 
\`.jail\` 
\`.yargı\` **Kalıcı BAN atarsın**
\`.karantina\` **Kalıcı Jail atarsın**
\`.mute\`
\`.punish\`
\`.reklam\` **Reklam kanıt fotosu göndererek cezalandırırsın**
\`.sesmute\` **Kişinin sesli kanallarda konuşmasını engellersin**
\`.timeout\` **Kişiye TimeOut atarsın**
\`.unban ID\` **ID'si girilen kullanıcının BANı kalkar**
\`.unbanall\` **#BANAFFI xd**
\`.unjail\` **Kişinin JAIL cezası kalkar**
\`.unmute\` **Kişinin MUTE cezası kalkar**
\`\`\`Bot Sahibi veya Owners\`\`\`
\`.setup\` **Botun ayarlarını yaparsın.**
\`.bots\` **DevPortal'a girmeden botun özelliklerini değiştirirsin.**
\`.emoji\` **Emoji yüklersin.**
\`.giriş\` **Giriş mesajı atar.**
\`.giveaway\` **Çekiliş başlatır.**
\`.reroll\` **Çekiliş kazananını tekrar çeker.**
\`.pl\` **Kullanıcı Menüsü mesajını gönderir.**
\`.kurulum\` **Botun loglarını, emojilerini ve rol seçim menüsünü kurar.**
\`.menü\` **Rol Seçim Menüsü'nü otomatik ayarlar.**
\`.özelkomut\` **Özel komut eklersin.**
\`.rolsüz\` **Rolü olmayan kişilere otorol olarak ayarlanan rolü verir.**

`)], components: [ butttonRow] })


}
} 
