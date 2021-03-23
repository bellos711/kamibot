const fs = require('fs'); //fs is Node's native file system module. 

// require the discord.js module
const Discord = require('discord.js');

const {prefix, token} = require('./config.json');

// create a new Discord client
const client = new Discord.Client();

client.commands = new Discord.Collection();
client.replies = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); 
/*
The fs.readdirSync() method will return an array of all the file names in that directory, e.g. ['kami.js', 'bark.js']. The filter is there to make sure any non-JS files are left out of the array. With that array, you can loop over it and dynamically set your commands to the Collection you made above.
*/
const replyFiles = fs.readdirSync('./replies').filter(file => file.endsWith('.js')); 

// when the client is ready, run this code
// this event will only trigger one time after logging in

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
	console.log(file);
}

//---------------------------------------
for(const file of replyFiles) {
	const reply = require(`./replies/${file}`);
	client.replies.set(reply.name, reply);
	// console.log(file)
}



client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {

	//IF YOUR COMMAND/MSG HAS NO ARGUMENTS
	if (!message.content.startsWith(prefix) || message.author.bot){
		// return;
		
		const reply = message.content.toLowerCase();
		// message.channel.send(`you said ${reply}`);
		if (reply.includes(`god`)){
			return message.channel.send(`Did someone summon me?`);
		}

		if (!client.replies.has(reply)) return; 

		try {
			client.replies.get(reply).execute(message);
			return;
		} catch (error) {
			console.error(error);
			message.reply('there was an error trying to reply to you!');
			return;
		}
	} 

	//IF YOU HAVE A COMMAND + ARGUMENTS
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	

	console.log(message.content);

	//If there isn't a command with that name, exit early.
	if (!client.commands.has(command)) return;

	//If there is, .get() the command and call its .execute() method while passing in your message and args variables as the method arguments.
	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		//In case something goes wrong, log the error and report back to the member to let them know.
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}

	//------------------------------------------------

	


	// if(command === 'kami') {
	// 	client.commands.get('kami').execute(message, args);
	// } else if (command === 'bark') {
	// 	client.commands.get('bark').execute(message, args);
	// } else if (command === 'kick') {
	// 	client.commands.get('kick').execute(message, args);
	// } else if (command === 'delete') {
	// 	client.commands.get('delete').execute(message, args);
	// } else if (command === 'avatar') {
	// 	client.commands.get('avatar').execute(message, args);
	// }

	// let lowercase_msg = message.content.toLowerCase();

	// if (lowercase_msg === 'halo') {
	// 	message.channel.send(`HALO ${message.author.username}`);

	// } else if (lowercase_msg === 'kami'){
	// 	message.channel.send('I AM ALMIGHTY KAMI');
	// } else if (lowercase_msg.includes(`god`)){
	// 	message.channel.send(`Did someone summon me?`);
	// } else if (lowercase_msg === `${prefix}serverinfo`){
	// 	message.channel.send(`Server is: ${message.guild.name}, \nTotal Members: ${message.guild.memberCount}`);
	// } else if (command === 'arguments++') {
	// 	//COMMAND WITH ARGUMENTS
	// 	if (!args.length) {
	// 		return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
	// 	}

	// 	if(args[0] === 'bark'){
	// 		return message.channel.send(`Watdo?!`);
	// 	}
	
	// 	message.channel.send(`You said: ${command}\nThe arguments you said was: ${args}`);
	// 	message.channel.send(`First argument being: ${args[0]}`);
	// } 

});




// login to Discord with your app's token
client.login(token);
