// index.js
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const ROLE_IDS = [
  "135162160767942763",
  "1351621740087998149",
  "1351622064115470914",
  "1351620640335345166",
  "1351620697911487352",
  "1351621358210974419",
  "1351621118809696535",
  "1351620406755953352",
  "135162074087219776",
  "1351621007793213331",
  "135162135986698284",
  "1351620480696994121",
  "1351620632113061133",
  "1351620535843833115",
  "1351620889446603804",
  "130934046675157799"
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

members.forEach(async (member) => {
  if (member.roles.cache.has(TARGET_ROLE)) {
    const currentColorRoles = ROLE_IDS.filter(rid => member.roles.cache.has(rid));
    
    console.log(`🔁 Încerc să schimb culoarea pentru ${member.user.tag}`);
    
    await member.roles.remove(currentColorRoles);
    await member.roles.add(colorRoleId);
    
    console.log(`🎨 ${member.user.tag} a primit culoarea ${colorRoleId}`);
  }
});
