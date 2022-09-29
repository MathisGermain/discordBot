const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('r-hp')
        .setDescription('Régenère des hp')
        .addIntegerOption(option =>
            option.setName("integer")
                .setDescription("Montant de la récupération")
                .setMinValue(0)
                .setMaxValue(1000000)
                .setRequired(true)
                ),

    /**
     * 
     * @param {CommandInteraction} interaction 
     */    
    async execute(interaction){
        const amountRegen = interaction.options.getInteger('integer');
        var userDataString = await getUserConfig(interaction.user.tag);
        var userData  = JSON.parse(userDataString);

        userData.SanteActuel = userData.SanteActuel + amountRegen;
        if(userData.SanteActuel > userData.Sante){
            userData.SanteActuel = userData.Sante;
        }

        fs.writeFile("./databases/Personnages/"+interaction.user.tag+".json", JSON.stringify(userData),(err) => {
            if (err)
              console.log(err);
            else {
              console.log("File written successfully\n");
            }
          });


        await interaction.reply(userData.nom+' a récupéré '+amountRegen+' points de vie. Sa santé actuelle est de : '+userData.SanteActuel+'/'+userData.Sante);
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