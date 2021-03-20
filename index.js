// require the discord.js module
const Discord = require('discord.js');

const {prefix, token} = require('./config.json');

// create a new Discord client
const client = new Discord.Client();

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {

	//IF YOUR COMMAND HAS ARGUMENTS
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(' ');
	const command = args.shift().toLowerCase();

	console.log(message.content);

	let lowercase_msg = message.content.toLowerCase();

	if (lowercase_msg === 'halo') {
		message.channel.send(`HALO ${message.author.username}`);

	} else if (lowercase_msg === 'kami'){
		message.channel.send('I AM ALMIGHTY KAMI');
	} else if (lowercase_msg.includes(`god`)){
		message.channel.send(`Did someone summon me?`);
	} else if (lowercase_msg === `${prefix}serverinfo`){
		message.channel.send(`Server is: ${message.guild.name}, \nTotal Members: ${message.guild.memberCount}`);
	} else if (command === 'arguments++') {
		if (!args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}
	
		message.channel.send(`You said: ${command}\nThe arguments you said was: ${args}`);
	}

	

});




// login to Discord with your app's token
client.login(token);
