const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('choice')
        .setDescription('Permet de faire un choix')
        .addStringOption(option => 
            option.setName('choice')
            .setDescription('Le choix à faire')
            .setRequired(true)
            .addChoices(
				{ name: 'Option 1', value: '1' },
				{ name: 'Option 2', value: '2' },
				{ name: 'Option 3', value: '3' },
			)),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const choice = interaction.options.getString('choice');

        await interaction.reply(choice);
    }
}