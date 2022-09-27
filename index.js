const { Client , Collection , GatewayIntentBits } = require('discord.js');
const {token} = require('./config.json');
const databases = {
    characters: require('./databases/characters.json')
};

const fs = require('fs');

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
		await interaction.reply({ content: 'Votre personnage à été créer' });
        const characterName = interaction.fields.getTextInputValue('nameInput');
	    const characterRace = interaction.fields.getTextInputValue('raceInput');
        const characterClasse = interaction.fields.getTextInputValue('classeInput');
        const characterLevel = interaction.fields.getTextInputValue('levelInput');
	    console.log({ characterName, characterRace, characterClasse, characterLevel });
        saveCharacter(characterName,characterRace,characterClasse,characterLevel);
	}
});

function saveCharacter(name,race,classe,level){
    databases.characters[name] = {
        race:race,
        classe:classe,
        niveau:level
    }
    const data = JSON.stringify(databases.characters);
    console.log("data")
    fs.writeFile("./databases/characters.json", JSON.stringify(databases.characters),(err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");
        }
      });
    console.log("Personnage enregistré");
}

client.login(token);