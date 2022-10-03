const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add-user')
        .setDescription('Ajoute un joueur au combat')
        .addStringOption(option =>
            option.setName("name")
                .setDescription("Nom")
                .setRequired(true)
                ),

    /**
     * 
     * @param {CommandInteraction} interaction 
     */    
    async execute(interaction){
        const characterName = interaction.options.getString('name');
        var combatDataString = await getBattleConfig();
        var combatData  = JSON.parse(combatDataString);

        var countPlace = Object.keys(combatData.initiativeList).length

        console.log("Count Place : " + countPlace);

        combatData.initiativeList[countPlace] = {
            name : characterName
        };

        fs.writeFile("./databases/Combats/combatInfo.json", JSON.stringify(combatData),(err) => {
            if (err)
              console.log(err);
            else {
              console.log("File written successfully\n");
    
            }
          });
          
          interaction.deferReply();
          interaction.deleteReply();
          await interaction.channel.send('<:heal:1026614286639976478> '+ characterName + " à été ajouté au combat <:force:1025149829820719114>");
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

function getBattleConfig(){
    return new Promise((resolve) => {
    fs.readFile("databases/Combats/combatInfo.json", "utf8", (err, jsonString) => {
		if (err) {
			console.log("File read failed:", err);
      resolve("");
		}else{
        resolve(jsonString);
        }
    });
  });
}