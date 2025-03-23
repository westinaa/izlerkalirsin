const { Schema, model } = require("mongoose");

const channelDataSchema = new Schema({
    guildId: { type: String, required: true },
    userId: { type: String, required: true },
    date: { type: Number, required: true },
    channelData: { type: Array, default: [] }
});

module.exports = model("channelData", channelDataSchema);
