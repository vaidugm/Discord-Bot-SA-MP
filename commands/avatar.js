module.export = async ( message ) => {
    const user = message.mentions.users.first() || message.author; // Menciones del mensaje

    const embed = {
        description: 'Avatar de $(user.username)',
        image: {url: user.displayAvatarURL({ dynamic: true, size: 1024})} // Función displayAvatarURL

    };
    message.reply({embeds: [embed]})
};