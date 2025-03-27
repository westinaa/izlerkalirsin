const { AttachmentBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const canvas = require('canvas');
const conf = require("../../../settings/configs/sunucuayar.json");
const ayar = require("../../../settings/configs/ayarName.json");

module.exports = {
    conf: {
        aliases: ["atam", "ataturk"],
        name: "atatürk",
        help: "atatürk",
        category: "genel",
    },
    run: async (client, message, args) => {
        try {
            // global.bot yerine client'i global.bot olarak kullanacağız.
            const bot = global.bot;  // global bot nesnesini burada kullanıyoruz

            await message.delete();

            const imagesPath = path.join(__dirname, '../../images');
            const images = fs.readdirSync(imagesPath).filter(file => file.endsWith('.jpg') || file.endsWith('.png'));

            if (images.length === 0) {
                return message.channel.send('Görsel bulunamadı. Lütfen src/images klasörünü kontrol edin.');
            }

            const randomImage = images[Math.floor(Math.random() * images.length)];
            const imagePath = path.join(imagesPath, randomImage);
            const attachment = new AttachmentBuilder(imagePath, { name: randomImage });

            // Renk analizi
            const img = await canvas.loadImage(imagePath);
            const canvasObj = canvas.createCanvas(img.width, img.height);  // create canvas object
            const ctx = canvasObj.getContext('2d');  // get context after creating canvas object
            ctx.drawImage(img, 0, 0, img.width, img.height); // now draw the image

            const imageData = ctx.getImageData(0, 0, img.width, img.height);
            const pixels = imageData.data;

            let colorCount = {};

            // Renkleri sayıyoruz
            for (let i = 0; i < pixels.length; i += 4) {
                const r = pixels[i];
                const g = pixels[i + 1];
                const b = pixels[i + 2];

                const color = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

                if (colorCount[color]) {
                    colorCount[color]++;
                } else {
                    colorCount[color] = 1;
                }
            }

            // En fazla olan rengi buluyoruz
            const mostCommonColor = Object.keys(colorCount).reduce((a, b) => colorCount[a] > colorCount[b] ? a : b);

            const embed = new EmbedBuilder()
                .setColor(mostCommonColor) // Bulunan baskın rengi embed rengini yapıyoruz
                .setDescription(`> Ey Türk gençliği! Birinci vazifen; Türk istiklalini, Türk cumhuriyetini, ilelebet muhafaza ve müdafaa etmektir.
> 
>    Mevcudiyetinin ve istikbalinin yegâne temeli budur. Bu temel, senin en kıymetli hazinendir. İstikbalde dahi seni bu hazineden mahrum etmek isteyecek dâhilî ve haricî bedhahların olacaktır. Bir gün, istiklal ve cumhuriyeti müdafaa mecburiyetine düşersen, vazifeye atılmak için içinde bulunacağın vaziyetin imkân ve şeraitini düşünmeyeceksin. Bu imkân ve şerait, çok namüsait bir mahiyette tezahür edebilir. İstiklal ve cumhuriyetine kastedecek düşmanlar, bütün dünyada emsali görülmemiş bir galibiyetin mümessili olabilirler. Cebren ve hile ile aziz vatanın bütün kaleleri zapt edilmiş, bütün tersanelerine girilmiş, bütün orduları dağıtılmış ve memleketin her köşesi bilfiil işgal edilmiş olabilir. Bütün bu şeraitten daha elim ve daha vahim olmak üzere, memleketin dâhilinde iktidara sahip olanlar, gaflet ve dalalet ve hatta hıyanet içinde bulunabilirler. Hatta bu iktidar sahipleri, şahsi menfaatlerini müstevlilerin siyasi emelleriyle tevhit edebilirler. Millet, fakruzaruret içinde harap ve bitap düşmüş olabilir.
> 
>    Ey Türk istikbalinin evladı! İşte, bu ahval ve şerait içinde dahi vazifen, Türk istiklal ve cumhuriyetini kurtarmaktır. Muhtaç olduğun kudret, damarlarındaki asil kanda mevcuttur.`)
                //.setTitle('Ulu Önder Mustafa Kemal Atatürk')
                .setImage(`attachment://${attachment.name}`)
                .setFooter({ text: "1881 - ∞" });
            
            await message.channel.send({ embeds: [embed], files: [attachment] });
        } catch (error) {
            console.error(error);
            await message.channel.send('Bir hata oluştu, lütfen daha sonra tekrar deneyin.');
        }
    }
};
