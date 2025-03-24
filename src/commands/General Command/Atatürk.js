const { AttachmentBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: "atatürk",
    aliases: [],
   run: async execute(client, message, args) {
        try {
            const imagesPath = path.join(__dirname, '../images');
            const images = fs.readdirSync(imagesPath).filter(file => file.endsWith('.jpg') || file.endsWith('.png'));
            
            if (images.length === 0) {
                return message.channel.send('Görsel bulunamadı. Lütfen src/images klasörünü kontrol edin.');
            }
            
            const randomImage = images[Math.floor(Math.random() * images.length)];
            const imagePath = path.join(imagesPath, randomImage);
            const attachment = new AttachmentBuilder(imagePath);
            
            const embed = new EmbedBuilder()
                .setColor('Red')
                .setImage(`attachment://${randomImage}`)
                .setFooter({ text: "1881 - ∞" });
            
            await message.channel.send({ embeds: [embed], files: [attachment] });
        } catch (error) {
            console.error(error);
            await message.channel.send('Bir hata oluştu, lütfen daha sonra tekrar deneyin.');
        }
    }
};
