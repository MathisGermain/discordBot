const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Passe au joueur suivant'),

    /**
     * 
     * @param {CommandInteraction} interaction 
     */    
    async execute(interaction){
        var combatDataString = await getBattleConfig();
        var combatData  = JSON.parse(combatDataString);

        var countPlace = Object.keys(combatData.initiativeList).length

        console.log("countPlace : " + countPlace + " roudcharact : " + combatData.characterRound)
        if(combatData.characterRound < countPlace-1){
            combatData.characterRound = combatData.characterRound + 1;
        }else{
            combatData.characterRound = 0;
            combatData.round = combatData.round + 1;
        }

          const exampleEmbed = new EmbedBuilder()
          .setColor(0x0099FF)
          .setTitle("Tour de " + combatData.initiativeList[combatData.characterRound].name)
          .addFields(
              { name: 'Information', value: " Go", inline: true },
          );




          fs.writeFile("./databases/Combats/combatInfo.json", JSON.stringify(combatData),(err) => {
            if (err)
              console.log(err);
            else {
              console.log("File written successfully\n");
    
            }
          });  

          
          interaction.deferReply();
          interaction.deleteReply();
          await interaction.channel.send({ embeds: [ exampleEmbed ] });  
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