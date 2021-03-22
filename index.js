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

	const args = message.content.slice(prefix.length).trim().split(/ +/);
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
		//COMMAND WITH ARGUMENTS
		if (!args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}

		if(args[0] === 'bark'){
			return message.channel.send(`Watdo?!`);
		}
	
		message.channel.send(`You said: ${command}\nThe arguments you said was: ${args}`);
		message.channel.send(`First argument being: ${args[0]}`);
	} else if (command === 'kick'){
		//SIMULATE KICK COMMAND
		if(!message.mentions.users.size){
			return message.reply(`You'll need to mention somebody to try and kick 😒`)
		}
		const taggedUser = message.mentions.users.first();
		message.channel.send(`Simulating kick of: ${taggedUser.username}`)
		//...
		//CODE TO KICK SOMEONE FROM SERVER
	} else if (command === 'avatar') {
		if(!message.mentions.users.size){
			//RETURN THE URL OF YOUR AVATAR
			return message.channel.send(`This is you: <${message.author.displayAvatarURL({ format:"png", dynamic:true })}>`);
		}

		//send multiple avatars depending on how many user mentions		
		const avatarList = message.mentions.users.map(user => {
			return `${user.username}'s avatar: <${user.displayAvatarURL({ format: "png", dynamic: true })}>`;
		});
	
		// send the entire array of strings as a message
		// by default, discord.js will `.join()` the array with `\n`
		message.channel.send(avatarList);
	} else if (command === 'delete'){
		//grabs the integer amount in the first argument and changes it from string to int
		const amount = parseInt(args[0] + 1);//includes your message + the amount of messages
		if(isNaN(amount)){
			return message.reply(`${args[0]} doesn\'t look like a real number. 🤔`)
		} else if (amount < 2 || amount > 100) {
			return message.reply('you need to input a number between 2 and 100.');
		}
		

		//CODE TO DELETE MESSAGES
		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('there was an error trying to prune messages in this channel!');
		});
	}


});




// login to Discord with your app's token
client.login(token);
