const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');
const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('define-pictures')
        .setDescription('Définis les images du personnage'),

    /**
     * 
     * @param {CommandInteraction} interaction 
     */    
    async execute(interaction){
		
			const modal = new ModalBuilder()
				.setCustomId('definePictures')
				.setTitle('Vos portraits');
				

			const picInput = new TextInputBuilder()
				.setCustomId('picInput')
				.setLabel("Liens du Portrait du Personnage: ")
				.setStyle(TextInputStyle.Short); 
				
			const looseInput = new TextInputBuilder()
				.setCustomId('pic2Input')
				.setLabel("Liens du Portrait du Personnage Défaite: ")
				.setStyle(TextInputStyle.Short);

			const winInput = new TextInputBuilder()
                .setCustomId('pic3Input')
                .setLabel("Liens du Portrait du Personnage Victoire: ")
				.setStyle(TextInputStyle.Short);       
				    

			const actionRow1 = new ActionRowBuilder().addComponents(picInput);
			const actionRow2 = new ActionRowBuilder().addComponents(looseInput);
			const actionRow3 = new ActionRowBuilder().addComponents(winInput);
			modal.addComponents(actionRow1, actionRow2,actionRow3);
			interaction.showModal(modal);
		}
		

    

}