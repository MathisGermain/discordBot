const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');
const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Affiche les informations du personnage'),

    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction){

        var userDataString = await getUserConfig(interaction.user.tag);
        console.log("USERDATA INFO " + userDataString);
        var userData  = JSON.parse(userDataString);
        console.log("Verication fonction : " + userData);

        const exampleEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(userData.nom)
        .setThumbnail('https://i.imgur.com/AfFp7pu.png%27')
        .addFields(
            { name: 'Race', value: userData.race, inline: true },
            { name: 'Classe', value: userData.classe, inline: true },
            { name: '\u200B', value: '\u200B' },
            { name: 'Niveau', value: userData.niveau, inline: true },
            { name: '\u200B', value: '\u200B' },
            { name: 'Vie', value: userData.SanteActuel+"/"+userData.Sante, inline: true },
            { name: 'Mana', value: userData.ManaActuel+"/"+userData.Mana, inline: true },
            { name: '\u200B', value: '\u200B' },
            { name: 'Courage', value: userData.Courage, inline: true },
            { name: 'Force', value: userData.Force, inline: true },
            { name: 'Adresse', value: userData.Adresse, inline: true },
            { name: 'Intelligence', value: userData.Intelligence, inline: true },
            { name: 'Charisme', value: userData.Charisme, inline: true },
        )
        .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
            interaction.reply({ embeds: [ exampleEmbed ] });
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