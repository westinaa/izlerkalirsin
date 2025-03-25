// require('dotenv').config();

module.exports = {
    GuildID: "1345788241533472991",
    GuildName: "E D E P S I Z",
    owners: ["474006896408264712"],
    BotDurum: ["Edepsiz."],
    BotSesKanal: "1345796072039125063",
    AltBaşlık: "1345788242519265433",
    mongoUrl: process.env.MONGO,
    Main: {
        ModerationToken: process.env.TOKEN,
        BotClientID: "1352235697251291137",
        prefix: ["."],
        banlimit: 3,
        jaillimit: 3,
        warnlimit: 3,
        chatmutelimit: 3,
        voicemutelimit: 3
    }
};
