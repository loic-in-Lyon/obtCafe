const fs = require("fs");
require("dotenv").config();

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_ID = process.env.BASE_ID;
const TABLE = "Events";

async function sync() {
  const res = await fetch(
    `https://api.airtable.com/v0/${BASE_ID}/${TABLE}`,
    {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`
      }
    }
  );

  const data = await res.json();

  if (!data.records) {
    throw new Error("Airtable error: " + JSON.stringify(data));
  }

  const events = data.records
    .filter(r => r.fields?.Publier)
    .map(r => ({
      imgUrl: r.fields?.Image?.[0]?.url || null,
      titre: r.fields?.Titre || "",
      description: r.fields?.Description || "",
      date: r.fields?.Date || "",
      heure: r.fields?.Heure || "",
      lieu: r.fields?.Lieu || ""
    }));

  fs.writeFileSync(
    "site/events.json",
    JSON.stringify(events, null, 2)
  );

  console.log("events.json mis à jour :", events.length);
}

sync();
