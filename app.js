// Personnalise ici
const VALENTINE = {
  herName: "Djemilyne",
  myName: "Anes"
};

function fillNames(){
  const setText = (id, value) => {
    const el = document.getElementById(id);
    if(el) el.textContent = value;
  };
  setText("herNameTop", VALENTINE.herName);
  setText("herNameTop2", VALENTINE.herName);
  setText("dear", VALENTINE.herName);
  setText("myName", VALENTINE.myName);
  setText("herNameWin", VALENTINE.herName);
  setText("myNameWin", VALENTINE.myName);
}

document.addEventListener("DOMContentLoaded", fillNames);
