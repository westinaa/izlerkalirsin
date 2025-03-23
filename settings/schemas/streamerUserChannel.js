const { Schema, model } = require("mongoose");

const StreamerUserChannel = Schema({
    guildID: String,
    userID: String,
    channelID: String,
    channelData: Number,
});

module.exports = model("StreamerUserChannel", StreamerUserChannel);