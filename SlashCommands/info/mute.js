const { Client, ContextMenuInteraction, MessageEmbed } = require("discord.js");
const moment = require('moment')
moment.locale("tr");
const ms = require("ms");

module.exports = {
    name: "Ailevi Küfür 10 dk.",
    description: "kullanıcı mutelemeye yarar.",
    type: 'USER',
    /**
     *
     * @param {Client} client
     * @param {ContextMenuInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const user = await client.users.fetch(interaction.targetId)
        interaction.followUp({ content: `<@${user.id}> kullanıcısı metin kanallarında **Ailevi Küfür** nedeni ile susturulmuştur.`})
        user.roles.add(client.config.roles.muted)


        let channel = interaction.guild.channels.cache.get(client.config.logs.mutelog)
        let embed = new MessageEmbed().setAuthor(client.config.embed.sunucuAdı, interaction.guild.iconURL({dynamic: true}))
        .setDescription(`${user} kullanıcısı metin kanallarında ${interaction.user} tarafından **Ailevi Küfür** nedeni ile **10 dakika** boyunca susturulmuştur.\n\nMute Atılış Tarihi: \`${moment(Date.now()).format("LLL")}\`\nMute Bitiş Tarihi: \`${moment(Date.now() + ms("10m")).format("LLL")}\``)
        .setFooter(client.config.embed.authorTag)
        channel.send({ embeds: [embed]})
    }
};
