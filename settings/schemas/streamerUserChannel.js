const mongoose = require('mongoose');

const streamerUserChannelSchema = new mongoose.Schema({
  guildID: { type: String, required: true },
  userID: { type: String, required: true },
  channelID: { type: String, required: true },  // channelID burada tanımlanmalı
  channelData: { type: Number, default: 0 },
  // Diğer alanlar burada
});

const streamerUserChannel = mongoose.model('StreamerUserChannel', streamerUserChannelSchema);