const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (message.content === '+ping') {
        // send back "Pong." to the channel the message was sent in
        message.channel.send('Pong.');
    }
});

client.login('NTc1MTIyOTczOTA5MDU3NTU2.XNDZ8Q.yD3HFozI8e62Hbwt0XOVkFB0Yf8');