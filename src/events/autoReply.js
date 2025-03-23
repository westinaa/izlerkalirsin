const conf = require("../../settings/configs/sunucuayar.json")
const { as, green } = require("../../settings/configs/emojis.json")

module.exports = async (message) => {
  if (message.content.toLowerCase() === "sa" || message.content.toLowerCase() === "SA" || message.content.toLowerCase() === "Sa") {
    message.react(`${as}`);
    //message.reply({ content: `Aleyküm selam, hoş geldin!`});
  }
};
module.exports.conf = {
  name: "messageCreate"
};