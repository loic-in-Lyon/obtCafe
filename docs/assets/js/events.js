const endpoint = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${TABLE_NAME}`;

fetch(endpoint, {
  headers: {
    Authorization: `Bearer ${AIRTABLE_API_KEY}`
  }
})
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("events");
    // console.log(data);

    data.records
      .filter(event => event.fields.Publier === true)
      .sort((a, b) => new Date(a.fields.Date) - new Date(b.fields.Date))
      .forEach(event => {
        // if (event.fields.Publier === true) {

        // }

        console.log(event.fields);

        const el = document.createElement("div");
        el.className = "card";
        console.log(event.fields.Image[0].url);

        el.innerHTML = `
        <img src="${event.fields.Image[0].url}">
        <h3>${event.fields.Titre}</h3>
        <p>${event.fields.Description || ""}</p>
        <p><strong>${event.fields.Date}</strong> - ${event.fields.Heure || ""}</p>
        <p>${event.fields.Lieu || ""}</p>
      `;

        container.appendChild(el);
      });
  });
