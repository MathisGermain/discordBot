const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('get-money')
        .setDescription('Ajoute de l\'or à votre bourse')
        .addIntegerOption(option =>
            option.setName("integer")
                .setDescription("Montant")
                .setMinValue(0)
                .setMaxValue(1000000)
                .setRequired(true)
                ),

    /**
     * 
     * @param {CommandInteraction} interaction 
     */    
    async execute(interaction){
        const amount = interaction.options.getInteger('integer');
        var userDataString = await getUserConfig(interaction.user.tag);
        var userData  = JSON.parse(userDataString);

            userData.Gold = userData.Gold + amount;

            fs.writeFile("./databases/Personnages/"+interaction.user.tag+".json", JSON.stringify(userData),(err) => {
                if (err)
                console.log(err);
                else {
                console.log("File written successfully\n");
                }
            });

            const exampleEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(userData.nom)
            .setThumbnail(userData.PortraitWin)
            .addFields(
                { name: 'A obtenu de l\'argent <:gold:1025150079738314793> ', value: amount+' pièces d\'or <:gold:1025387630894010459>', inline: true },
            );
            
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