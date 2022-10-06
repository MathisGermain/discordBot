const { SlashCommandBuilder, roleMention } = require('@discordjs/builders');
const { CommandInteraction,ActionRowBuilder, SelectMenuBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kill')
        .setDescription('Tue un ennemis'),

    /**
     * 
     * @param {CommandInteraction} interaction 
     */    
    async execute(interaction){
        var combatDataString = await getBattleConfig();
        var combatData  = JSON.parse(combatDataString);
        str = JSON.stringify(combatData, null, 4); // (Optional) beautiful indented output.
        console.log(str);
        var nameList = [];


        for(var key in combatData.initiativeList) {
            console.log("Key : " + key);
            console.log("Check : " + combatData.initiativeList[key].name);
            nameList.push(combatData.initiativeList[key].name);
         }

        console.log("Data : " + nameList)
        str = JSON.stringify(nameList, null, 4); // (Optional) beautiful indented output.
        console.log(str); 


        const selectTest = new SelectMenuBuilder()
					.setCustomId('select-kill')
					.setPlaceholder('Cible');

          

        var optionList = [];
        for(const user of nameList){
          optionList.push({
            label:user,
            description:user,
            value:user
          });
        } 

        str = JSON.stringify(optionList, null, 4);
        console.log("List " + str);
        selectTest.addOptions(optionList);


          const row2 = new ActionRowBuilder()
			    .addComponents(selectTest);

          interaction.deferReply();
          interaction.deleteReply();      
		    await interaction.channel.send({ content: '<:coeur:1027576100580241541> Qui avez vous vaincu ?', components: [row2] });
  }
}

function readdirAsync(path) {
  return new Promise(function (resolve, reject) {
    fs.readdir(path, function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

function getUserConfig(filePath){
    return new Promise((resolve) => {
    fs.readFile("databases/Personnages/"+filePath, "utf8", (err, jsonString) => {
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

function readFiles(dirname){
    var data = [];
    fs.promises.readdir(dirname, (err,files) => {
      if (err) {
      console.log(err);
      } else {
        files.forEach(filename => {
          console.log("DirFIle : " + dirname + filename);
            data.push(dirname + filename);
        });
      }
    });
  }