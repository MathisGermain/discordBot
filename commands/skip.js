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

        while(combatData.initiativeList[combatData.characterRound].statut == "dead"){
          if(combatData.characterRound < countPlace-1){
            combatData.characterRound = combatData.characterRound + 1;
          }else{
              combatData.characterRound = 0;
              combatData.round = combatData.round + 1;
          }
        }


          fs.writeFile("./databases/Combats/combatInfo.json", JSON.stringify(combatData),(err) => {
            if (err)
              console.log(err);
            else {
              console.log("File written successfully\n");
    
            }
          });  

          
          interaction.deferReply();
          interaction.deleteReply();
            if(combatData.initiativeList[combatData.characterRound].type == "player"){
              await interaction.channel.send("<:roleplaying:1026638227307761664><:sandclock:1026638358019051570><:cube:1026638242893803602> Tour de " + combatData.initiativeList[combatData.characterRound].name + " <:cube:1026638242893803602><:sandclock:1026638358019051570><:roleplaying:1026638227307761664>                <:stopwatch:1026638305422491688> Tour "+combatData.round+" <:stopwatch:1026638305422491688>");  
            }else{
              await interaction.channel.send("<:assasin:1027531702567977020><:sandclock:1026638358019051570><:demoniste:1027531718095278080> Tour de " + combatData.initiativeList[combatData.characterRound].name + " <:demoniste:1027531718095278080><:sandclock:1026638358019051570><:assasin:1027531702567977020>                <:stopwatch:1026638305422491688> Tour "+combatData.round+" <:stopwatch:1026638305422491688>");  
            }
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