const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('talk')
        .setDescription('Parler')
        .addStringOption(option =>
            option.setName("message")
                .setDescription("Message")
                .setRequired(true)
                ),

    /**
     * 
     * @param {CommandInteraction} interaction 
     */    
    async execute(interaction){
        const message = interaction.options.getString('message');

        var userDataString = await getUserConfig(interaction.user.tag);
        var userData  = JSON.parse(userDataString);

          const exampleEmbed = new EmbedBuilder()
          .setColor(0x0099FF)
          .setTitle(userData.nom)
          .setThumbnail(userData.Portrait)
          .addFields(
              { name: 'Parle', value: message, inline: true },
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