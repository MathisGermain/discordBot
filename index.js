const fs = require('fs');
const { Client , Collection , GatewayIntentBits } = require('discord.js');
const {token} = require('./config.json');

const handleCommand = require('./helpers/command');


const client = new Client({intents: [GatewayIntentBits.Guilds]});
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    console.log('Je suis prêt !');
});

client.on('interactionCreate', async interaction => {
    if (interaction.isCommand()) handleCommand(client, interaction);

    if (interaction.customId === 'CreateCharacter') {
		await interaction.reply({ content: 'Your submission was received successfully!' });
        const characterName = interaction.fields.getTextInputValue('nameInput');
	    const characterRace = interaction.fields.getTextInputValue('raceInput');
        const characterClasse = interaction.fields.getTextInputValue('classeInput');
        const characterLevel = interaction.fields.getTextInputValue('levelInput');
	    console.log({ characterName, characterRace, characterClasse, characterLevel });
	}
});

client.login(token);