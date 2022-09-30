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
        console.log("Portrait : " + userData.Portrait);
        let ratioHP = userData.SanteActuel / userData.Sante * 10;
        let ratioMana = userData.ManaActuel / userData.Mana * 10;
        var customHp = "";
        var customMana = "";
        for(let x = 0; x < 10;x++){
            console.log("Tour " + x);
            if(x == 0){
                if(ratioHP>x){
                    customHp = customHp + "<:sstart:1025149897953005618>";
                }else{
                    customHp = customHp + "<:svide:1025149910896607232>";
                }
                if(ratioMana>x){
                    customMana = customMana + "<:mstart:1025149998310109294>";
                }else{
                    customMana = customMana + "<:mvide:1025150013032124436>";
                }        
            }
            if(x == 9){
                if(ratioHP>x){
                    customHp = customHp + "<:send:1025149961425399878>";
                }else{
                    customHp = customHp + "<:endvide:1025149810082320394>";
                }
                if(ratioMana>x){
                    customMana = customMana + "<:mend:1025149974964617347>";
                }else{
                    customMana = customMana + "<:endvide:1025149810082320394>";
                }
            }else{
                if(ratioHP>x){
                    customHp = customHp + "<:smid:1025149950633455717>";
                }else{
                    customHp = customHp + "<:midvide:1025149930962157570>";
                }
                if(ratioMana>x){
                    customMana = customMana + "<:mmid:1025149986532495402>";
                }else{
                    customMana = customMana + "<:midvide:1025149930962157570>";
                }
            }
        }
        const exampleEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(userData.nom)
        .setThumbnail(userData.Portrait)
        .addFields(
            { name: 'Race', value: userData.race, inline: true },
            { name: 'Classe', value: userData.classe, inline: true },
            { name: 'Niveau', value: '<:level:1025150843298795590>'+userData.niveau, inline: true },
            { name: '\u200B', value: '\u200B' },
            { name: 'Vie : ' + userData.SanteActuel+"/"+userData.Sante, value: customHp, inline: false },
            { name: 'Mana : ' + userData.ManaActuel+"/"+userData.Mana , value: customMana, inline: false },
            { name: '\u200B', value: '\u200B' },
            { name: '<:courage:1025155736298324019> Courage', value: userData.Courage, inline: true },
            { name: '<:force:1025149829820719114> Force', value: userData.Force, inline: true },
            { name: '<:adresse:1025149741597732894> Adresse', value: userData.Adresse, inline: true },
            { name: '<:intel:1025149849617838191> Intelligence', value: userData.Intelligence, inline: true },
            { name: '<:charisme:1025149787231768696> Charisme', value: userData.Charisme, inline: true },
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