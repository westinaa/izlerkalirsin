const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: String,
  userID: String,
  channelID: String,
  topStat: { type: Number, default: 0 },
});

module.exports = model("streamerUser", schema);
