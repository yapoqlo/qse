// Copyright (c) by Philip
// Licensed under the MIT License.

const Discord = require('discord.js');
const bot = new Discord.Client();
const { prefix, token, cookie, color } = require('./config.json'); // Get your token, prefix and cookie from here..
 const nblx = require("noblox.js"); // The module of roblox..
var groupId = 7445909 // Your group id

// To change the permissions go to line 30, 56, 99 ,127, 155, 176

// Logining in..
nblx.setCookie(cookie) // Logs into the acc
bot.on('ready', () => {
	console.log(`Nobloxjs bot is ready! and logged in as ${bot.user.tag}`); // Make bot online..
});


//  All the commands! do not edit ( you can edit msgs )

bot.on("message", message => {
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    if (command ===  "accept") {
        const member = message.author;
        const name = message.author.username;
        const url = member.displayAvatarURL();
        if(message.member.hasPermission('ADMINISTRATOR')) {
        if (!args[0]) {
            message.channel.send(":x: Please put member name!")
        } else {
            const mem = args[0];
            nblx.getIdFromUsername(mem).then(id => {
                if(!id){
                    message.channel.send(":x: I can't find that user in group requests!!");
                } else {
                    const embed = new Discord.MessageEmbed()
                    .setColor(`${color}`)
                    .setThumbnail(`https://www.roblox.com/bust-thumbnail/image?userId=${id}&width=420&height=420&format=png`)
                    .setTitle("Roblox Group Accepter")
                    .setDescription(`Accepted **${args}** (${id}) in the group!`)
                    nblx.handleJoinRequest(groupId, id, true)
                    message.channel.send(embed);
                }
            });
            console.log(args[0]);
        }
    } else {
        message.channel.send(":x: You don't have requied roles to use this command.");
    }
    }
    if (command === "promote") {
        const member = message.author;
        const name = message.author.username;
        const url = member.displayAvatarURL();
        if(message.member.hasPermission('ADMINISTRATOR')) { 
        if (!args[0]) {
            message.channel.send(":x: Please put member name!")
        } else {
            const mem = args[0];
            nblx.getIdFromUsername(mem).then(id => {
                if(!id){
                    message.channel.send(":x: I can't find that user in group!!");
                } else {
                    nblx.changeRank(groupId, id, 1)
                    const embed = new Discord.MessageEmbed()
                    .setColor(`${color}`)
                    .setThumbnail(`https://www.roblox.com/bust-thumbnail/image?userId=${id}&width=420&height=420&format=png`)
                    .setTitle("Roblox Group Promoter")
                    .setDescription(`Promoted **${args}** (${id}) in the group!`)
                    message.channel.send(embed);
                }
        });
    }
} else {
    message.channel.send(":x: You don't have requied roles to use this command.");
}
}

if (command === "help") {
    const member = message.author;
        const name = message.author.username;
        const url = member.displayAvatarURL();
        const embed = new Discord.MessageEmbed()
        .setColor(`${color}`)
        .setThumbnail(`${bot.user.displayAvatarURL()}`)
        .setTitle(`${bot.user.username} Commands`)
        .setDescription(`${prefix}help -- Shows command list\n${prefix}accept [player_name] -- Accepts player in group\n${prefix}promote [player_name] -- Promote that player by 1 rank\n${prefix}demote [player_name] -- Demote that player by 1 rank\n${prefix}shout [msg] -- Shouts the message on the group wall..\n${prefix}postwall [msg] -- Posts the msg on wall..\n${prefix}kick [player_Name] -- Kicks player from group.`)
        .setFooter(`${name}`,`${url}`)
        message.channel.send(embed);
}

if (command === "demote") {
    const member = message.author;
    const name = message.author.username;
    const url = member.displayAvatarURL();
    if(message.member.hasPermission('ADMINISTRATOR')) {
    if (!args[0]) {
        message.channel.send(":x: Please put member name!")
    } else {
        const mem = args[0];
        nblx.getIdFromUsername(mem).then(id => {
            if(!id){
                message.channel.send(":x: I can't find that user in group!!");
            } else {
                nblx.changeRank(groupId, id, -1)
                const embed = new Discord.MessageEmbed()
                .setColor(`${color}`)
                .setThumbnail(`https://www.roblox.com/bust-thumbnail/image?userId=${id}&width=420&height=420&format=png`)
                .setTitle("Roblox Group Demoter")
                .setDescription(`Demoted **${args}** (${id}) in the group!`)
                message.channel.send(embed);
            }
    });
}
} else {
message.channel.send(":x: You don't have requied roles to use this command.");
}
}

if (command === "kick") {
    const member = message.author;
    const name = message.author.username;
    const url = member.displayAvatarURL();
    if(message.member.hasPermission('ADMINISTRATOR')) {
    if (!args[0]) {
        message.channel.send(":x: Please put member name!")
    } else {
        const mem = args[0];
        nblx.getIdFromUsername(mem).then(id => {
            if(!id){
                message.channel.send(":x: I can't find that user in group!!");
            } else {
                nblx.exile(groupId, id)
                const embed = new Discord.MessageEmbed()
                .setColor(`${color}`)
                .setThumbnail(`https://www.roblox.com/bust-thumbnail/image?userId=${id}&width=420&height=420&format=png`)
                .setTitle("Roblox Group Kicker")
                .setDescription(`**${args}** (${id}) is now kicked from the group!`)
                message.channel.send(embed);
            }
    });
}
} else {
message.channel.send(":x: You don't have requied roles to use this command.");
}
}

if (command === "shout") {
    const member = message.author;
    const name = message.author.username;
    const url = member.displayAvatarURL();
    if(message.member.hasPermission('ADMINISTRATOR')) { 
    if (!args[0]) {
        message.channel.send(":x: Please put the message!")
    } else {
        const embed = new Discord.MessageEmbed()
                .setColor(`${color}`)
                .setThumbnail(`${nblx.getLogo(groupId)}`)
                .setTitle("Roblox Group Announcer")
                .setDescription(`Successfully announced: **${args}** in group shout!`)
                message.channel.send(embed);
                nblx.shout({ group: groupId, message: `${args}` })
    }
    } else {
        message.channel.send(":x: You don't have requied roles to use this command.");
    }
}

if (command === "postwall") {
    const member = message.author;
    const name = message.author.username;
    const url = member.displayAvatarURL();
    if(message.member.hasPermission('ADMINISTRATOR')) {  // Change role name here
    if (!args[0]) {
        message.channel.send(":x: Please put the message!")
    } else {
        const embed = new Discord.MessageEmbed()
                .setColor(`${color}`)
                .setThumbnail(`${nblx.getLogo(groupId)}`)
                .setTitle("Roblox Group Wall")
                .setDescription(`Successfully posted: **${args}** on the group wall!`)
                message.channel.send(embed);
                nbx.post(groupId, `${args}`)
    }
    } else {
        message.channel.send(":x: You don't have requied roles to use this command.");
    }
}

});

// Starts the bot
bot.login(token);
