module.exports = {
	name: 'kick',
	description: 'KICK!',
	execute(message, args) {
		if(!message.mentions.users.size){
			return message.reply(`You'll need to mention somebody to try and kick 😒`)
		}
		const taggedUser = message.mentions.users.first();
		message.channel.send(`Simulating kick of: ${taggedUser.username}`)
	},
};