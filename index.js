const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const colors = [
  0x660708, 0x87986A, 0xFFF0F3,
  0x003554, 0xffc6ff, 0xffc300,
  0x7400b8, 0x3a0ca3, 0x80b918
];

const GUILD_ID = process.env.GUILD_ID;
const ROLE_ID = process.env.ROLE_ID;
const CHANNEL_ID = process.env.CHANNEL_ID;

client.once('ready', async () => {
  console.log(`✅ Botul este online ca ${client.user.tag}!`);

  const channel = await client.channels.fetch(CHANNEL_ID);
  if (channel && channel.isTextBased()) {
    channel.send('✅│🤖 Botul e online și pregătit să coloreze!');
  }

  let i = 0;
  setInterval(async () => {
    try {
      const guild = await client.guilds.fetch(GUILD_ID);
      const role = await guild.roles.fetch(ROLE_ID);
      if (!role) {
        console.log("❌ Rolul nu a fost găsit.");
        return;
      }
      const newColor = colors[i % colors.length];
      await role.setColor(newColor);
      console.log(`🎨 Culoare schimbată: #${newColor.toString(16)}`);
      i++;
    } catch (error) {
      console.error("❌ Eroare la schimbarea culorii:", error);
    }
  }, 10000); // la fiecare 10 secunde
});

client.login(process.env.TOKEN);


let i = 0;

setInterval(() => {
  (async () => {
    try {
      const guild = await client.guilds.fetch(GUILD_ID);
      const role = await guild.roles.fetch(ROLE_ID);

      if (!role) {
        console.log("❌ Rolul nu a fost găsit.");
        return;
      }

      const newColor = colors[i % colors.length];
      console.log(`🎨 Încerc să schimb culoarea în: #${newColor.toString(16)}`);

      await role.setColor(newColor);
      console.log(`✅ Culoarea a fost schimbată: #${newColor.toString(16)}`);

      i++;
    } catch (error) {
      console.error("🚨 Eroare la schimbarea culorii:", error.message || error);
    }
  })();
}, 9000); // 9 secunde pentru a evita rate limit


// 🔐 Tokenul vine tot din Railway
client.login(process.env.TOKEN);

client.on('messageCreate', async (message) => {
  if (message.content === '!culoare') {
    try {
      const guild = await client.guilds.fetch(GUILD_ID);
      const role = await guild.roles.fetch(ROLE_ID);
      if (role) {
        const newColor = colors[Math.floor(Math.random() * colors.length)];
        await role.setColor(newColor);
        message.channel.send(`🎨 Rolul a fost colorat cu: #${newColor.toString(16)}`);
      }
    } catch (err) {
      console.error('❌ Eroare la comanda !culoare:', err);
      message.channel.send('⚠️ Nu am putut schimba culoarea.');
    }
  }
});

async function startBot() {
  try {
    await client.login(process.env.TOKEN);
  } catch (err) {
    console.error('❌ Eroare la login, încerc din nou în 5 secunde:', err.message);
    setTimeout(startBot, 5000); // încearcă din nou după 5 secunde
  }
}

startBot(); // În loc de client.login()

process.on('uncaughtException', (err) => {
  console.error('💥 Excepție neașteptată:', err);
  process.exit(1); // Forcează închiderea
});
