const fs = require('fs'); //fs is Node's native file system module. 

// require the discord.js module
const Discord = require('discord.js');

const {prefix, token} = require('./config.json');

// create a new Discord client
const client = new Discord.Client();

client.commands = new Discord.Collection();
client.replies = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); 
/*
The fs.readdirSync() method will return an array of all the file names in that directory, e.g. ['kami.js', 'bark.js']. The filter is there to make sure any non-JS files are left out of the array. With that array, you can loop over it and dynamically set your commands to the Collection you made above.
*/
const replyFiles = fs.readdirSync('./replies').filter(file => file.endsWith('.js')); 

// when the client is ready, run this code
// this event will only trigger one time after logging in
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
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
	const commandName = args.shift().toLowerCase();

	

	console.log(message.content);

	//If there isn't a command with that name, exit early.
	if (!client.commands.has(commandName)) return;

	const command = client.commands.get(commandName);

	//if command takes an argument, but no length so no argument provided
	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments 🤔, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	//If there is, .get() the command and call its .execute() method while passing in your message and args variables as the method arguments.
	try {
		command.execute(message, args);
	} catch (error) {
		//In case something goes wrong, log the error and report back to the member to let them know.
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}


});




// login to Discord with your app's token
client.login(token);
