module.exports = {
	name: 'arguments',
	description: 'testing arguments here reply!',
	execute(message, args) {
		//COMMAND WITH ARGUMENTS
		if (!args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}

		if(args[0] === 'bark'){
			return message.channel.send(`Watdo?!`);
		}
	
		message.channel.send(`You said: ${message}\nThe arguments you said was: ${args}`);
		message.channel.send(`First argument being: ${args[0]}`);
	},
};