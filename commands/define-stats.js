const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');
const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('define-stats')
        .setDescription('Définis les statistiques du personnage'),

    /**
     * 
     * @param {CommandInteraction} interaction 
     */    
    async execute(interaction){

		const fs = require("fs");
		fs.readFile("./databases/Personnages/"+interaction.user.tag+".json", "utf8", (err, jsonString) => {
		if (err) {
			console.log("File read failed:", err);
			return;
		}else{
			console.log("File data:", jsonString);
			const modal = new ModalBuilder()
				.setCustomId('defineStats')
				.setTitle('Vos statistiques');
				

			const forceInput = new TextInputBuilder()
				.setCustomId('forceInput')
				.setLabel("Force : ")
				.setStyle(TextInputStyle.Short); 
				
			const courageInput = new TextInputBuilder()
				.setCustomId('courageInput')
				.setLabel("Courage : ")
				.setStyle(TextInputStyle.Short);

			const agilInput = new TextInputBuilder()
				.setCustomId('agilInput')
				.setLabel("Agilité : ")
				.setStyle(TextInputStyle.Short);       
				
			const intelInput = new TextInputBuilder()
				.setCustomId('intelInput')
				.setLabel("Intelligence : ")
				.setStyle(TextInputStyle.Short);     

			const charismeInput = new TextInputBuilder()
				.setCustomId('charismeInput')
				.setLabel("Charisme : ")
				.setStyle(TextInputStyle.Short);       

			const actionRow1 = new ActionRowBuilder().addComponents(courageInput);
			const actionRow2 = new ActionRowBuilder().addComponents(forceInput);
			const actionRow3 = new ActionRowBuilder().addComponents(agilInput);
			const actionRow4 = new ActionRowBuilder().addComponents(intelInput);
			const actionRow5 = new ActionRowBuilder().addComponents(charismeInput);
			modal.addComponents(actionRow1, actionRow2,actionRow3,actionRow4,actionRow5);
			interaction.showModal(modal);
		}
		});

    }

}
