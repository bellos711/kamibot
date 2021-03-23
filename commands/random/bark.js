module.exports = {
	name: 'bark',
	description: 'Bark!',
	execute(message, args) {
		message.channel.send(`Watdo?!`);
	},
};