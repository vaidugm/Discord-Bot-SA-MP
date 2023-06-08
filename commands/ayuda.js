const { EmbedBuilder } = require('discord.js');

const embed = new EmbedBuilder();

module.exports = {
    name: 'ayuda',
    aliases: [],
    description: 'menu de ayuda',
    run: async (client, message, args) => {

        const color = await message.guild?.members.fetch(message.client.user.id).then(color => color.displayHexColor) || '#000000';
        embed.setColor(color);
        embed.setTitle(`**Menu de Ayuda**`);
        embed.setDescription("**Este es le menu de ayuda de este BOT**\n\n**Comandos para Discord**\n```!ayuda !ip !server !players```\n**Comandos para SA-MP**\n```!cuenta !say !verificar !autorizar```\nComandos de Moderadores\n```!expulsar ```");
        embed.setThumbnail(message.author.displayAvatarURL())
        embed.setTimestamp();
        return message.channel.send({ embeds: [embed] });   
    }
};