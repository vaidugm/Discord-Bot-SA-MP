const { EmbedBuilder } = require('discord.js');

const embed = new EmbedBuilder();

module.exports = {
    name: 'avatar',
    aliases: [],
    description: 'Para ver el avatar de los usuarios',
    run: async (client, message, args) => {

        const user = message.mentions.users.first() || message.author;
        const color = await message.guild?.members.fetch(message.client.user.id).then(color => color.displayHexColor) || '#000000';
        embed.setColor(color);
        embed.setTitle('Avatar de $(user.username)');
        embed.setImage(user.displayAvatarURL({ dynamic: true, size: 1024}));
        return message.channel.send({ embeds: [embed] });   
    }
};