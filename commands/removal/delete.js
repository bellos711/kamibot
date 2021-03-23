module.exports = {
	name: 'delete',
	description: 'Delete messages!',
	execute(message, args) {
		//grabs the integer amount in the first argument and changes it from string to int
		const amount = parseInt(args[0])+1;//includes your message + the amount of messages
		if(isNaN(amount)){
			return message.reply(`${args[0]} doesn\'t look like a real number. 🤔`)
		} else if (amount < 2 || amount > 100) {
			return message.reply('you need to input a number between 2 and 100.');
		}
		

		//CODE TO DELETE MESSAGES
		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('I dun goof\'d removing messages. Either I don\'t have permissions, or all messages you\'re tryna delete is 2 weeks old...');
		});
		message.channel.send(`Aight, I've removed ${parseInt(args[0])} messages for you. `)
	},
};