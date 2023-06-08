const { EmbedBuilder } = require('discord.js');

const embed = new EmbedBuilder();

module.exports = {
    name: 'expulsar',
    aliases: [],
    description: 'expulsar',
    run: async (client, message, args) => {

        let mencionado = message.mentions.users.first();
        let razon = args.slice(1).join(' ');

        if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply("No cuentas con permisos de Administrador.")
        if(!mencionado) return message.reply(`No ha mencionando a ningún miembro.`);
        if(!razon) return message.channel.send(`Escriba una razón del uso de kick.`);

        const color = await message.guild?.members.fetch(message.client.user.id).then(color => color.displayHexColor) || '#000000';
        embed.setColor(color);
        embed.setTitle(`**Informacion**`);
        embed.setDescription("`**${mencionado.username}**, fue expulsado del servidor, razón: ${razon}.`");
        embed.setTimestamp();
        message.guild.member(mencionado).kick(razon);
        return message.channel.send({ embeds: [embed] });   
    }
}