const { Client , Collection , GatewayIntentBits } = require('discord.js');
const {token} = require('./config.json');

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
        console.log(interaction.user.tag);
		await interaction.reply({ content: 'Votre personnage à été créer' });
        const characterName = interaction.fields.getTextInputValue('nameInput');
	    const characterRace = interaction.fields.getTextInputValue('raceInput');
        const characterClasse = interaction.fields.getTextInputValue('classeInput');
        const characterLevel = interaction.fields.getTextInputValue('levelInput');
	    console.log({ characterName, characterRace, characterClasse, characterLevel });
        saveCharacter(characterName,characterRace,characterClasse,characterLevel,interaction.user.tag);
	}

    if (interaction.customId === 'defineStats') {
        console.log(interaction.user.tag);
		await interaction.reply({ content: 'Vos statistiques ont été définis' });
        const characterForce = interaction.fields.getTextInputValue('forceInput');
	    const characterCourage = interaction.fields.getTextInputValue('courageInput');
        const characterAgil = interaction.fields.getTextInputValue('agilInput');
        const characterIntel = interaction.fields.getTextInputValue('intelInput');
        const characterCharisme = interaction.fields.getTextInputValue('charismeInput');
        saveStats(characterForce,characterCourage,characterAgil,characterIntel,characterCharisme,interaction.user.tag);
	}
});

function saveCharacter(name,race,classe,level,userId){
    data = {
        nom:name,
        race:race,
        classe:classe,
        niveau:level
    }
    
    console.log(data);

    fs.writeFile("./databases/Personnages/"+userId+".json", JSON.stringify(data),(err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");

        }
      });
    console.log("Personnage enregistré");
}

function saveStats(characterForce,characterCourage,characterAgil,characterIntel,characterCharisme,userId){
    data = {
        Force:characterForce,
        Courage:characterCourage,
        Adresse:characterAgil,
        Intelligence:characterIntel,
        Charisme:characterCharisme
    }
    
    console.log(data);
    fs.readFile("./databases/Personnages/"+userId+".json", "utf8", (err, jsonString) => {
		if (err) {
			console.log("File read failed:", err);
			return;
		}
        console.log("File data:", jsonString);
        const map = new Map(Object.entries(JSON.parse(jsonString)));
        console.log("map : ", map);
    });
    /*
    fs.writeFile("./databases/Personnages/"+userId+".json", JSON.stringify(data),(err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");

        }
      });
      */
    console.log("Personnage enregistré");
    
}

client.login(token);