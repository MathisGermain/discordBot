const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Renvoie le nombre de ping'),

    /**
     * 
     * @param {CommandInteraction} interaction 
     */    
    async execute(interaction){
        await interaction.reply('Pong');
        const message = await interaction.fetchReply();
        
        return interaction.editReply("Le message à mis ${message.createdTimestamp - interaction.createdTimestamp} ms pour me parvenir");
    }
}