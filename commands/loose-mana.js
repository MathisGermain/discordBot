const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('l-mp')
        .setDescription('Perdre du mana')
        .addIntegerOption(option =>
            option.setName("integer")
                .setDescription("Montant de mana")
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

        userData.ManaActuel = userData.ManaActuel - amountDamage;
        if(userData.ManaActuel < 0){
            userData.ManaActuel = 0;
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
            console.log("Tour " + x);
            if(x == 0){
                if(ratioMana>x){
                    customMana = customMana + "<:mstart:1025149998310109294>";
                }else{
                    customMana = customMana + "<:mvide:1025150013032124436>";
                }        
            }
            if(x == 9){
                if(ratioMana>x){
                    customMana = customMana + "<:mend:1025149974964617347>";
                }else{
                    customMana = customMana + "<:endvide:1025149810082320394>";
                }
            }else{
                if(ratioMana>x){
                    customMana = customMana + "<:mmid:1025149986532495402>";
                }else{
                    customMana = customMana + "<:midvide:1025149930962157570>";
                }
            }
        }

          const exampleEmbed = new EmbedBuilder()
          .setColor(0x0099FF)
          .setTitle(userData.nom +' a utilisé '+amountDamage+' points de mana 💧')
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