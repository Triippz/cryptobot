
try {
    var Discord = require('discord.js');
} catch ( e ) {
    console.log(e.stack);
    console.log(process.version);
    console.log("Please run npm install and ensure it passes with no errors!");
    process.exit();
}
console.log("Starting Discord CryptoBot\nNode Version: " + process.version + "\nDiscord.js version: " + Discord.version);

/* Get the AUTHENTICATION info */
try {
    const auth = require("./auth.json");
} catch ( e )
{
    console.log("Please create an auth.json like the auth.json example, with a bot token\n" + e.stack );
    process.exit();
}


/* Initialize the CryptoBot */
const bot = new Discord.Client();

bot.on("ready", function (evt) {
    console.log("Connected");
    console.log("Logged in as: ");
    console.log(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', message => {
    /* This bot will listen for messages that present a crypto's ID (BTC,LTC,XLM, etc...) */
    /* The user must present a ! infront of the ID (!BTC,!LTC,!XLM) */
    switch ( message )
    {
        case "!ping":
            const mess = "Pong?";
            m.edit("Pong!, Latency is: " + Math.round(bot.ping));
            return message.reply(m);
            break;
        //ignore other bots
        case message.author.bot:
            return;
            break;
        case "!commands":
            break;
        case "!coins":
            break;
        case "!top3":
            break;
        case "!top5":
            break;
        case "!top10":
            break;
        case "!top20":
            break;
        case "!btc":
            break;
        case "!ltc":
            break;
        case "!eth":
            break;
        case "!xlm":
            break;
        case "!bestcoin":
            //XLM
            break;
        case "!worstcoin":
            //......
            break;
        case "!tip":
            //print XLM/LTC/BTC address
            break;
    }



}
)
