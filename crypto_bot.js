
var fs = require('fs');
var CoinMarketCap = require('node-coinmarketcap');
var coinmarketcap = new CoinMarketCap();

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
    var auth = require("./auth.json");
} catch ( e )
{
    console.log("Please create an auth.json, with a bot token\n" + e.stack );
    process.exit();
}

/* get config info */
var Config = {};
try {
    Config = require("./config.json");
} catch ( e )
{
    Config.debug = false;
    Config.commandPrefix = "!";
    try{
        if(fs.lstatSync("./config.json").isFile()){
            console.log("WARNING: config.json found but we couldn't read it!\n" + e.stack);
        }
    } catch(e2){
        fs.writeFile("./config.json",JSON.stringify(Config,null,2));
    }
}
if(!Config.hasOwnProperty("commandPrefix")){
    Config.commandPrefix = '$';
}
var prefix = Config.commandPrefix;

/* Initialize the CryptoBot */
var dClient = new Discord.Client();

dClient.on("ready", function (evt) {
    console.log("Connected");
    console.log("Logged in as: ");
    console.log(dClient.user + ' - (' + dClient.id + ')');
});

console.log("The Bot's command prefix is : " + Config.prefix);
const CMC = new CoinMarketCap()

dClient.on('message', message => {
    /* This bot will listen for messages that present a crypto's ID (BTC,LTC,XLM, etc...) */
    /* The user must present a $ infront of the ID (!BTC,!LTC,!XLM) */

    console.log("INCOMING MESSAGE FROM: " + message.author.username + "\n" + message );

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    var json = null;

    switch (command) {
        case "asl":
            let [age, sex, loc] = args;
            var aslMess;

            if (age >= 18) {
                if (age >= 50) {
                    if (sex === "male" || sex === "m") {
                        aslMess = "Get that wrinkle dioch out of here homie";
                    } else if (sex === "female" || sex === "f") {
                        aslMess = "Pussy lips so saggy, ya could fly awayyyyy. Still hit doe...."
                    }
                } else {
                    aslMess = message.author.username
                        + ', I see you\'re ' + age + " years old"
                        + " ,a " + sex
                        + " , from " + loc
                        + ", and old enough to fuck. I like, I like...";
                }
            } else {
                aslMess = message.author.username
                    + ', I see you\'re ' + age + " years old"
                    + " ,a " + sex
                    + " , from " + loc
                    + ", and young as fuck. Stop fucking with shit kid.";
            }
            message.reply(aslMess);
            break;
        case "ping":
            const mess = "What the fuck do you want?";
            message.reply(mess);
            break;
        //ignore other bots
        case message.author.bot:
            return;
            break;
        case "help":
            message.reply(Config.commands);
            break;
        case "info":
            let [ coinz ] = args;
            coinmarketcap.get( coinz, coin => {
                console.log(getCoinInfoStr(coin));
                message.reply(getCoinInfoStr(coin));
            });
            break;
        case "top":
            let [ top ] = args;
            coinmarketcap.getTop( top, coins => {
                for ( var i = 0; i < top; i ++  ){
                    console.log(getCoinInfoStr(coins[i]));
                    message.reply(getCoinInfoStr(coins[i]));
                }
            });
            break;
        case "coins":
            let [ coin1, coin2, coin3, coin4] = args;

            coinmarketcap.get( coin1, coin => {
                message.reply(getCoinInfoStr(coin));
            });
            if ( coin2 != null )
                coinmarketcap.get( coin2, coin => {
                    message.reply( getCoinInfoStr(coin));
                });
            if ( coin3 != null )
                coinmarketcap.get( coin3, coin => {
                    message.reply( getCoinInfoStr( coin));
                });
            if ( coin4 != null )
                coinmarketcap.get( coin4, coin => {
                    message.reply ( getCoinInfoStr( coin ));
                });
            break;
    }
});

dClient.login(auth.token);

function getCoinInfoStr ( coin ){
    var infoStr = "\nCoin: " + coin.name
                +" ("+coin.symbol+")\n"
                + "Price: $" + coin.price_usd
                + "\nRank: " + coin.rank
                + "\nPercent Change (24h): " + coin.percent_change_24h + "%"
                + "\nPercent Change (7d): " + coin.percent_change_7d + "%";
    if ( coin.symbol === 'XLM')
        infoStr = infoStr + "\n\n THE GOD OF ALL CRYPTOS!!! HAIL!"
    if ( coin.symbol === 'XVG' )
        infoStr = infoStr + "\n\nTHE GOD OF ALL SHIT-COINS!"
    if ( coin.symbol === 'TRX' )
        infoStr = infoStr + "\n\nJustin Sun is a small blistered cock....."
    return infoStr;
}
