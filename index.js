const Discord = require('discord.js')
const Cayde = new Discord.Client()
const prefix = "``"
const Music = require('discord.js-musicbot-addon')
const createEmbed = require('embed-creator')
const coinflip = require('coinflip')
const roller = require('roller')

const music = new Music(Cayde, {
  prefix: prefix,
  maxQueueSize: "20",
  helpCmd: 'musichelp',
  ownerOverMember: true,
  botOwner: process.env.OWNER_ID,
  youtubeKey: process.env.YT_API_KEY,
  requesterName: true,
  disableHelp: true,
  embedColor: "#FFD1DC"
});

//eval function, don't touch ever thanks
function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

const http = require('http');
const express = require('express');
const app = express();
//Date.now returns a time in Unix Seconds, find a way to get a timestamp that isn't Unix.
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping received!");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000)

Cayde.login(process.env.TOKEN)

Cayde.on('ready', () => {

    console.log(`Master of incompetence, Cayde-6, reporting for duty! Currently serving ${Cayde.guilds.size} servers!`)
    Cayde.user.setActivity(`over ${Cayde.guilds.size} servers!`, { type: 'WATCHING' })
    .then(console.log(`Activity set to "Watching over ${Cayde.guilds.size} servers!"!`))
    .catch(console.error);
    Cayde.user.setStatus("online")
})

Cayde.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name}, with ID: ${guild.id}. This guild has ${guild.memberCount} members!`)
  Cayde.user.setActivity(`over ${Cayde.guilds.size} servers!`, { type: 'WATCHING' })
    .then(console.log(`Activity set to "Watching over ${Cayde.guilds.size} servers!"!`))
    .catch(console.error);
});

Cayde.on("guildDelete", guild => {
  console.log(`Removed from: ${guild.name}, with ID: ${guild.id}.`)
  Cayde.user.setActivity(`over ${Cayde.guilds.size} servers!`, { type: 'WATCHING' })
    .then(console.log(`Activity set to "Watching over ${Cayde.guilds.size} servers!"!`))
    .catch(console.error);
})

Cayde.on('guildMemberAdd', member => {
  member.send(`Welcome to ${member.guild.name}, " + member.displayName + "! If you need help using me, use ``help in any channel that allows bot replies, and I'll send a DM containing all of my commands!`)
})

Cayde.on("message", message => {

    let cmdUser = message.guild.member(message.author)
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let wrongPerm = "You don't have the right permissions. **Leave me alone.**"
    
    if(message.author.bot) return;
  
    if(cmd === `${prefix}help`)
        {
            let helpEmbed = new Discord.RichEmbed()
            .setDescription("_~Regular Commands~_")
            .setColor("#58BED4")
            .addField("Hello, Guardian!", "If you need help, you've come to the right place! Here is a full list of usable commands! Just... before we get into this, my prefix is two backticks (``). Got that? Let's go, then!")
            .addField("General Use:", "These are commands that are usable by the average user.")
            .addField("help:", "Well... Isn't it obvious what this command does? You just used it, so I mean..")
            .addField("ping:", "Pings me, mostly just to annoy me. I reply with a timestamp as well, by the way.")
            .addField("info:", "Brings up an embed on info with me! More things coming on it soon, though.")
            .addField("invite:", "Brings up an invite link that you can use!")
            .addField("getavatar (@user):", "Gets a high-quality picture of the mentioned user's avatar!")
            .addField("servericon:", "Get the icon of the server, currently pretty low-resolution.")
            .addField("8ball:", "Ask my magic 8-ball a question, and get an answer! Answer pool is pretty shallow right now, though. ~~Actually, I'm just asking Eris' weird rock for you, but that's beside the point.~~")
            .addField("coinflip:", "With this command, I'll... flip a coin. What else do you want from me?")
            .addField("roll (amount of dice)d(maximum value):", "Give me the amount of dice to roll, and the maximum value on said dice, and I'll roll for you!")
            .addField("musichelp:", "Gets the music commands!")
            .addField("userinfo (@user)", "Get basic information on a user!")
            .addField("serverinfo", "Get basic information on a server!")
            .addField("say", "Make me say something! Also, spoiler alert: If you're gonna use this command to try and use the eval command, you're out of luck. Even I can't use that command!")
            .addField("Administrative Use:", "These are commands usable by people with the permissions mentioned in the field.")
            .addField("kick (@user) (reason):", "Easily kick a user from the server! `A minimum of the 'KICK_MEMBERS' permission is required.`")
            .addField("ban (@user) (reason):", "Easily ban a user from the server! `A minimum of the 'BAN_MEMBERS' permission is required.`")
            .addField("purge (@user [optional]) (amount):", "Purge the amount of messages specified, or even throw in an @mention in there to delete the messages from the mentioned user! `Requires a minimum of the 'MANAGE_MESSAGES' permission to use.`")
            .addField("And that's about it!", "Have fun using me!")
            
            message.channel.send(helpEmbed)
        }
    else if(cmd === `${prefix}musichelp`)
        {
          let musicHelpEmbed = new Discord.RichEmbed()
          .setDescription("_~Music Commands~_")
          .setColor("#58BED4")
          .addField("Here're some music commands for you!","Remember, my prefix is two backticks (``). Also, if the music randomly stops while you're listening to it, that would be my creator working on me. ~~Sorry, not sorry.~~")
          .addField("search `(query)`:", "Brings back 10 results related to the query.")
          .addField("play `<URL | search query>`:", "Queue/play a song or playlist via URL, or listen to the first result from the search query!")
          .addField("skip `(amount)`:", "Skip a song, or multiple songs depending on what you made the amount!")
          .addField("queue:", "Get the current queue of songs!")
          .addField("pause:", "Pause the current queue!")
          .addField("resume:", "Resume the current queue!")
          .addField("clearqueue:", "Clear the queue!")
          .addField("np:", "Get information on the current song!")
          .addField("loop:", "Loop all songs in the queue! `Note: using the skip command will remove loop status`")
          .addField("leave:", "If you use this, I'll leave the voice channel.")
          
          message.channel.send(musicHelpEmbed)
        }
    else if(cmd === `${prefix}ping`)
        {
            let pingTime = new Date().getTime() - message.createdTimestamp
            
            console.log(`Ping request sent by ` + message.author + `, sending reply...`)
            message.channel.send("This message took " + pingTime + " ms to get to me, and for me to reply!")
            console.log(`Ping sent, and it took ` + pingTime + `ms to get the news and reply.`)
        }
    else if(cmd === `${prefix}info`)
        {
          message.channel.send(createEmbed(
        "#58BED4", {"name": "CaydeBot", "icon_url": "https://vignette.wikia.nocookie.net/destinypedia/images/2/24/Cayde-6.png/revision/latest?cb=20140622223202", "url": "https://destiny.wikia.com/Cayde-6"}, "I'm a bot.", "Nice to meet you, Guardian.",
        [{"name": "Who, or what, am I?", "value": "I am CaydeBot, a bot designed to do many things. I'm being designed to be a mostly administrative bot, with other features being in the works. I'm still a major work in progress project, unfortunately. I'll be completed eventually, though."},
         {"name": "Who created me?", "value": "That's a question I can't answer right now."}],
        {"text": "Is this the footer?"},
        {"thumbnail": "https://vignette.wikia.nocookie.net/destinypedia/images/2/24/Cayde-6.png/revision/latest?cb=20140622223202"}, true
      ));
        }
    else if(cmd === `${prefix}invite`)
        {
          message.channel.send("You can invite me to your server with this link. https://discordapp.com/api/oauth2/authorize?client_id=423794875390099456&permissions=8&scope=bot")
        }
    else if(cmd === `${prefix}getavatar`)
        {
            let userAvatarToGet = message.mentions.members.first()
            if(!userAvatarToGet)
            {
              return message.channel.send("Whose avatar do you want to get?")
            }
            else
            {
              Cayde.fetchUser(userAvatarToGet).then(userAvatarToGet => {
              console.log(userAvatarToGet.displayAvatarURL + ", got the user's avatar! Posting now...")
              message.channel.send(userAvatarToGet.displayAvatarURL)
              .catch(console.error)
              
            });
            }
        }
    else if(cmd === `${prefix}coinflip`)
    {
      if(coinflip())
      {
        message.channel.send("And the coin says... Heads!")
      }
      else
      {
        message.channel.send("And the coin says... Tails!")
      }
    }
  else if(cmd === `${prefix}roll`)
      {
        var match_data = message.content.match(/^\``roll ([1-9][0-9]*)d([1-9][0-9]*)/);

        if(match_data) {
          var n_dice = parseInt(match_data[1], 10);
          var n_sides = parseInt(match_data[2], 10);

        if(n_dice > 50) {
            message.channel.send("<@" + message.author.id + ">, unfortunately for you, I'm too lazy to do that. That's too many dice for me to roll, so go away.");
          return;
        }

    console.log("rolling " + n_dice + "d" + n_sides);
    var dice = roller.roll(n_dice, n_sides);

    var sum;

    if(n_dice > 1) {
      sum = dice.reduce(function(prev, curr) {
        return prev + curr;
      });

      message.channel.send("<@" + message.author.id + ">, your dice rolls are: " + dice.join(" + ") + " = (" + sum + ")");
    } else {
      message.channel.send(message.sender + ": " + dice[0]);
    }

    if(message_content.length > 2000) {
      var sum_message = "The length of the response exceeds Discord's message length limit. However, the sum of the rolls was " + sum;

      Cayde.sendMessage(sum_message);
      return;
    }
    }
      }
    else if(cmd === `${prefix}kick`)
        {
          let kickedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
          
          if(!cmdUser.hasPermission("BAN_MEMBERS"))
              return message.channel.send(wrongPerm);
          if(!kickedUser.kickable)
            return message.channel.send("You can't actually kick this person, so... Sorry to disappoint.")
          if(!kickedUser)
              return message.channel.send("Who, uh... Who are you trying to kick?");
          let kickReason = args.join(" ").slice(22);
          if(!kickReason)
          {
            let noKickReason = "No reason was given to me."
            
          let kickEmbed = new Discord.RichEmbed()
          .setDescription("_~Kick~_")
          .setColor("#58BED4")
          .addField("Kicked User", `${kickedUser.displayName}, with ID ${kickedUser.id}`)
          .addField("Kicked By", `${cmdUser.displayName}, with ID ${cmdUser.id}`)
          .addField("Kicked In", message.channel.name)
          .addField("Time", message.createdAt)
          .addField("Reason", noKickReason);
            
            message.guild.member(kickedUser).kick(noKickReason)
            message.channel.send(kickEmbed)
          }
        
          let kickEmbed = new Discord.RichEmbed()
          .setDescription("_~Kick~_")
          .setColor("#58BED4")
          .addField("Kicked User", `${kickedUser.displayName}, with ID ${kickedUser.id}`)
          .addField("Kicked By", `${cmdUser.displayName}, with ID ${cmdUser.id}`)
          .addField("Kicked In", message.channel.name)
          .addField("Time", message.createdAt)
          .addField("Reason", kickReason);
  
          message.guild.member(kickedUser).kick(kickReason);
          message.channel.send(kickEmbed);

          kickedUser.send("Nice job, you got kicked. Next time is a ban. **Watch your footing.**")
          .catch(() => message.channel.send("I couldn't send the kick message. And that makes me sad."))
          return;
        }
    
        else if(cmd === `${prefix}ban`)
        {
    
          let bannedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
          if(!cmdUser.hasPermission("BAN_MEMBERS"))
              return message.channel.send(wrongPerm);
          if(!bannedUser.bannable)
            return message.channel.send("You can't actually ban this person, so... Sorry to disappoint.")
          if(!bannedUser)
              return message.channel.send("Who, uh... Who are you trying to ban, exactly?");
          let banReason = args.join(" ").slice(22);
          if(!banReason)
          {
            let noBanReason = "No reason was given to me."
            
          let banEmbed = new Discord.RichEmbed()
          .setDescription("_~Ban~_")
          .setColor("#58BED4")
          .addField("Banned User", `${bannedUser.displayName} with ID ${bannedUser.id}`)
          .addField("Banned By", `${cmdUser.displayName}, with ID ${cmdUser.id}`)
          .addField("Banned In", message.channel.name)
          .addField("Time", message.createdAt)
          .addField("Reason", noBanReason);
            message.guild.member(bannedUser).ban(noBanReason);
            message.channel.send(banEmbed)
          }
    
          let banEmbed = new Discord.RichEmbed()
          .setDescription("_~Ban~_")
          .setColor("#58BED4")
          .addField("Banned User", `${bannedUser.displayName} with ID ${bannedUser.id}`)
          .addField("Banned By", `${cmdUser.displayName}, with ID ${cmdUser.id}`)
          .addField("Banned In", message.channel.name)
          .addField("Time", message.createdAt)
          .addField("Reason", banReason);

          message.guild.member(bannedUser).ban(banReason);
          message.channel.send(banEmbed);
    
          bannedUser.send("Great job there, genius. You got banned from the server. :clap: :clap:")
          .catch(() => message.channel.send("I couldn't send the ban message. And that makes me sad."))
          return;
        }
        else if(cmd === `${prefix}purge`)
        {
          const user = message.mentions.members.first();
          const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
          
          if(cmdUser.hasPermission("MANAGE_MESSAGES"))
          {
          if(!amount) return message.reply('Must specify an amount to delete!');
          if(!amount && !user) return message.reply('Must specify a user and amount, or just an amount, of messages to purge!');
          
          message.channel.fetchMessages({
          limit: amount,
          })
          .then((messages) => {
          if (user)
          {
          const filterBy = user ? user.id : Cayde.user.id;
          messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
          }
          message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
          });
          }
          else if(!cmdUser.hasPermission("MANAGE_MESSAGES"))
          {
            message.channel.send(wrongPerm)
          }
        }
      else if(cmd === `${prefix}userinfo`)
      {
    let userInfoToGet = message.mentions.members.first()
    
    if(!userInfoToGet)
      {
        let userInfo = new Discord.RichEmbed()
        .setDescription("User: " + message.sender + " `(" +  + message.sender.id + ")`")
        .setColor("#58BED4")
        .setThumbnail(message.sender.defaultAvatarURL)
        .addField("Online Status:", message.sender.presence.status, true)
        .addField("Joined Server:", message.sender.joinedAt, true)
        .addField("Name Color:", message.sender.displayHexColor, true)
        .addField("Current Game:", message.sender.game, true)

        message.channel.send(userInfo)
      }
    
    let userInfo = new Discord.RichEmbed()
    .setDescription("User: " + userInfoToGet.displayName + " `(" +  + userInfoToGet.id + ")`")
    .setColor("#58BED4")
    .setThumbnail(userInfoToGet.defaultAvatarURL)
    .addField("Online Status:", userInfoToGet.presence.status, true)
    .addField("Joined Server:", userInfoToGet.joinedAt, true)
    .addField("Name Color:", userInfoToGet.displayHexColor, true)
    .addField("Current Game:", userInfoToGet.game, true)
    
    message.channel.send(userInfo)
  }
      else if(cmd === `${prefix}serverinfo`)
        {
          let guildInfo = new Discord.RichEmbed()
          .setDescription("Server: " + message.guild.name + " (" + message.guild.id + ")")
          .setColor("#58BED4")
          .setThumbnail(message.guild.iconURL)
          .addField("Created On:", message.guild.createdAt, true)
          .addField("Server Region:", message.guild.region, true)
          .addField("Member Count:", message.guild.memberCount, true)
          .addField("Owner:", message.guild.owner.displayName, true)
          
          message.channel.send(guildInfo)
        }
      else if(cmd === `${prefix}servericon`)
        {
          message.channel.send(message.guild.serverURL)
        }
        else if(cmd === `${prefix}say`)
        {
          const sayMessage = args.join(" ");
          message.delete().catch(O_o=>{}); 
          message.channel.send(sayMessage);
        }
        //else if(cmd === `${prefix}bigemoji`) 
        //{
          //const allEmoji = Cayde.emojis.get(emoji.id);
          //if(message.content.includes(allEmoji))
            //return message.channel.send("The ID of the emoji is " + allEmoji)
          //else
            //return message.channel.send("Something went wrong here.")
        //}
      else if(cmd === `${prefix}8ball`)
         {
        function eightBallAnswer() {
var randAnswer = ["Oh, totally.",
                 "What? No!",
                 "Very unlikely, but sure.",
                 "Oh dear God, NO.",
                 "Possibly? It's very hard to say.",
                 "Why would you ever do that?! That's a definite no, friend.",
                 "Yeah, that sounds like a great idea!",
                 "Uh... The rock is speaking in Hive gibberish again. Get back to me on that.",
                 "What the hell is going on with this rock? Uh... give me a minute.",
                 "What is your problem? That sounds terrible!",
                 "Hell yeah, sounds like a plan!",
                 "Um, I... don't actually know.",
                 "I'm seriously questioning why you would ever do that. How about no.",
                 "Ugh. Eris stole the rock back. Ask again some other time."
                ]
  
  return rand[Math.floor(Math.random()*randAnswer.length)];
  }
          message.channel.send(eightBallAnswer());
      }
      else if (cmd === `${prefix}nickname`)
        {
          if(!cmdUser.hasPermission('MANAGE_NICKNAMES'))
            return message.channel.send(wrongPerm)

          if(!message.guild.me.hasPermission('MANAGE_NICKNAMES'))
            return message.channel.send("Hm. I... can't change my own nickname, apparently.")

          message.guild.me.setNickname(message.content.replace('``nickname ', ''))

          if(message.content = "")
            return message.channel.send("This isn't even that good of a nickname. Hell, I don't even think this'd work!")
          .then(console.log("Nickname changed to'" + message.guild.me.nickname + "' in " + message.guild))
          .then(message.channel.send("Nickname changed successfully."))
        }
})

Cayde.on("message", message => {
  let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

  if(cmd === `${prefix}eval`){
    if(message.author.id !== process.env.OWNER_ID)
      return message.channel.send("You see, the funny thing about this command is... you have to be my creator to use it.");
    try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`This is invalid code. And that's a shame. Here's the error report I received: \`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
});
//448 lines of pure code, :FeelsGoodMan:
