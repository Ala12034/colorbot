// index.js
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const ROLE_IDS = [
  "ROLE_ID_1", "ROLE_ID_2", "ROLE_ID_3", "ROLE_ID_4", "ROLE_ID_5",
  "ROLE_ID_6", "ROLE_ID_7", "ROLE_ID_8", "ROLE_ID_9", "ROLE_ID_10",
  "ROLE_ID_11", "ROLE_ID_12", "ROLE_ID_13", "ROLE_ID_14", "ROLE_ID_15",
  "ROLE_ID_16", "ROLE_ID_17", "ROLE_ID_18", "ROLE_ID_19", "ROLE_ID_20",
  "ROLE_ID_21", "ROLE_ID_22"
];

const TARGET_ROLE = process.env.ROLE_ID;
const GUILD_ID = process.env.GUILD_ID;
const CHANNEL_ID = process.env.CHANNEL_ID;

client.once('ready', async () => {
  console.log(`✅ Botul este online ca ${client.user.tag}`);

  try {
    const channel = await client.channels.fetch(CHANNEL_ID);
    if (channel && channel.isTextBased()) {
      await channel.send("✅ Botul este online și pregătit să coloreze!");
    }
  } catch (error) {
    console.error("❌ Eroare la trimiterea mesajului de pornire:", error);
  }

  let index = 0;
  setInterval(async () => {
    try {
      const guild = await client.guilds.fetch(GUILD_ID);
      const members = await guild.members.fetch();

      const colorRoleId = ROLE_IDS[index % ROLE_IDS.length];
      index++;

      members.forEach(async (member) => {
        if (member.roles.cache.has(TARGET_ROLE)) {
          // Sterge toate rolurile de culoare existente
          const currentColorRoles = ROLE_IDS.filter(rid => member.roles.cache.has(rid));
          await member.roles.remove(currentColorRoles);
          await member.roles.add(colorRoleId);
          console.log(`🎨 ${member.user.tag} a primit culoarea ${colorRoleId}`);
        }
      });

    } catch (error) {
      console.error("❌ Eroare la schimbarea culorilor:", error);
    }
  }, 10000); // la fiecare 10 secunde
});

client.login(process.env.TOKEN);
