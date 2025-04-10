// require('dotenv').config();

module.exports = {
    GuildID: "1357115287044100216",
    GuildName: "izler kalır @izlerkalirsin",
    owners: ["474006896408264712"],
    BotDurum: ["@izlerkalirsin"],
    BotSesKanal: "1357154558870163647",
    AltBaşlık: "1357152711404945648",
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
