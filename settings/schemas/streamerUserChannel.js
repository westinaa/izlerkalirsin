const mongoose = require('mongoose');

const streamerUserChannelSchema = new mongoose.Schema({
    guildID: { type: String, required: true },
    userID: { type: String, required: true },
    ChannelID: { type: String, required: true }, // Buraya ekliyoruz
    ChannelData: { type: Number, default: 0 }
});

const StreamerUserChannel = mongoose.model('StreamerUserChannel', streamerUserChannelSchema);

module.exports = StreamerUserChannel;