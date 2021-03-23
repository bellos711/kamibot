module.exports = {
	name: 'avatar',
	description: 'Return avatar URL!',
	execute(message, args) {
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
	},
};