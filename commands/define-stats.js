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
        const modal = new ModalBuilder()
			.setCustomId('defineStats')
			.setTitle('Vos statistiques');

		// Add components to modal
		// Create the text input components

        const forceInput = new TextInputBuilder()
		    .setCustomId('forceInput')
			.setLabel("Force : ")
		    // Paragraph means multiple lines of text.
			.setStyle(TextInputStyle.Short); 
            
        const courageInput = new TextInputBuilder()
		    .setCustomId('courageInput')
			.setLabel("Courage : ")
		    // Paragraph means multiple lines of text.
			.setStyle(TextInputStyle.Short);

        const agilInput = new TextInputBuilder()
		    .setCustomId('agilInput')
			.setLabel("Agilité : ")
		    // Paragraph means multiple lines of text.
			.setStyle(TextInputStyle.Short);       
            
        const intelInput = new TextInputBuilder()
		    .setCustomId('intelInput')
			.setLabel("Intelligence : ")
		    // Paragraph means multiple lines of text.
			.setStyle(TextInputStyle.Short);     

        const charismeInput = new TextInputBuilder()
		    .setCustomId('charismeInput')
			.setLabel("Charisme : ")
		    // Paragraph means multiple lines of text.
			.setStyle(TextInputStyle.Short);       

		// An action row only holds one text input,
		// so you need one action row per text input.
        const actionRow1 = new ActionRowBuilder().addComponents(courageInput);
        const actionRow2 = new ActionRowBuilder().addComponents(forceInput);
        const actionRow3 = new ActionRowBuilder().addComponents(agilInput);
        const actionRow4 = new ActionRowBuilder().addComponents(intelInput);
        const actionRow5 = new ActionRowBuilder().addComponents(charismeInput);
        
		// Add inputs to the modal
		modal.addComponents(actionRow1, actionRow2,actionRow3,actionRow4,actionRow5);

		// Show the modal to the user
		await interaction.showModal(modal);

    }

}
