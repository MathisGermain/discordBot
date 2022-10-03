const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('new-battle')
        .setDescription('Initialise un nouveau combat'),

    /**
     * 
     * @param {CommandInteraction} interaction 
     */    
    async execute(interaction){
        var userDataString = await getUserConfig(interaction.user.tag);
        var userData  = JSON.parse(userDataString);

        const newCombatdata = {
            nom:"default",
            round:1,
            state:0,
            characterRound:-1,
            initiativeList:{}
        }
        fs.writeFile("./databases/Combats/combatInfo.json", JSON.stringify(newCombatdata),(err) => {
            if (err)
              console.log(err);
            else {
              console.log("File written successfully\n");
    
            }
          });
          interaction.deferReply();
          interaction.deleteReply();
          await interaction.channel.send('<:force:1025149829820719114> Un nouveau combat commence <:force:1025149829820719114>');
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