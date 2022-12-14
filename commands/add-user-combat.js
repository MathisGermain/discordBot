const { SlashCommandBuilder, roleMention } = require('@discordjs/builders');
const { CommandInteraction,ActionRowBuilder, SelectMenuBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add-user')
        .setDescription('Ajoute un joueur au combat'),

    /**
     * 
     * @param {CommandInteraction} interaction 
     */    
    async execute(interaction){
        var combatDataString = await getBattleConfig();
        var combatData  = JSON.parse(combatDataString);
        var countPlace = Object.keys(combatData.initiativeList).length

        names = await readdirAsync("./databases/Personnages/");

        console.log(names);
        console.log("First Name", names[0]);
        console.log("Count Place : " + countPlace);

        var data = [];
        var nameList = [];

        for (const filename of names) {
          console.log(filename);
          var userDataString = await getUserConfig(filename);
          var userData = JSON.parse(userDataString);
          nameList.push(userData);
        }

        console.log("Data : " + nameList)
        str = JSON.stringify(nameList, null, 4); // (Optional) beautiful indented output.
        console.log(str); 


    const selectTest = new SelectMenuBuilder()
					.setCustomId('select')
					.setPlaceholder('Joueurs');

          

        var optionList = [];
        for(const user of nameList){
          optionList.push({
            label:user.nom,
            description:user.race,
            value:user.nom
          });
        } 

        str = JSON.stringify(optionList, null, 4);

        console.log("OptionList : " + str)
        
        selectTest.addOptions(optionList);

        console.log("OK Validé");


          const row = new ActionRowBuilder()
			    .addComponents(selectTest);

          interaction.deferReply();
          interaction.deleteReply();      
		      await interaction.channel.send({ content: '<:heal:1026614286639976478> Ajout d\'un joueur au combat', components: [row] });
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