const { Client , Collection , GatewayIntentBits } = require('discord.js');
const {token} = require('./config.json');

const fs = require('fs');

const handleCommand = require('./helpers/command');
const { data } = require('./commands/define-stats');


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
        const characterForce = interaction.fields.getTextInputValue('forceInput');
	      const characterCourage = interaction.fields.getTextInputValue('courageInput');
        const characterAgil = interaction.fields.getTextInputValue('agilInput');
        const characterIntel = interaction.fields.getTextInputValue('intelInput');
        const characterCharisme = interaction.fields.getTextInputValue('charismeInput');
        saveStats(characterForce,characterCourage,characterAgil,characterIntel,characterCharisme,interaction.user.tag);
		await interaction.reply({ content: 'Vos statistiques ont été définis' });
	}
});

function getUserConfig(userId){
    console.log("Get User Config : " + userId);
    return new Promise((resolve) => {
    fs.readFile("databases/Personnages/"+userId+".json", "utf8", (err, jsonString) => {
		if (err) {
			console.log("File read failed:", err);
      resolve("");
		}else{
        resolve(jsonString);
        }
    });
  });
}

async function saveCharacter(name,race,classe,level,userId){
   const newCharacterdata = {
        nom:name,
        race:race,
        classe:classe,
        niveau:level,
        Force:0,
        Courage:0,
        Adresse:0,
        Intelligence:0,
        Charisme:0,
        Sante:0,
        SanteActuel:0,
        Mana:0,
        ManaActuel:0

    }
    
    console.log(newCharacterdata);

    fs.writeFile("./databases/Personnages/"+userId+".json", JSON.stringify(newCharacterdata),(err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");

        }
      });
    console.log("Personnage enregistré");
}

async function saveStats(characterForce,characterCourage,characterAgil,characterIntel,characterCharisme,userId){
    var userDataString = await getUserConfig(userId);
    var userData  = JSON.parse(userDataString);
    console.log("Valeur retourné :" +userData);
    console.log("Vérification value : "+characterForce);
    userData.Force = characterForce;
    userData.Courage = characterCourage;
    userData.Adresse = characterAgil;
    userData.Charisme = characterCharisme;
    userData.Intelligence = characterIntel;
    
    console.log("UserData Modify : " + userData);
    
    
    fs.writeFile("./databases/Personnages/"+userId+".json", JSON.stringify(userData),(err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");
        }
      });
      
      
    console.log("Personnage enregistré");
    
}

client.login(token);