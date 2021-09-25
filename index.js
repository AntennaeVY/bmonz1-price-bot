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
        "https://api.coingecko.com/api/v3/simple/token_price/binance-smart-chain?contract_addresses=0x80e15fe54e9d155f8366187a6a32bdef9c2366c4&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true"
      )
    ).data["0x80e15fe54e9d155f8366187a6a32bdef9c2366c4"];

    const usd = response.usd;
    const percentage = response.usd_24h_change;
    const upordown = percentage < 0 ? "📉" : "📈";

    client.user.setActivity(`$${usd} ${upordown} ${percentage.toFixed(2)}%`);
  }, 7000);
});

client.login(process.env.TOKEN);
