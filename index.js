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

  if (interaction.customId === 'defineRessources') {
    console.log(interaction.user.tag);
    const maxHealth = interaction.fields.getTextInputValue('maxHealthInput');
    const health = interaction.fields.getTextInputValue('healthInput');
    const maxMana = interaction.fields.getTextInputValue('maxManaInput');
    const mana = interaction.fields.getTextInputValue('manaInput');
    saveRessources(maxHealth,health,maxMana,mana,interaction.user.tag)
await interaction.reply({ content: 'Vos ressources ont été définis' });
}

if (interaction.customId === 'definePictures') {
  console.log(interaction.user.tag);
  const portrait = interaction.fields.getTextInputValue('picInput');
  const portraitLoose = interaction.fields.getTextInputValue('pic2Input');
  const portraitWin = interaction.fields.getTextInputValue('pic3Input');
  savePictures(portrait,portraitLoose,portraitWin,interaction.user.tag)
await interaction.reply({ content: 'Vos ressources ont été définis' });
}

if (interaction.commandName === 'money') {
  const user = await client.users.fetch(interaction.user.id);
  var userDataString = await getUserConfig(interaction.user.tag);
  var userData  = JSON.parse(userDataString);
  await user.send('Vous possédez ' + userData.Gold +' pièces d\'or <:gold:1025387630894010459> dans votre bourse. Ainsi que ' +userData.GoldBank +' pièces d\'or <:gold:1025387630894010459> dans votre banque.');
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
        ManaActuel:0,
        Portrait:"https://i.imgur.com/jKvmpoC.jpeg",
        PortraitWin:"https://i.imgur.com/jKvmpoC.jpeg",
        PortraitLoose:"https://i.imgur.com/jKvmpoC.jpeg",

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

async function saveRessources(maxHealth,health,maxMana,mana,userId){
  var userDataString = await getUserConfig(userId);
  var userData  = JSON.parse(userDataString);
  console.log("Valeur retourné :" +userData);
  userData.Sante = maxHealth;
  userData.SanteActuel = health;
  userData.Mana = maxMana;
  userData.ManaActuel = mana;
  
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


async function savePictures(portrait,portraitLoose,portraitWin,userId){
  var userDataString = await getUserConfig(userId);
  var userData  = JSON.parse(userDataString);
  console.log("Valeur retourné :" +userData);
  userData.Portrait = portrait;
  userData.PortraitWin = portraitWin;
  userData.PortraitLoose = portraitLoose;
  
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