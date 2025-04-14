
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, TextInputBuilder, TextInputStyle, StringSelectMenuBuilder, PermissionsBitField, ChannelType, SelectMenuBuilder, Component } = require('discord.js');
const client = global.bot;
const { Hello } = require("../../settings/configs/emojis.json")
const conf = require("../../settings/configs/sunucuayar.json");

module.exports = {
  name: "privwelcome"
};

client.on('guildMemberAdd', async (member) => {

let uye = client.users.cache.get(member.id)
let chatchannel = client.channels.cache.get("1359992316906963086")
let buton1 = new ButtonBuilder()
.setCustomId(`selam`)
.setLabel(`Selam Ver!`)
.setStyle(ButtonStyle.Secondary)
.setEmoji(Hello)
let row = new ActionRowBuilder().addComponents(
    buton1
)

/*chatchannel.send({content: `**<@${member.id}> ARAMIZA KATILDI, SELAM VERMEYİ UNUTMAYIN!**`, components: [row]}); //.then((e) => setTimeout(() => { e.delete(); }, 5000));
const usedButtons = new Set();
const collector = chatchannel.createMessageComponentCollector({})
collector.on('collect', async (interaction) => {
    if(interaction.customId === "selam"){
      if(usedButtons.has(interaction.user.id)){
        interaction.reply({content: `Selam vermek için 5 saniye beklemelisin.`, ephemeral: true}).then((e) => setTimeout(() => { e.delete(); }, 5000));
      } else {
        interaction.reply(`**<@${uye.id}>, <@${interaction.user.id}> sana selam verdi!**`).then((e) => setTimeout(() => { e.delete(); }, 5000));
        usedButtons.add(interaction.user.id);
        setTimeout(() => {
          usedButtons.delete(interaction.user.id);
      }, 5000);
      }
      }
  })*/
});