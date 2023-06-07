const { EmbedBuilder } = require('discord.js');
const samp = require('samp-query');

module.exports = {
    name: 'server',
    aliases: [],
    description: 'Muestra información sobre el servidor SA:MP',
    run: async (client, message, args) => {
        if(!process.env.SAMP_IP)
            return message.channel.send('Debes coloar la ip en .env!');

        const color = await message.guild?.members.fetch(message.client.user.id).then(color => color.displayHexColor) || '#000000';

        const ip = process.env.SAMP_IP.split(':');
        const options = {
            host: ip[0],
            port: ip[1] || 7777
        };
    
        await samp(options, (error, query) => {
            if(error){
                const embed = new EmbedBuilder()
                .setColor(color)
                .setTitle(`${options.host}:${options.port}`)
                .setDescription('Server is offline');
        
                return message.channel.send({ embeds: [embed] });
            }
            else{
                const pass = (query['passworded']) ? 'yes' : 'no';
                const embed = new EmbedBuilder()
                    .setColor(color)
                    .setTitle(`**${query['hostname']}**`)
                    .addFields(
                        {name: 'IP', value: `${options.host}:${options.port}`, inline: true},
                        {name: 'Jugadores', value: `${query['online'] || 0}/${query['maxplayers'] || 0}`, inline: true},
                        {name: 'Gamemode', value: query['gamemode'] || '-', inline: true},
                        {name: 'Mapa', value: query['rules']['mapname'] || '-', inline: true},
                        {name: 'Lenguaje', value: query['language'] || '-', inline: true},
                        {name: 'Clima', value: query['rules']['worldtime']+' - '+query['rules']['weather'], inline: true},
                        {name: 'Version', value: query['rules']['version'] || '-', inline: true},
                        {name: 'Contraseña', value: pass, inline: true},
                        {name: 'Link', value: `[${query['rules']['weburl']}](https://${query['rules']['weburl'] || 'https://sa-mp.com'})`, inline: true}
                    );
    
                return message.channel.send({ embeds: [embed] });
            }
        });
    }
}