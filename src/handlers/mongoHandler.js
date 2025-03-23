const mongoose = require("mongoose");
const allah = require("../../config");
const ChannelData = require("../../settings/schemas/channelData"); // Şemayı dahil et

mongoose.set('strictQuery', true);
mongoose.connect(allah.mongoUrl);

mongoose.connection.on("connected", async () => {
  console.log("Database bağlantısı tamamlandı!");

  // Verileri almak için MongoDB'ye sorgu gönderiyoruz
/*  try {
    const data = await ChannelData.find(); // Veritabanından tüm channelData verilerini al

    if (data.length > 0) {
      console.log(" Veritabanındaki Veriler:");
      console.log(JSON.stringify(data, null, 2)); // Veriyi düzgün bir şekilde yazdır
    } else {
      console.log(" Veritabanında veri bulunamadı!");
    }
  } catch (error) {
    console.error(" Veritabanı sorgusu sırasında hata oluştu:", error);
  }*/
});

mongoose.connection.on("error", () => {
  console.error("[HATA] Database bağlantısı kurulamadı!");
});
