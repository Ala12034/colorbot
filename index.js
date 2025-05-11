const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const ROLE_IDS = [
  "135162160767942763", "135162170087998149", "13516211454709514",
  "135162064335451616", "135162079114878352", "135185662821997419",
  "135211188096955", "13516206755953535", "1351620748721976",
  "135185807309213331", "13518593586699824", "1351840669970554",
  "1351620631135", "135185843483315", "13529844660304",
  "13520067757157799", "13529844660444", "13520067757151111",
  "13529844660888", "13520067757152222", "13529844660666", "13520067757153333"
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
          const currentColorRoles = ROLE_IDS.filter(rid => member.roles.cache.has(rid));
          await member.roles.remove(currentColorRoles);
          await member.roles.add(colorRoleId);
          console.log(`🎨 ${member.user.tag} a primit culoarea ${colorRoleId}`);
        }
      });

    } catch (error) {
      console.error("❌ Eroare la schimbarea culorilor:", error);
    }
  }, 10000); // schimbă la fiecare 10 secunde
});

client.login(process.env.TOKEN);
