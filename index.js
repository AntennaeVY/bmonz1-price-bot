const axios = require("axios");
const { Client, Intents } = require("discord.js");

// Environmental Variables
if (process.env.NODE_ENV == "dev") {
  require("dotenv").config({ path: `${__dirname}/.env` });
}

const client = new Client({ intents: Intents.FLAGS.GUILDS });

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);

  setInterval(async () => {
    const response = (
      await axios.get(
        "https://api.nomics.com/v1/currencies/ticker?key=9c44be3df7083f3e5b0438849203b264a87821d4&ids=BMONZ1&interval=1d&convert=USD"
      )
    ).data[0];

    const usd = parseFloat(response.price).toFixed(2);
    const percentage = (response["1d"].price_change_pct * 100).toFixed(2);
    const upordown = percentage < 0 ? "📉" : "📈";

    client.user.setActivity(`$${usd} ${upordown} ${percentage}%`);
  }, 7000);
});

client.login(process.env.TOKEN);
