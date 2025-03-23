
const { ActionRowBuilder, ChannelSelectMenuBuilder, ChannelType, PermissionsBitField } = require("discord.js");
const { red, green } = require("../../../settings/configs/emojis.json")

module.exports = {
  conf: {
    aliases: ["lock","menülock"],
    name: "lock",
    help: "lock",
    category: "yönetim",
  },

  run: async (client, message, args, embed) => {
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) 
      return message.reply({ embeds: [embed.setDescription(`Yetkiniz kanal kilitlemeye yetmiyor.`).setColor("#ffffff")] })
             .then((e) => setTimeout(() => { e.delete(); }, 5000));

    const menu = new ActionRowBuilder().addComponents(
      new ChannelSelectMenuBuilder()
        .setCustomId('move-members')
        .setMaxValues(1)
        .setPlaceholder('Kilitlemek istediğin kanalı seç!')
        .addChannelTypes(ChannelType.GuildText)
    );
    
    await message.channel.send({ components: [menu], content: `Lütfen aşağıdan kilitlemek istediğin kanalı seç.`});

    client.on('interactionCreate', async interaction => {
      if (interaction.customId === 'move-members') {
        let channelToLock = interaction.values[0];
        let targetChannel = interaction.guild.channels.cache.get(channelToLock);

        if (!targetChannel) return interaction.reply({ content: `${red} Kanal bulunamadı.`, ephemeral: true });

        // Kanalın kilidini kontrol et
        if (targetChannel.permissionsFor(interaction.guild.roles.everyone).has(PermissionsBitField.Flags.SendMessages)) {
          await targetChannel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
            SendMessages: false
          });
          interaction.reply({ content: `${green} Seçilen kanal başarıyla kilitlendi.`, ephemeral: true }).catch(error => console.error(`İşlem yanıtlanamadı: ${error}`));
        } else {
          await targetChannel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
            SendMessages: true
          });
          interaction.reply({ content: 'Seçilen kanalın başarıyla kilidi açıldı.', ephemeral: true }).catch(error => console.error(`İşlem yanıtlanamadı: ${error}`));
        }
      }
    });
  }
};
