// require('dotenv').config();

module.exports = {
    GuildID: "1345788241533472991",
    GuildName: "A S T E L I A",
    owners: ["474006896408264712"],
    BotDurum: ["ASTELIA", "astelia"],
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
