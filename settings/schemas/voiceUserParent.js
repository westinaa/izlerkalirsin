const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: String,
  userID: String,
  channelID: String,
  parentID: String,
  parentData: { type: Number, default: 0 },
});

module.exports = model("voiceUserParent", schema);
