const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('r-mp')
        .setDescription('Régenère du mana')
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

        userData.ManaActuel = userData.ManaActuel + amountRegen;
        if(userData.ManaActuel > userData.Mana){
            userData.ManaActuel = userData.Mana;
        }

        fs.writeFile("./databases/Personnages/"+interaction.user.tag+".json", JSON.stringify(userData),(err) => {
            if (err)
              console.log(err);
            else {
              console.log("File written successfully\n");
            }
          });
          
        let ratioMana = userData.ManaActuel / userData.Mana * 10;
        var customMana = "";
        for(let x = 0; x < 10;x++){
            if(ratioMana>x){
                customMana = customMana + "💙";
            }else{
                customMana = customMana + "🖤";
            }
        }

          const exampleEmbed = new EmbedBuilder()
          .setColor(0x0099FF)
          .setTitle(userData.nom +' a récupéré '+amountRegen+' points de mana 💧')
          .setThumbnail(userData.PortraitWin)
          .addFields(
              { name: 'Son mana actuel est de : '+userData.ManaActuel+'/'+userData.Mana, value: customMana, inline: true },
          );
          await interaction.reply({ embeds: [ exampleEmbed ] });  
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