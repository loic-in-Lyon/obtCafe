async function loadEvents() {
  try {
    const res = await fetch("./events.json");
    console.log(res);

    const events = await res.json();

    const container = document.getElementById("events");

    // tri par date (prochains événements en premier)
    events.sort((a, b) => new Date(a.date) - new Date(b.date));

    events.forEach(event => {
      // const card = document.createElement("div");
      // card.className = "card";

      // card.innerHTML = `
      //   <h3>${event.titre}</h3>
      //   <p>${event.description}</p>
      //   <p><strong>${event.date}</strong> ${event.heure}</p>
      //   <p>${event.lieu}</p>
      // `;

      // container.appendChild(card);
      // if (event.fields.Publier === true) {

      // }


      const el = document.createElement("div");
      el.className = "card";
      console.log(event.imgUrl);

      el.innerHTML = `
        <img src="${event.imgUrl}">
        <h3>${event.titre}</h3>
        <p>${event.description || ""}</p>
        <p><strong>${event.date}</strong> - ${event.heure || ""}</p>
        <p>${event.lieu || ""}</p>
      `;

      container.appendChild(el);
    });

  } catch (err) {
    console.error("Erreur chargement events.json", err);
  }
}

loadEvents();
