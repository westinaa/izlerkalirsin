const { Schema, model } = require("mongoose");

const voiceStatsSchema = new mongoose.Schema({
  guildID: String,
  userID: String,
  channelID: String,
  topStat: { type: Number, default: 0 },
  dailyStat: { type: Number, default: 0 },
  weeklyStat: { type: Number, default: 0 },
  twoWeeklyStat: { type: Number, default: 0 }
});

module.exports = model("voiceStats", schema);