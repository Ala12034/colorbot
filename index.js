const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

const GUILD_ID = process.env.GUILD_ID;

// Liste de roluri țintă și colorate
const TARGET_ROLE_IDS = process.env.TARGET_ROLE_IDS.split(","); // ex: "123,456,789"
const COLOR_ROLES = [
  process.env.ROLE_ID_1,
  process.env.ROLE_ID_2,
  process.env.ROLE_ID_3,
  process.env.ROLE_ID_4,
  process.env.ROLE_ID_5,
  process.env.ROLE_ID_6,
  process.env.ROLE_ID_7,
  process.env.ROLE_ID_8,
  process.env.ROLE_ID_9,
  process.env.ROLE_ID_11,
  process.env.ROLE_ID_12,
  process.env.ROLE_ID_13,
  process.env.ROLE_ID_14,
  process.env.ROLE_ID_15,
  process.env.ROLE_ID_16,
  process.env.ROLE_ID_17,
  process.env.ROLE_ID_18,
  process.env.ROLE_ID_19,
  process.env.ROLE_ID_20,
  process.env.ROLE_ID_21,
  process.env.ROLE_ID_22,
];

client.once('ready', async () => {
  console.log(`✅ Botul este online ca ${client.user.tag}`);

  let colorIndex = 0;

  setInterval(async () => {
    try {
      const guild = await client.guilds.fetch(GUILD_ID);
      await guild.members.fetch(); // încarcă toți membrii

      guild.members.cache.forEach(async (member) => {
        // Verifică dacă membrul are cel puțin un rol țintă
        const hasTargetRole = TARGET_ROLE_IDS.some(rid => member.roles.cache.has(rid));

        // Scoate toate culorile de pe membru
        for (const colorRole of COLOR_ROLES) {
          if (member.roles.cache.has(colorRole)) {
            await member.roles.remove(colorRole).catch(() => {});
          }
        }

        // Dacă are un rol țintă, adaugă următoarea culoare
        if (hasTargetRole) {
          const nextColor = COLOR_ROLES[colorIndex % COLOR_ROLES.length];
          await member.roles.add(nextColor).catch(() => {});
        }
      });

      console.log(`🎨 Culoare rotită: ${colorIndex + 1}`);
      colorIndex++;
    } catch (err) {
      console.error("❌ Eroare în rotația pe mai multe roluri:", err.message);
    }
  }, 60000); // 60 secunde
});

client.login(process.env.TOKEN);

try {
  const channel = await client.channels.fetch(process.env.CHANNEL_ID);
  if (channel && channel.isTextBased()) {
    await channel.send("✅│🤖 Botul este online și pregătit să coloreze!");
  }
} catch (err) {
  console.error("❌ Nu pot trimite mesaj de pornire:", err.message);
}

process.on('uncaughtException', async (err) => {
  console.error("💥 Eroare neașteptată:", err.message);

  try {
    const channel = await client.channels.fetch(process.env.CHANNEL_ID);
    if (channel && channel.isTextBased()) {
      await channel.send(`❌│A apărut o eroare: \`${err.message}\``);
    }
  } catch (e) {
    console.error("⚠️ Nu pot trimite eroarea în canal:", e.message);
  }
});
