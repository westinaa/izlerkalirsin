const isimler = require("../../settings/schemas/names");
const moment = require("moment");
require("moment-duration-format");
moment.locale("tr");

const { AuditLogEvent, EmbedBuilder } = require("discord.js");

module.exports = async (oldMember, newMember) => {
    if (oldMember.nickname === newMember.nickname) return;

    const entry = await newMember.guild
        .fetchAuditLogs({ limit: 1, type: AuditLogEvent.MemberUpdate })
        .then((audit) => audit.entries.first());

    if (!entry || Date.now() - entry.createdTimestamp > 5000) return;

    const executor = entry.executor;
    const member = entry.target;

    if (executor?.bot) return;

    const westina = new EmbedBuilder()
        .setColor("#ff8c00")
        .setAuthor({ 
            name: `${newMember.guild.name}`, 
            iconURL: newMember.guild.iconURL({ dynamic: true }) || undefined 
        })
        .setTitle(`Bir Kullanıcının Kullanıcı Adı Değiştirildi.`)
        .setThumbnail(member?.displayAvatarURL({ dynamic: true, size: 2048 }) || null)
        .setDescription(`
        ${executor} ${member ? member : "Bilinmeyen Kullanıcı"} adlı kullanıcının adını değiştirdi.
        
        İsim Değişikliği: \` ${oldMember.nickname || oldMember.user.username} \` => **${newMember.nickname || newMember.user.username}**
        Değiştiren Yetkili: \` ${executor?.tag || "Bilinmeyen Yetkili"} \` - \` ${executor?.id || "Bilinmeyen ID"} \`
        Değiştirme Tarihi: <t:${Math.floor(Date.now() / 1000)}:R>
        `);

    const logChannel = newMember.guild.channels.cache.find((c) => c.name === "name_log");
    if (logChannel) logChannel.send({ embeds: [westina] });

    const registerData = await isimler.findOne({ guildID: newMember.guild.id, memberID: member?.id });
    
    if (!registerData) {
        new isimler({
            guildID: newMember.guild.id,
            memberID: member?.id,
        }).save().catch(() => {});
    }

    await isimler.findOneAndUpdate(
        { guildID: newMember.guild.id, memberID: newMember.id },
        {
            $push: {
                names: {
                    name: newMember.nickname || newMember.user.username,
                    yetkili: executor?.id || "Bilinmeyen",
                    sebep: "Sağ-Tık İsim Değiştirme",
                    date: Date.now(),
                },
            },
        },
        { upsert: true }
    );
};

module.exports.conf = {
    name: "guildMemberUpdate",
};
