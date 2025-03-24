const { AttachmentBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const conf = require("../../../settings/configs/sunucuayar.json");
const ayar = require("../../../settings/configs/ayarName.json");

module.exports = {
    conf: {
        aliases: ["ata", "ataturk"],
        name: "atatürk",
        help: "atatürk",
        category: "genel",
    },
    run: async (client, message, args) => {
        try {
            await message.delete();
            
            const imagesPath = path.join(__dirname, '../../images');
            const images = fs.readdirSync(imagesPath).filter(file => file.endsWith('.jpg') || file.endsWith('.png'));
            
            if (images.length === 0) {
                return message.channel.send('Görsel bulunamadı. Lütfen src/images klasörünü kontrol edin.');
            }
            
            const randomImage = images[Math.floor(Math.random() * images.length)];
            const imagePath = path.join(imagesPath, randomImage);
            const attachment = new AttachmentBuilder(imagePath, { name: randomImage });
            
            const embed = new EmbedBuilder()
                .setColor('##ff0000')
                .setTitle('Ulu Önder Mustafa Kemal Atatürk')
                .setImage(`attachment://${attachment.name}`)
                .setFooter({ text: "1881 - ∞" });
            
            await message.channel.send({ embeds: [embed], files: [attachment] });
        } catch (error) {
            console.error(error);
            await message.channel.send('Bir hata oluştu, lütfen daha sonra tekrar deneyin.');
        }
    }
};
