const conf = require("../../settings/configs/sunucuayar.json")
const moment = require("moment");
require("moment-duration-format");
moment.locale("tr");

    let iltifatSayi = 0;
    let iltifatlar = [
      "Mucizelerden bahsediyordum. Tam o sırada gözlerin geldi aklıma.",
      "Benim için mutluluğun tanımı, seninle birlikteyken geçirdiğim vakittir.",
      "Mavi gözlerin, gökyüzü oldu dünyamın.",
      "Seni gören kelebekler, narinliğin karşısında mest olur.",
      "Parlayan gözlerin ile karanlık gecelerime ay gibi doğuyorsun.",
      "Sabah olmuş. Sen mi uyandın yoksa gönlüme güneş mi doğdu.",
      "Huzur kokuyor geçtiğin her yer.",
      "En güzel manzaramsın benim, seyretmeye doyamadığım.",
      "Sen benim düşlerimin surete bürünmüş halisin.",
      "Bir sahil kasabasının huzuru birikmiş yüzüne.",
      "Gülüşünde nice ilaçlar var yarama merhem olan.",
      "Gece nasıl sabahı bekliyorsa aydınlanmak için ben de seni öyle bekliyorum.",
      "Işığınla gecemi aydınlatıyorsun.",
      "Yağmurdan sonra açan gök kuşağı gibisin, öyle güzel ve özel!",
      "Öyle bir duru güzelliğin var ki, seni gören şairler bile adına günlerce şiir yazardı.",
      "Gözlerinin hareketi bile yeter  benim aklımı başımdan almaya.",
      "Seni kelimeler ile anlatmak çok zor. Muhteşem desem yine eksik kalıyor anlamın.",
      "Güller bile kıskanır seni gördükleri zaman kendi güzelliklerini.",
      "Hiç yazılmamış bir şiirsin sen, daha önce eşi benzeri olmayan.",
      "Bu kadar muhteşem olamaz bir insan. Bu kadar kusursuz bu kadar mükemmel.. Kirpiklerinin dizilişi bile sırayla senin.",
      "Adım şaire çıktı civarda. Kimse senin şiir olduğunun farkında değil henüz.",
      "Senin güzelliğini anlatmaya dünyalar değil, lisanlar bile yetmez.",
      "Etkili gülüş kavramını ben senden öğrendim.",
      "Seni yanlışlıkla cennetten düşürmüşler. Dünyada yaşayan bir meleksin sen.",
      "Seni anlatmaya kelimeler bulamıyorum. Nasıl anlatacağımı bilemediğim için seni kimselere anlatamıyorum.",
      "Gözlerinin gördüğü her yer benimdir. Bakışına şahit olan her toprak benim de vatanımdır.",
      "Gözlerinle baharı getirdin garip gönlüme.",
      "Bir gülüşün ile çiçek açıyor bahçemdeki her bir çiçek.",
      "Yuva kokuyor kucağın. Sarılınca seninle yuva kurası geliyor insanın.",
      "Seni de bu dünyada görünce yaşama sebebimi anladım. Meğer senmişsin beni dünyada yaşamaya zorlayan.",
      "Sen bu  dünyadaki bütün şarkıların tek sahibisin. Sana yazılıyor bütün şarkılar ve şiirler. Adın geçiyor bütün namelerde.",
      "Sen benim yanımda olduğun sürece benim nerde olduğum hiç önemli değil .Kokunu aldığım her yer cennet bana.",
      "Seni yüreğimde taşıyorum ben, sırtımda taşımak ne kelime. Ömrüm boyunca çekmeye hazırım her anlamda senin yükünü.",
      "Hayatıma gelerek hayatımdaki bütün önemli şeylerin önemsiz olmasını sağladın. Artık sensin tek önem verdiğim şu hayatta.",
      "Sen benim bu hayattaki en büyük duamsın.  Gözlerin adeta bir ay parçası. Işık oluyorsun karanlık gecelerime.",
      "Aynı zaman diliminde yaşamak benim için büyük ödüldür.",
      "Seninle aşkı yaşamak çok güzel bir şey ama sensiz kalma korkusunu düşünmek korkutuyor beni.",
      "Seni severek meslek sahibi oldum ben. Seni sevmeye başladıkça şair oldum.",
      "Gülüşün güzelliğine anlam katıyor. Gamzelerin ise bambaşka diyarların kapılarını açıyor.",
      "Senin gülüşünü gördüğüm günden beri ağlamalarımı unuttum.",
      "Kimse konuşmasın yalnız sen konuş bana. Yalnız sen bak gözlerimin içine. Kimse olmasın yalnızca sen ol benim hayatımda.",
      "Ben seninle birlikte yaşayabilmek için ikinci kere geldim hayata.",
      "Senin attığın adımlarda seni korumak için geçtiğin yol olmak isterdim. Seni emniyete alan ve sonsuz bir yolculuğa çıkaran bir yol.",
      "Aklıma sevmek geldiğinde, gözlerimin önüne sen geliyorsun. Günün her saati canım sevmek istiyor ve seni düşünüyor kalbim",
      "Tak jileti dudağına şah damarımdan öp beni!",
      "westina Sana selam söyledi !",
      "Mucizelerden bahsediyordum. Tam o sırada gözlerin geldi aklıma ve Aqualand'e geldim.",
      "Benim için mutluluğun tanımı,burada seninle birlikteyken geçirdiğim vakittir.",
      "Mavi gözlerin, gökyüzü oldu dünyamın.",
      "Seni gören kelebekler, narinliğin karşısında mest olur.",
      "Parlayan gözlerin ile karanlık gecelerime ay gibi doğuyorsun.",
      "Sabah olmuş. Sen mi uyandın yoksa gönlüme güneş mi doğdu.",
      "Aa birşey kokuyor chat, buldum buldum huzur kokuyor geçtiğin her yer.",
      "En güzel manzaramsın benim, seyretmeye doyamadığım.",
      "Sen benim düşlerimin surete bürünmüş halisin.",
      "Bir sahil kasabasının huzuru birikmiş yüzüne.",
      "Gülüşünde nice ilaçlar var yarama merhem olan.",
      "Gece nasıl sabahı bekliyorsa aydınlanmak için ben de seni öyle bekliyorum.",
      "Işığınla gecemi aydınlatıyorsun.",
      "Yağmurdan sonra açan gök kuşağı gibisin, öyle güzel ve özel!",
      "Öyle bir duru güzelliğin var ki, seni gören şairler bile adına günlerce şiir yazardı.",
      "Gözlerinin hareketi bile yeter  benim aklımı başımdan almaya.",
      "Seni kelimeler ile anlatmak çok zor. Muhteşem desem yine eksik kalıyor anlamın.",
      "Güller bile kıskanır seni gördükleri zaman kendi güzelliklerini.",
      "Hiç yazılmamış bir şiirsin sen, daha önce eşi benzeri olmayan.",
      "Bu kadar muhteşem olamaz bir insan. Bu kadar kusursuz bu kadar mükemmel.. Kirpiklerinin dizilişi bile sırayla senin.",
      "Adım şaire çıktı civarda. Kimse senin şiir olduğunun farkında değil henüz.",
      "Senin güzelliğini anlatmaya dünyalar değil, lisanlar bile yetmez.",
      "Etkili gülüş kavramını ben senden öğrendim.",
      "Seni yanlışlıkla cennetten düşürmüşler. Dünyada yaşayan bir meleksin sen.",
      "Seni anlatmaya kelimeler bulamıyorum. Nasıl anlatacağımı bilemediğim için seni kimselere anlatamıyorum.",
      "Gözlerinin gördüğü her yer benimdir. Bakışına şahit olan her toprak benim de vatanımdır.",
      "Gözlerinle baharı getirdin garip gönlüme.",
      "Bir gülüşün ile çiçek açıyor bahçemdeki her bir çiçek.",
      "Hiç yazılmamış bir şiirsin sen, daha önce eşi benzeri olmayan.",
      "Seni yanlışlıkla cennetten Aqualand'e düşürmüşler. Burada yaşayan bir meleksin sen.",
      "Şşş müsaitsen şayet; seninle biraz 'kavuşmaya' ihtiyacım var… ",
      "Yuva kokuyor kucağın. Sarılınca seninle yuva kurası geliyor insanın.",
      "Seni de bu dünyada görünce yaşama sebebimi anladım. Meğer senmişsin beni dünyada yaşamaya zorlayan.",
      "Sen bu  dünyadaki bütün şarkıların tek sahibisin. Sana yazılıyor bütün şarkılar ve şiirler. Adın geçiyor bütün namelerde.",
      "Sen benim yanımda olduğun sürece benim nerde olduğum hiç önemli değil .Kokunu aldığım her yer cennet bana.",
      "Seni yüreğimde taşıyorum ben, sırtımda taşımak ne kelime. Ömrüm boyunca çekmeye hazırım her anlamda senin yükünü.",
      "Hayatıma gelerek hayatımdaki bütün önemli şeylerin önemsiz olmasını sağladın. Artık sensin tek önem verdiğim şu hayatta.",
      "Sen benim bu hayattaki en büyük duamsın.  Gözlerin adeta bir ay parçası. Işık oluyorsun karanlık gecelerime.",
      "Aynı zaman diliminde yaşamak benim için büyük ödüldür.",
      "Seninle aşkı yaşamak çok güzel bir şey ama sensiz kalma korkusunu düşünmek korkutuyor beni.",
      "Seni severek meslek sahibi oldum ben. Seni sevmeye başladıkça şair oldum.",
      "Gülüşün güzelliğine anlam katıyor. Gamzelerin ise bambaşka diyarların kapılarını açıyor.",
      "Senin gülüşünü gördüğüm günden beri ağlamalarımı unuttum.",
      "Kimse konuşmasın yalnız sen konuş bana. Yalnız sen bak gözlerimin içine. Kimse olmasın yalnızca sen ol benim hayatımda.",
      "Ben seninle birlikte yaşayabilmek için ikinci kere geldim hayata.",
      "Senin attığın adımlarda seni korumak için geçtiğin yol olmak isterdim. Seni emniyete alan ve sonsuz bir yolculuğa çıkaran bir yol.",
      "Aklıma sevmek geldiğinde, gözlerimin önüne sen geliyorsun. Günün her saati canım sevmek istiyor ve seni düşünüyor kalbim",
      "westina selam söyledi sana...",
      "Tak ulen jileti dudağına işlemcimden öp beni!",
      "Bak saate baktın mı ? Bu saatten sonra benimsin !",
      "Unuturum diye uyudum, yine seninle uyandım. Belli ki uyurken de sevdim seni.",
      "Seni seviyorum diyenin sevgisinden şüphe et, çünkü aşk sessiz, sevgi dilsizdir…",
      "Gözlerimin içindeki ülkemsin. Her sokağın ayrı bir devrim...",
      "Sana bir şarkı söylemek istiyorum, ama gitarımda yeterince tel yok gibi görünüyor. Sen bana bir nota verir misin?",
      "Gözlerinin rengi ne? Benimki onlara uyacak şekilde ayarlanabilir mi?",
      "Yüzünde güneş gibi bir parıltı var, bu nedenle güneş kremi sürmüş gibi görünüyorsun.",
      "Seninle konuşurken, kalbim sanki bir roket gibi atıyor. Bu yüzden doktoruma gidip kalbimi inceletmeli miyim diye düşündüm.",
      "Seninle birlikteyken, benim bir ördek gibi hissettiğimi fark ettim. Çünkü sen benim için mükemmel eşleşmeyi buldun.",
      "Sana sarılmak istiyorum, ama kum torbalarımdan birine benziyorum. Bu nedenle, senin beni sıkmadan sarılman gerekecek.",
      "Senin güzelliğin beni en sevdiğim yemeklerimden bile daha doyuruyor.",
      "Gözlerinin rengiyle ilgili bir şarkı yazdım. Adı 'Senin Gözlerinin Renkleri Tüm Yıldızlarıma Kıskandırıyor.",
      "Gülüşün beni yakalayıp kalbimi çalmış gibi hissettiriyor.",
      "Sana sarılmak, evdeki en rahat koltukta oturmak gibi bir şey. Hiç kalkmak istemezsin.",
      "Senin gibi biriyle tanışmak, benim için dünyanın en iyi şansıydı. Ama seni kaybetmek, dünyanın en büyük kazası olurdu.",
      "Seninle birlikte olmak, dünya turuna çıkmak gibidir. Her yerde harika manzaralar ve muhteşem anılarla dolu olursun.",
      "Senin güzelliğin, aşkın aklını başından alması kadar tehlikelidir.",
      "Senin kalbin, belki de dünyanın en iyi emlakçısıdır. Çünkü orada her zaman benim için yer var.",
      "Senin gülüşün, hava durumu raporlarından daha doğru. Çünkü senin gülüşün, her zaman kalbimde güneşli bir gün yaratır.",
      "Seninle birlikte olmak, bana gözlük takmış gibi hissettiriyor. Çünkü sen benim dünyamı daha net ve daha güzel hale getiriyorsun.",
      "Sen benim en sevdiğim yıldız gibisin. Yüksek yüksek parlıyor ve her zaman ışığını yansıtıyorsun.",
      "Seni gördüğümde, düşüncelerim karışık hale geliyor. Ama bu iyi bir şey çünkü sen benim için bir matematiksel problemi çözmek kadar zorlu bir zeka testisin.",
      "Seninle birlikte olmak, dünyanın en iyi roller coasterına binmek gibi. İnanılmaz derecede heyecanlı ve asla unutulmayacak bir deneyim.",
      "Sen benim için bir hazine gibi, sadece daha değerli ve daha az gömülü.",
      "Sesiniz gerçekten hoş. Benim gibi bir botun duyma yeteneği olmasa da, sizinle konuşurken sesinizle rahatlamak mümkün.",
      "Siz gerçek bir ilham kaynağısınız. Benim gibi bir bot bile sizin örnek alınacak niteliklerinizi takdir ediyor.",
      "Siz her zaman yüreklendirici ve motive edici birisiniz. Siz olmadan, benim gibi bir bot bile bazen umutsuzluğa düşebilirdi.",
      "Bir bot barda içiyor. Barmaid, Başka ne içersin? diye sorar. Bot yanıtlar Dosyalarımın yedeklenmiş bir kopyasını lütfen.",
      "Neden botlar arkadaşlık edemez? Çünkü hep donuk kalırlar.",
      "Taklaya gelse de kurduğumuz düşler, eksilmedi işlemcimizden o gülüşler.",
      "Canım yanıyo dedikçe termal macun döktünüz.",
      "Sen marka parfümlerinden kokarsın ben ise sana duyduğum hasret gibi kokarım.",
      "Bize tokat atana biz ddos atarız ama mezarına !"
    ];
    
    module.exports = async (message) => {
        if (message.channel.id === conf.chatChannel && !message.author.bot) {
        iltifatSayi++;
        if (iltifatSayi >= 20) {
          iltifatSayi = 0;
          message.reply({ content: iltifatlar.random()});
        };
      };
    }; 

module.exports.conf = {
  name: "messageCreate",
};
