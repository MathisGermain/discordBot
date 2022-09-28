const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');
const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('define-ressources')
        .setDescription('Définis la Santé et le Mana du personnage'),

    /**
     * 
     * @param {CommandInteraction} interaction 
     */    
    async execute(interaction){
		/*
		const fs = require("fs");
		fs.readFile("./databases/Personnages/"+interaction.user.tag+".json", "utf8", (err, jsonString) => {
		if (err) {
			console.log("File read failed:", err);
			return;
		}else{
			console.log("File data:", jsonString);
		});	
		*/
			const modal = new ModalBuilder()
				.setCustomId('defineRessources')
				.setTitle('Santé et Mana');
				

			const maxHealthInput = new TextInputBuilder()
				.setCustomId('maxHealthInput')
				.setLabel("Santé Max : ")
				.setStyle(TextInputStyle.Short); 
				
			const healthInput = new TextInputBuilder()
				.setCustomId('healthInput')
				.setLabel("Santé actuelle : ")
				.setStyle(TextInputStyle.Short);

			const maxManaInput = new TextInputBuilder()
				.setCustomId('maxManaInput')
				.setLabel("Mana max : ")
				.setStyle(TextInputStyle.Short);       
				
			const manaInput = new TextInputBuilder()
				.setCustomId('manaInput')
				.setLabel("Mana actuelle : ")
				.setStyle(TextInputStyle.Short);         

			const actionRow1 = new ActionRowBuilder().addComponents(maxHealthInput);
			const actionRow2 = new ActionRowBuilder().addComponents(healthInput);
			const actionRow3 = new ActionRowBuilder().addComponents(maxManaInput);
			const actionRow4 = new ActionRowBuilder().addComponents(manaInput);
			modal.addComponents(actionRow1, actionRow2,actionRow3,actionRow4);
			interaction.showModal(modal);
		}
		

    

}
