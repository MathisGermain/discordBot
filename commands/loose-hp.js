const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('l-hp')
        .setDescription('Perdre des hp')
        .addIntegerOption(option =>
            option.setName("integer")
                .setDescription("Montant des dégats")
                .setMinValue(0)
                .setMaxValue(1000000)
                .setRequired(true)
                ),

    /**
     * 
     * @param {CommandInteraction} interaction 
     */    
    async execute(interaction){
        const amountDamage = interaction.options.getInteger('integer');
        console.log("Montant des dammages : " + amountDamage);

        var userDataString = await getUserConfig(interaction.user.tag);
        console.log("USERDATA HP " + userDataString);
        var userData  = JSON.parse(userDataString);
        console.log("Verication fonction : " + userData);

        userData.SanteActuel = userData.SanteActuel - amountDamage;
        if(userData.SanteActuel < 0){
            userData.SanteActuel = 0;
        }

        fs.writeFile("./databases/Personnages/"+interaction.user.tag+".json", JSON.stringify(userData),(err) => {
            if (err)
              console.log(err);
            else {
              console.log("File written successfully\n");
            }
          });


        await interaction.reply(userData.nom+' a perdu '+amountDamage+' points de vie. Sa santé actuelle est de : '+userData.SanteActuel+'/'+userData.Sante);
    }
}

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