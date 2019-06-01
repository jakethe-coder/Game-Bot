const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs')
const { prefix,token } = require('./config.json')

//Command Prompt messages
client.once('ready', () => {
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
    client.user.setActivity("games.", {"type": 'PLAYING'})
});

client.on("guildCreate", guild => {
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
  });
  
  client.on("guildDelete", guild => {
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
  });
  

//Bot Commands
client.on('message', message => {
    try {
        if (message.content === '+hello') {
            message.channel.send('Welcome to Game Bot! Pre-fix is `+`.')
        }
    }
    catch (err) {
        message.channel.send('Bot encountered a error.')
    }
});

client.on('message', message => {
    try {
        if (message.content === '+help') {
            fs.readFile("./helpcommand.txt", 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                message.channel.send(data)
            });
        }
    }
    catch (err) {
        message.channel.send('Bot encountered a error.')
    }
});

client.on('message', message => {
    try {
        if (message.content === '+credit') {
            fs.readFile("./botcredit.txt", 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                message.channel.send(data)
            });
        }
    }
    catch (err) {
        message.channel.send('Bot encountered a error.')
    }
});

//Game Commands
client.on('message', message => {
    if (message.author.bot == true) return
    if (message.type == "dm") return
    try {    
        if (message.content === '+flip') {
            var flip = Math.floor(Math.random() * 2 + 1)
            console.log(flip)
            if (flip === 1) {
                message.channel.send('Heads!')
            } else {
                message.channel.send('Tails!')
            }
        }
    }
    catch (err) {
        message.channel.send('Bot encountered a error.')
    }
});

client.on('message', message => {
    if (message.author.bot == true) return
    if (message.type == "dm") return
    try {
        if (message.content === '+roll') {
            var roll = Math.floor(Math.random() * 6 + 1)
            console.log(roll)
            message.channel.send('You rolled a ' + roll + '!')
        }
    }
    catch (err) {
        message.channel.send('Bot encountered a error.')
    }
});

client.on('message', message =>{
    if (message.author.bot == true) return
    if (message.type == "dm") return
    try {
        if (message.content.startsWith(`${prefix}battle`)) {
            var member = message.mentions.members.first();
            var winner = 0
            var troops1 = Math.floor(Math.random() * 500 + 1)
            var tanks1 = Math.floor(Math.random() * 100 + 1)
            var ships1 = Math.floor(Math.random() * 20 + 1)
            var troops2 = Math.floor(Math.random() * 500 + 1)
            var tanks2 = Math.floor(Math.random() * 100 + 1)
            var ships2 = Math.floor(Math.random() * 20 + 1)
            if (troops1 - troops2 < 0) {
                winner = winner - 1
            } else {
                winner = winner + 1
            }
            if (tanks1 - tanks2 < 0) {
                winner = winner - 1
            } else {
                winner = winner + 1
            }
            if (ships1 - ships2 < 0) {
                winner = winner - 1
            } else {
                winner = winner + 1
            }
            if (winner < 0) {
                winner = ''+member.displayName+ ' has won'
            } else {
                winner = ''+message.author.username+ ' has won'
            }
            message.channel.send({embed: {
                color: 3447003,
                author: {
                  name: message.author.username,
                  icon_url: message.author.avatarURL
                },
                title: "Battle Game",
                description: '' +message.author.username+ ' vs ' +member.displayName+ '',
                fields: [{
                    name: "Result",
                    value: ""+message.author.username+ " deployed" +troops1+ " troops, " +tanks1+ " tanks, and " +ships1+ " ships! " +member.displayName+ " has deployed " +troops2+ " troops, " +tanks2+ " tanks, and " +ships2+ " ships! After the battle " +winner+"!"
                  }
                ],
                timestamp: new Date(),
                footer: {
                  icon_url: client.user.avatarURL,
                  text: "© Game Bot"
                }
              }
            });
        }
    }
    catch (err) { 
        message.channel.send('You forgot to mention a user')
    }
});

client.on('message', message => {
    try {
        if (message.content === '+rock') {
            var words = ["rock", "paper", "scissors"];
            var word = words[Math.floor(Math.random() * words.length)];
            if (word === "rock") {
                phrase = "You tied :/"
            } else if (word === "paper") {
                phrase = "Bot wins :("
            } else if (word === "scissors") {
                phrase = "You win :)"
            }
            message.channel.send('Bot chose ' +word+ '! ' +phrase+'.')
        } else if (message.content === '+paper') {
            var phrase = 0
            var words = ["rock", "paper", "scissors"];
            var word = words[Math.floor(Math.random() * words.length)];
            if (word === "rock") {
                phrase = "You win :)"
            } else if (word === "paper") {
                phrase = "You tied :/"
            } else if (word === "scissors") {
                phrase = "Bot wins :("
            }
            message.channel.send('Bot chose ' +word+ '! ' +phrase+'.')
        } else if (message.content === '+scissors') {
            var phrase = 0
            var words = ["rock", "paper", "scissors"];
            var word = words[Math.floor(Math.random() * words.length)];
            if (word === "rock") {
                phrase = "Bot wins :("
            } else if (word === "paper") {
                phrase = "You win :)"
            } else if (word === "scissors") {
                phrase = "You tied :/"
            }
            message.channel.send('Bot chose ' +word+ '! ' +phrase+'.')
    }
}
    catch (err) {
        message.channel.send('Bot encountered a error.')
    }
});

client.on('message', message => {
    try {
        if (message.content.startsWith(`${prefix}duel`)) {
            var member = message.mentions.members.first();
            if (member.id == "101495198676185088") {
                message.channel.send("You missed! Seakat shot you!")
            } else if (member.id !== message.author.id) {
                var words = ["You missed! " +member.displayName+ " shot you!", "You shot " +member.displayName+ "!", "You and " +member.displayName+ " shot each other!"];
                var word = words[Math.floor(Math.random() * words.length)];
                message.channel.send(word)
            } else if (member.id == message.author.id) {
                message.channel.send("You shot yourself!")
            }
        }
    }
    catch (err) { 
        message.channel.send('You forgot to mention a user and the bot shot you!')
    }
});

client.on('message', message => {
    try {
        if (message.content === '+bomb') {
            var words = ["failed", "succeeded"];
            var word = words[Math.floor(Math.random() * words.length)];
            if (word == "failed") {
                word2 = "blew up"
            } else {
                word2 = "was defused"
            }
            message.channel.send("You " +word+ "! Bomb " +word2+ "!")
        }   
    }
    catch (err) {
        message.channel.send('Bot encountered a error.')
    }
});

client.on('message', message => {
    try {
        if (message.content.startsWith(`${prefix}war`)) {
            var member = message.mentions.members.first();
            //first player variables
            var words = ["2 of Hearts", "3 of Hearts", "4 of Hearts", "5 of Hearts", "6 of Hearts", "7 of Hearts", "8 of Hearts", "9 of Hearts", "10 of Hearts", "Jack of Hearts", "Queen of Hearts", "King of Hearts", "Ace of Hearts", "2 of Diamonds", "3 of Diamonds", "4 of Diamonds", "5 of Diamonds", "6 of Diamonds", "7 of Diamonds", "8 of Diamonds", "9 of Diamonds", "10 of Diamonds", "Jack of Diamonds", "Queen of Diamonds", "King of Diamonds", "Ace of Diamonds", "2 of Spades", "3 of Spades", "4 of Spades", "5 of Spades", "6 of Spades", "7 of Spades", "8 of Spades", "9 of Spades", "10 of Spades", "Jack of Spades", "Queen of Spades", "King of Spades", "Ace of Spades", "2 of Clubs", "3 of Clubs", "4 of Clubs", "5 of Clubs", "6 of Clubs", "7 of Clubs", "8 of Clubs", "9 of Clubs", "10 of Clubs", "Jack of Clubs", "Queen of Clubs", "King of Clubs", "Ace of Clubs"];
            var word = words[Math.floor(Math.random() * words.length)];
            var score = 0
            //secound player variables
            var words4 = ["2 of Hearts", "3 of Hearts", "4 of Hearts", "5 of Hearts", "6 of Hearts", "7 of Hearts", "8 of Hearts", "9 of Hearts", "10 of Hearts", "Jack of Hearts", "Queen of Hearts", "King of Hearts", "Ace of Hearts", "2 of Diamonds", "3 of Diamonds", "4 of Diamonds", "5 of Diamonds", "6 of Diamonds", "7 of Diamonds", "8 of Diamonds", "9 of Diamonds", "10 of Diamonds", "Jack of Diamonds", "Queen of Diamonds", "King of Diamonds", "Ace of Diamonds", "2 of Spades", "3 of Spades", "4 of Spades", "5 of Spades", "6 of Spades", "7 of Spades", "8 of Spades", "9 of Spades", "10 of Spades", "Jack of Spades", "Queen of Spades", "King of Spades", "Ace of Spades", "2 of Clubs", "3 of Clubs", "4 of Clubs", "5 of Clubs", "6 of Clubs", "7 of Clubs", "8 of Clubs", "9 of Clubs", "10 of Clubs", "Jack of Clubs", "Queen of Clubs", "King of Clubs", "Ace of Clubs"];
            var word2 = words4[Math.floor(Math.random() * words4.length)];
            var score2 = 0
            if (word === "2 of Hearts") {
                score = 2
            } else if (word === "3 of Hearts") {
                score = 3
            } else if (word === "4 of Hearts") {
                score = 4
            } else if (word === "5 of Hearts") {
                score = 5
            } else if (word === "6 of Hearts") {
                score = 6
            } else if (word === "7 of Hearts") {
                score = 7
            } else if (word === "8 of Hearts") {
                score = 8
            } else if (word === "9 of Hearts") {
                score = 9
            } else if (word === "10 of Hearts") {
                score = 10
            } else if (word === "Jack of Hearts") {
                score = 11
            } else if (word === "Queen of Hearts") {
                score = 12
            } else if (word === "King of Hearts") {
                score = 13
            } else if (word === "Ace of Hearts") {
                score = 14
            } else if (word === "2 of Diamonds") {
                score = 2
            } else if (word === "3 of Diamonds") {
                score = 3
            } else if (word === "4 of Diamonds") {
                score = 4
            } else if (word === "5 of Diamonds") {
                score = 5
            } else if (word === "6 of Diamonds") {
                score = 6
            } else if (word === "7 of Diamonds") {
                score = 7
            } else if (word === "8 of Diamonds") {
                score = 8
            } else if (word === "9 of Diamonds") {
                score = 9
            } else if (word === "10 of Diamonds") {
                score = 10
            } else if (word === "Jack of Diamonds") {
                score = 11
            } else if (word === "Queen of Diamonds") {
                score = 12
            } else if (word === "King of Diamonds") {
                score = 13
            } else if (word === "Ace of Diamonds") {
                score = 14
            } else if (word === "2 of Spades") {
                score = 2
            } else if (word === "3 of Spades") {
                score = 3
            } else if (word === "4 of Spades") {
                score = 4
            } else if (word === "5 of Spades") {
                score = 5
            } else if (word === "6 of Spades") {
                score = 6
            } else if (word === "7 of Spades") {
                score = 7
            } else if (word === "8 of Spades") {
                score = 8
            } else if (word === "9 of Spades") {
                score = 9
            } else if (word === "10 of Spades") {
                score = 10
            } else if (word === "Jack of Spades") {
                score = 11
            } else if (word === "Queen of Spades") {
                score = 12
            } else if (word === "King of Spades") {
                score = 13
            } else if (word === "Ace of Spades") {
                score = 14
            } else if (word === "2 of Clubs") {
                score = 2
            } else if (word === "3 of Clubs") {
                score = 3
            } else if (word === "4 of Clubs") {
                score = 4
            } else if (word === "5 of Clubs") {
                score = 5
            } else if (word === "6 of Clubs") {
                score = 6
            } else if (word === "7 of Clubs") {
                score = 7
            } else if (word === "8 of Clubs") {
                score = 8
            } else if (word === "9 of Clubs") {
                score = 9
            } else if (word === "10 of Clubs") {
                score = 10
            } else if (word === "Jack of Clubs") {
                score = 11
            } else if (word === "Queen of Clubs") {
                score = 12
            } else if (word === "King of Clubs") {
                score = 13
            } else if (word === "Ace of Clubs") {
                score = 14
            }
            if (word2 === "2 of Hearts") {
                score2 = 2
            } else if (word2 === "3 of Hearts") {
                score2 = 3
            } else if (word2 === "4 of Hearts") {
                score2 = 4
            } else if (word2 === "5 of Hearts") {
                score2 = 5
            } else if (word2 === "6 of Hearts") {
                score2 = 6
            } else if (word2 === "7 of Hearts") {
                score2 = 7
            } else if (word2 === "8 of Hearts") {
                score2 = 8
            } else if (word2 === "9 of Hearts") {
                score2 = 9
            } else if (word2 === "10 of Hearts") {
                score2 = 10
            } else if (word2 === "Jack of Hearts") {
                score2 = 11
            } else if (word2 === "Queen of Hearts") {
                score2 = 12
            } else if (word2 === "King of Hearts") {
                score2 = 13
            } else if (word2 === "Ace of Hearts") {
                score2 = 14
            } else if (word2 === "2 of Diamonds") {
                score2 = 2
            } else if (word2 === "3 of Diamonds") {
                score2 = 3
            } else if (word2 === "4 of Diamonds") {
                score2 = 4
            } else if (word2 === "5 of Diamonds") {
                score2 = 5
            } else if (word2 === "6 of Diamonds") {
                score2 = 6
            } else if (word2 === "7 of Diamonds") {
                score2 = 7
            } else if (word2 === "8 of Diamonds") {
                score2 = 8
            } else if (word2 === "9 of Diamonds") {
                score2 = 9
            } else if (word2 === "10 of Diamonds") {
                score2 = 10
            } else if (word2 === "Jack of Diamonds") {
                score2 = 11
            } else if (word2 === "Queen of Diamonds") {
                score2 = 12
            } else if (word2 === "King of Diamonds") {
                score2 = 13
            } else if (word2 === "Ace of Diamonds") {
                score2 = 14
            } else if (word2 === "2 of Spades") {
                score2 = 2
            } else if (word2 === "3 of Spades") {
                score2 = 3
            } else if (word2 === "4 of Spades") {
                score2 = 4
            } else if (word2 === "5 of Spades") {
                score2 = 5
            } else if (word2 === "6 of Spades") {
                score2 = 6
            } else if (word2 === "7 of Spades") {
                score2 = 7
            } else if (word2 === "8 of Spades") {
                score2 = 8
            } else if (word2 === "9 of Spades") {
                score2 = 9
            } else if (word2 === "10 of Spades") {
                score2 = 10
            } else if (word2 === "Jack of Spades") {
                score2 = 11
            } else if (word2 === "Queen of Spades") {
                score2 = 12
            } else if (word2 === "King of Spades") {
                score2 = 13
            } else if (word2 === "Ace of Spades") {
                score2 = 14
            } else if (word2 === "2 of Clubs") {
                score2 = 2
            } else if (word2 === "3 of Clubs") {
                score2 = 3
            } else if (word2 === "4 of Clubs") {
                score2 = 4
            } else if (word2 === "5 of Clubs") {
                score2 = 5
            } else if (word2 === "6 of Clubs") {
                score2 = 6
            } else if (word2 === "7 of Clubs") {
                score2 = 7
            } else if (word2 === "8 of Clubs") {
                score2 = 8
            } else if (word2 === "9 of Clubs") {
                score2 = 9
            } else if (word2 === "10 of Clubs") {
                score2 = 10
            } else if (word2 === "Jack of Clubs") {
                score2 = 11
            } else if (word2 === "Queen of Clubs") {
                score2 = 12
            } else if (word2 === "King of Clubs") {
                score2 = 13
            } else if (word2 === "Ace of Clubs") {
                score2 = 14
            }
            if (score === score2) {
                message.channel.send({embed: {
                    color: 3447003,
                    author: {
                      name: message.author.username,
                      icon_url: message.author.avatarURL
                    },
                    title: "War!",
                    description: '' +message.author.username+ ' vs ' +member.displayName+ '',
                    fields: [{
                        name: "Result",
                        value: ""+message.author.username+ " got " +word+ " which ties " +member.displayName+ "'s " +word2+ "! Try again!",
                      }
                    ],
                    timestamp: new Date(),
                    footer: {
                      icon_url: client.user.avatarURL,
                      text: "© Game Bot"
                    }
                  }
                });
            } else if (score <= score2) {
                message.channel.send({embed: {
                    color: 3447003,
                    author: {
                      name: message.author.username,
                      icon_url: message.author.avatarURL
                    },
                    title: "War!",
                    description: '' +message.author.username+ ' vs ' +member.displayName+ '',
                    fields: [{
                        name: "Result",
                        value: ""+message.author.username+ " got " +word+ " which loses to " +member.displayName+ "'s " +word2+ "",
                      }
                    ],
                    timestamp: new Date(),
                    footer: {
                      icon_url: client.user.avatarURL,
                      text: "© Game Bot"
                    }
                  }
                });
            } else if (score >= score2) {
                message.channel.send({embed: {
                    color: 3447003,
                    author: {
                      name: message.author.username,
                      icon_url: message.author.avatarURL
                    },
                    title: "War!",
                    description: '' +message.author.username+ ' vs ' +member.displayName+ '',
                    fields: [{
                        name: "Result",
                        value: ""+message.author.username+ " got " +word+ " which beats " +member.displayName+ "'s " +word2+ "",
                      }
                    ],
                    timestamp: new Date(),
                    footer: {
                      icon_url: client.user.avatarURL,
                      text: "© Game Bot"
                    }
                  }
                });
            }
        }
    }
    catch (err) {
        console.log(err)
        message.channel.send('You forgot to mention another username.')
    }
});

//Phrase Commands
client.on('message', message => {
    if (message.author.bot == true) return
    if (message.type == "dm") return
    try {
        if (message.content === '+ping') {
            message.channel.send('Pong.');
        }
    }
    catch (err) {
        message.channel.send('Bot encountered a error.')
    }
});   

client.on('message', message => {
    try {
        if (message.content === '+exam') {
            var words = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"];
            var word = words[Math.floor(Math.random() * words.length)];
            message.channel.send('You got a ' +word+ ' on your exam!')
        }
    }
    catch (err) {
        message.channel.send('Bot encountered a error.')
    }
});

client.on('message', message => {
    try {
        if (message.content === '+bruh') {
            message.channel.send('Alert all Discord users, this is a bruh moment.')
        } else if (message.author.id === '556656008726970408') return
    }
    catch (err) {
        message.channel.send('Bot encountered a error.')
    }
});

client.on('message', message => {
    try {
        if (message.content === '+instagram') {
            message.channel.send('Follow jakethe_memer on Instagram!')
        }
    }
    catch (err) {
        message.channel.send('Bot encountered a error.')
    }
});

client.on('message', message => {
    try {
        if (message.content === '+yep') {
            message.channel.send("yep, I'm cumming")
        }
    }
    catch (err) {
        message.channel.send('Bot encountered a error.')
    }
});

client.on('message', message => {
    try {
        if (message.content.startsWith(`${prefix}gay`)) {
            var member = message.mentions.members.first();
            message.channel.send('Attention everyone ' +member.displayName+ ' is gay!!!')
        }
    } 
    catch (err) {
        message.channel.send("You didn't mention anyone... are you sure you want to come out.")
    }
});

client.on('message', message => {
    try {
        if (message.content === '+wait') {
            message.channel.send("wait, that's illegal")
        }
    }
    catch (err) {
        message.channel.send('Bot encountered a error.')
    }
});

client.on('message', message => {
    try {
        if (message.content === '+hey') {
            var words = ["hi", "hello", "hey", "bye"];
            var word = words[Math.floor(Math.random() * words.length)];
            message.channel.send("" +word+ "")
        }
    }
    catch (err) {
        message.channel.send('Bot encountered a error.')
    }
});

client.on('message', message => {
    try {
        if (message.content === '+society') {
            message.channel.send('We live in a society')
        }
    }
    catch (err) {
        message.channel.send('Bot encountered a error.')
    }
})

client.login(token);