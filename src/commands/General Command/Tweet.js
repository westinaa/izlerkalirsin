const Discord = require("discord.js");
const Canvas = require("@napi-rs/canvas");
let zaman = new Map();
const emojis = require('../../../settings/configs/emojis.json')
const { green , red } = emojis
const moment = require('moment')
require('moment-duration-format')
const path = require('path');
moment.locale('tr')

module.exports = {
    conf: {
      aliases: ["tweet"],
      name: "tweet",
      help: "tweet [Text]",
     category: "User"     
    },

    run: async (client, message, args, embed, prefix) => {
      let kanallar = ["tweet", "bot-commands","westina_notebook"];
      if (!kanallar.some((x) => message.channel.name.toLowerCase().includes(x))) {
        return message.reply({content: `tweet kanallarında kullanabilirsiniz.`}).then(msg => msg.delete({ timeout: 15000 }));
      }

      const text = args.join(" ");
      if (!text) return message.reply("Bir tweet yazmalısınız.").then(msg => msg.delete({ timeout: 15000 }));

      // Metin uzunluğu kontrolü
      const yazı = text.length > 64 ? text.slice(0, 64) : text;
      
      const isim = message.member.displayName.length > 27 ? message.member.displayName.slice(0, 27) : message.member.displayName;
      const isimTag = message.member.user.tag.length > 34 ? message.member.user.tag.slice(0, 34) : message.member.user.tag;

      // Zaman kontrolü (15 dakika)
      if (zaman.get(message.author.id) >= 1) {
        return message.reply("<@"+message.member+"> Bu komutu 15 dakika'da bir kullanabilirsin.").then(msg => msg.delete({ timeout: 15000 }));
      }

      message.delete().catch(e => {});

      // Canvas oluşturma
      const canvas = Canvas.createCanvas(700, 250);
      const ctx = canvas.getContext("2d");
      const imagePath = path.resolve(__dirname, "../../../settings/Assets/tweet.jpg");

      try {
        // Resmi yükleyin
        let bg = await Canvas.loadImage(imagePath);
        ctx.drawImage(bg, 0, 0, 700, 250);

        // Kullanıcı avatarı
        const messageAuthor = await Canvas.loadImage(message.member.user.avatarURL({ format: "png" }) || "https://cdn.discordapp.com/attachments/1214834069976780811/1217046306313469982/Picsart_23-06-26_15-30-29-413_1.png");
        ctx.drawImage(messageAuthor, 25, 25, 75, 75);

        // Yazıları yazma
        ctx.font = '34px "Candara"';
        ctx.fillStyle = '#09090a';
        ctx.fillText(isim, canvas.width / 6, canvas.height / 5);

        ctx.font = '16px "Candara"';
        ctx.fillStyle = '#09090a';
        ctx.fillText(isimTag, canvas.width / 6, canvas.height / 3.25);

        ctx.font = '25px "Candara"';
        ctx.fillStyle = '#09090a';
        ctx.fillText(yazı, canvas.width / 25, canvas.height / 1.75);

        ctx.font = '20px "Candara"';
        ctx.fillStyle = '#09090a';
        ctx.fillText(message.guild.name, canvas.width / 1.20, canvas.height / 1.25);

        // Sunucu ikonu
        const messageGuild = await Canvas.loadImage(message.guild.iconURL({ format: "png" }) || "https://cdn.discordapp.com/avatars/1352235697251291137/13d6a9f02b955f9f18ff5dcb0e6b4bc9.webp?size=4096");
        ctx.drawImage(messageGuild, 540, 180, 25, 25);

        // Tarih
        ctx.font = '16px "Candara"';
        ctx.fillStyle = '#09090a';
        ctx.fillText(moment().format("LLL"), canvas.width / 1.23, canvas.height / 1.05);

        // Resmi gönderme
        let attachment = new Discord.AttachmentBuilder(await canvas.encode('png'), {name: "tweet.jpg"});
        message.channel.send({files: [attachment]});
      } catch (error) {
        console.error("Resim yükleme hatası: ", error);
        message.reply("Resim yüklenirken bir hata oluştu. Lütfen tekrar deneyin.").then(msg => msg.delete({ timeout: 15000 }));
      }

      // Zaman kısıtlaması
      if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) {   
        zaman.set(message.author.id, (zaman.get(message.author.id) || 1));
        setTimeout(() => {
          zaman.delete(message.author.id);
        }, 1000 * 60 * 15); // 15 dakika
      }
    }
};
