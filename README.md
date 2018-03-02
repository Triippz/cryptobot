#Discord CryptoBot

#### Description
This simple bot was designed to display cryptocurrency related information within 
the Discord Application, via user commands. As of now, it supports a handful of useful commands.

All commands must be preceeded by a '$' symbol to activate the bot.

- $ping: Used to test to make sure the bot is active and responding
    - returns "A string"
- $asl: Yeah... It's what you think it is
- $help: Returns all available commands
- $info <X_COIN>: Returns information relevant to that coin. You must use the actual coin's name as a parameter (i.e. "bitcoin", "ethereum", "litecoin", etc.)
    - $info bitcoin
    - $info stellar
    - $info ETHEREUM
    - info LiTeCoIn
    
-  $coins <COIN_1> <COIN_2> <COIN_3> <COIN_4>: Returns multiple coins with relevant information. May use up 4 different parameters.
    - $coins bitcoin ethereum litecoin stellar
    - $coins stellar nano
    - $coins neo gas qtum
    
- $top <NUMBER>: Returns the top x number of coins. 
    - $top 10 : returns top 10 coins
    - $top 5: returns top 5 coins
    
- $news <String>: Returns 3 news stories via Google RSS feed
    - $news bitcoin
    - $news XLM
    - $news LitePay