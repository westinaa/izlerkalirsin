const { EmbedBuilder, AuditLogEvent } = require("discord.js");
const { red, green } = require("../../settings/configs/emojis.json");
const Log = require("../../settings/configs/sunucuayar.json");
const roller = require("../../settings/schemas/rolveridb");
const moment = require('moment-timezone');
moment().tz("Europe/Istanbul").format('LL');

const client = global.bot;

module.exports = async (oldMember, newMember) => {
  const audit = await newMember?.guild.fetchAuditLogs({
    type: AuditLogEvent.MemberRoleUpdate
  }).catch(() => null);
  
  if (!audit) return;

  let ayar = audit.entries.first();
  if (!ayar) return;

  let hedef = ayar.target;
  let yapan = ayar.executor;

  if (yapan.bot) return;

  // ✅ ROL VERME KONTROLÜ
  for (const role of newMember.roles.cache.values()) {
    if (!oldMember.roles.cache.has(role.id)) {
      const embed = new EmbedBuilder()
        .setColor("#7fff00")
        .setDescription(`
          ${hedef} Kullanıcısının Rolleri Güncellendi;

          > \` İşlem: \` **ROL VERME**

          > ${green} __**Rol Verilen Kişi:**__ ${hedef} - \`${hedef.id}\` 

          > ${green} __**Rol Veren Kişi:**__ ${yapan} - \`${yapan.id}\` 
  
          > ${green} __**Kişiye Eklenen Rol:**__  ${role} - \`${role.id}\`
        `)
        .setFooter({ text: yapan.tag, iconURL: yapan.displayAvatarURL({ dynamic: true }) })
        .setTimestamp();

      client.channels.cache.find(x => x.name == "role_log")?.send({ embeds: [embed] });

      let res = await roller.findOne({ user: hedef.id });

      if (!res) {
        let newData = new roller({
          user: hedef.id,
          roller: [{
            rol: role.id,
            mod: yapan.id,
            user: hedef.id,
            tarih: moment(Date.now()).format("LLL"),
            state: "Ekleme"
          }]
        });
        await newData.save().catch(e => console.log(e));
      } else {
        res.roller.push({
          rol: role.id,
          mod: yapan.id,
          user: hedef.id,
          tarih: moment(Date.now()).format("LLL"),
          state: "Ekleme"
        });
        await res.save().catch(e => console.log(e));
      }
    }
  }

  // ✅ ROL KALDIRMA KONTROLÜ
  for (const role of oldMember.roles.cache.values()) {
    if (!newMember.roles.cache.has(role.id)) {
      const embed = new EmbedBuilder()
        .setColor("#ff0000")
        .setDescription(`
          ${hedef} Kullanıcısının Rolleri Güncellendi;

          > \` İşlem: \` **ROL ALMA**

          > ${red} __**Rolü Alınan Kişi:**__ ${hedef} - \`${hedef.id}\`

          > ${red} __**Rolü Alan Kişi:**__ ${yapan} - \`${yapan.id}\`
        
          > ${red} __**Kişiden Alınan Rol:**__  ${role} - \`${role.id}\`
        `)
        .setFooter({ text: yapan.tag, iconURL: yapan.displayAvatarURL({ dynamic: true }) })
        .setTimestamp();

      client.channels.cache.find(x => x.name == "role_log")?.send({ embeds: [embed] });

      let res = await roller.findOne({ user: hedef.id });

      if (!res) {
        let newData = new roller({
          user: hedef.id,
          roller: [{
            rol: role.id,
            mod: yapan.id,
            user: hedef.id,
            tarih: moment(Date.now()).format("LLL"),
            state: "Kaldırma"
          }]
        });
        await newData.save().catch(e => console.log(e));
      } else {
        res.roller.push({
          rol: role.id,
          mod: yapan.id,
          user: hedef.id,
          tarih: moment(Date.now()).format("LLL"),
          state: "Kaldırma"
        });
        await res.save().catch(e => console.log(e));
      }
    }
  }
};

module.exports.conf = {
  name: "guildMemberUpdate",
};