const discord = require("discord.js-selfbot-v13");
const config = require("./config/config.json");
require("dotenv").config();

const client = new discord.Client();

// Array of different messages to send
const randomMessages = require("./messages");

let isGrinding = false;
let grindInterval = null;

client.on('ready', () => {
    console.log(`${client.user.username} is ready!`);
    client.user.setPresence({
        status: "idle",
        activities: [{ name: "Varied Messages", type: "PLAYING" }]
    });
});

client.on("messageCreate", async (m) => {
    if (m.author.bot && !config.bot.owners.includes(m.author.id)) return;
    if (!m.content.startsWith(config.bot.prefix)) return;

    const args = m.content.slice(config.bot.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!config.bot.owners.includes(m.author.id)) return;
    if (m.guild && config.commands.servers_allowed.length > 0 && 
        !config.commands.servers_allowed.includes(m.guild.id)) return;

    if (command === 'grind') {
        if (isGrinding) {
            clearInterval(grindInterval);
            isGrinding = false;
            return m.reply("🛑 Stopped the message flow").catch(() => {});
        }

        isGrinding = true;
        let i = 0;
        
        m.reply("🌀 Starting varied message flow...").catch(() => {});

        grindInterval = setInterval(async () => {
            if (!isGrinding) {
                clearInterval(grindInterval);
                return;
            }
            
            try {
                // Select random message and customize it
                const randomIndex = Math.floor(Math.random() * randomMessages.length);
                let message = randomMessages[randomIndex]
                    .replace('{i}', i)
                    .replace('{time}', new Date().toLocaleTimeString());
                
                await m.channel.send(message);
                i++;
                
                if (i >= 50000000) { // Lowered safety limit
                    clearInterval(grindInterval);
                    isGrinding = false;
                    m.reply("🔐 Reached safety limit (50000000 messages)").catch(() => {});
                }
            } catch (err) {
                console.error("Error:", err);
                clearInterval(grindInterval);
                isGrinding = false;
            }
        }, 5*1000); // Increased to 25 seconds between messages
    }
});

client.login(process.env.TOKEN).catch(err => {
    console.error("Login failed:", err);
});