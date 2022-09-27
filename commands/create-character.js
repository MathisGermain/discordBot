const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');
const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create-character')
        .setDescription('Creer un personnage pour le JDR'),

    /**
     * 
     * @param {CommandInteraction} interaction 
     */    
    async execute(interaction){
        const modal = new ModalBuilder()
			.setCustomId('CreateCharacter')
			.setTitle('Création de personnage');

		// Add components to modal

		// Create the text input components
		const nameInput = new TextInputBuilder()
			.setCustomId('nameInput')
		    // The label is the prompt the user sees for this input
			.setLabel("Nom :")
		    // Short means only a single line of text
			.setStyle(TextInputStyle.Short);

		const classeInput = new TextInputBuilder()
			.setCustomId('classeInput')
			.setLabel("Classe : ")
		    // Paragraph means multiple lines of text.
			.setStyle(TextInputStyle.Short);

        const raceInput = new TextInputBuilder()
			.setCustomId('raceInput')
			.setLabel("Race : ")
		    // Paragraph means multiple lines of text.
			.setStyle(TextInputStyle.Short);
            
        const levelInput = new TextInputBuilder()
		    .setCustomId('levelInput')
			.setLabel("Niveau : ")
		    // Paragraph means multiple lines of text.
			.setStyle(TextInputStyle.Short);   
            
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
		const actionRow1 = new ActionRowBuilder().addComponents(nameInput);
		const actionRow2 = new ActionRowBuilder().addComponents(raceInput);
        const actionRow3 = new ActionRowBuilder().addComponents(classeInput);
        const actionRow4 = new ActionRowBuilder().addComponents(levelInput);
        /*
        const actionRow5 = new ActionRowBuilder().addComponents(courageInput);
        const actionRow6 = new ActionRowBuilder().addComponents(forceInput);
        const actionRow7 = new ActionRowBuilder().addComponents(agilInput);
        const actionRow8 = new ActionRowBuilder().addComponents(intelInput);
        const actionRow9 = new ActionRowBuilder().addComponents(charismeInput);
        */
		// Add inputs to the modal
		modal.addComponents(actionRow1, actionRow2,actionRow3,actionRow4);

		// Show the modal to the user
		await interaction.showModal(modal);

    }

}



