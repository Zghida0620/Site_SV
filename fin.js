const flagsData = [
  { img: "https://flagcdn.com/w80/fr.png", lang: "Français", text: "Je t’aime" },
  { img: "https://flagcdn.com/w80/gb.png", lang: "English", text: "I love you" },
  { img: "https://flagcdn.com/w80/es.png", lang: "Español", text: "Te quiero" },
  { img: "https://flagcdn.com/w80/it.png", lang: "Italiano", text: "Ti amo" },
  { img: "https://flagcdn.com/w80/de.png", lang: "Deutsch", text: "Ich liebe dich" },
  { img: "https://flagcdn.com/w80/nl.png", lang: "Nederlands", text: "Ik hou van jou" },
  { img: "https://flagcdn.com/w80/sa.png", lang: "العربية", text: "أحبك" },
  { img: "https://flagcdn.com/w80/ma.png", lang: "العربية (المغرب)", text: "كنبغيك" },
  { img: "https://flagcdn.com/w80/tr.png", lang: "Türkçe", text: "Seni seviyorum" },
  { img: "https://flagcdn.com/w80/jp.png", lang: "日本語", text: "愛してる" }
];

const grid = document.getElementById("flagsGrid");
if (!grid) throw new Error("flagsGrid introuvable dans le HTML.");

flagsData.forEach((data) => {
  const card = document.createElement("div");
  card.className = "flip-card";
  card.setAttribute("role", "button");
  card.setAttribute("tabindex", "0");
  card.setAttribute("aria-label", `Retourner la carte : ${data.lang}`);

  card.innerHTML = `
    <div class="flip-inner">
      <div class="flip-front">
        <img
          src="${data.img}"
          class="flag-img"
          alt="Drapeau - ${data.lang}"
          loading="lazy"
          decoding="async"
        >
      </div>
      <div class="flip-back">
        <div class="love">${data.text}</div>
        <div class="lang">${data.lang}</div>
      </div>
    </div>
  `;

  const toggle = () => card.classList.toggle("flipped");

  card.addEventListener("click", toggle);

  // Bonus: au clavier (Entrée / Espace)
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  });

  grid.appendChild(card);
});