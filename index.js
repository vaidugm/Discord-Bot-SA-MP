const Discord = require('discord.js');
const fs = require('node:fs');
const TOKEN = ('MTAwODg5NTc5NTkzMzc1MzQ3NQ.GqWAKq.eTBa5jC0w6k67YT3TjrD48cZdOApQDAqX7kEAw');
require('colors');

ClientID = "1008895795933753475"
GuildIdD = "824375415258873917"

// definir cliente
const Client = new Discord.Client({
    intents: 3276799   
});


// contenido --------------------------------------------------------------------------------------------------

Client.on('ready', async (client) => {
    console.log('✅ Ready'.bgGreen)
});


//COMMAND HANDLER --------------------------------------------------------------------------------------------
Client.on("messageCreate", async ( message ) => {
    if(message.author.bot) return;
    if(!message.content.startsWith("!")) return;

    //HANDLER
    try {
        const command = message.content.toLowerCase().slice(1).split(' ')[0];
        console.log(command)
        const executecommand = require(`./commands/${command}.js`); // Comillas invertidas
        executecommand( message );
    } catch (error) {
        console.log(error)
    }
});
// SLASH HANDLER ---------------------------------------------------------------------------------------------

let commands = [];
fs.readdirSync('slash')
    .forEach((file) => {
        const command = require(`./slash/${file}`);
        commands.push(command.data.toJSON());
    });

const REST = new Discord.REST({version: '9'}).setToken(TOKEN);
(async () => {
    try{
        console.log('⏳ Actualizando los slashCommands (/).'.bgYellow);

        await REST.put(
            Discord.Routes.applicationGuildCommands(ClientID, GuildIdD),
            { body: commands },
        );

        console.log('✅ slashCommands actualizados!'.bgGreen)
    }catch(e){
        console.error(e);
    }
})();

// contenido -------------------------------------------------------------------------------------------------

// conectar
Client.login(TOKEN);