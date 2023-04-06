

const btns_container = document.querySelector("#btns-container");
const scores = document.querySelector(".scores");
const infos = document.querySelector(".infos");

const choixPossible = ["pierre ✊", "papier 🤚", "ciseaux ✌️"];

let scoreJoueur1 = 0;
let scoreOrdinateur = 0;
let resultat = "";

// DOM MANIPULATION ----------------------------------------------
// Like that we can later add some btn easily if we want
// just by adding new item in [choixPossible] array
for (let i = 0; i < choixPossible.length; i++) {
  const newBtn = document.createElement("button");
  newBtn.textContent = `${choixPossible[i]}`;
  newBtn.classList.add("btn");
  newBtn.addEventListener("click", shifumiClick);
  btns_container.appendChild(newBtn);
}

// FUNCTIONS -----------------------------------------------------
// -- Function shifumi BUTTONS --
function shifumiClick(e) {
  const choixJoueur = choixPossible.indexOf(e.target.textContent);
  const choixOrdinateur = Math.floor(Math.random() * choixPossible.length);

  winnerCalcAndScoresInc(choixJoueur, choixOrdinateur);

  displayScoresInfos(
    `Vous avez joué : <strong>${e.target.textContent}</strong><br>L'ordinateur a joué : <strong>${choixPossible[choixOrdinateur]}</strong><br><strong>${resultat}</strong>`
  );
}

// -- Function shifumi KEYPRESS --
function shifumiKey(e) {
  if (e.key === "r") {
    scoreJoueur1 = 0;
    scoreOrdinateur = 0;
    return displayScoresInfos("");
  }

  if (e.key === "&" || e.key === "é" || e.key === '"') {
    const choixOrdinateur = Math.floor(Math.random() * choixPossible.length);
    let choixJoueur;

    if (e.key === "&") choixJoueur = 0;
    if (e.key === "é") choixJoueur = 1;
    if (e.key === '"') choixJoueur = 2;

    winnerCalcAndScoresInc(choixJoueur, choixOrdinateur);

    return displayScoresInfos(
      `Vous avez joué : <strong>${choixPossible[choixJoueur]}</strong><br>L'ordinateur a joué : <strong>${choixPossible[choixOrdinateur]}</strong><br><strong>${resultat}</strong>`
    );
  }
}

// -- Function scores and infos display --
function displayScoresInfos(infosString) {
  scores.innerHTML = `Scores :<br>joueur[${scoreJoueur1}] - ordinateur[${scoreOrdinateur}]`;
  infos.innerHTML = infosString;
}

// -- Function shifumi winner calc and scores increment --
function winnerCalcAndScoresInc(choixJoueur, choixOrdinateur) {
  if (choixJoueur == choixOrdinateur) {
    resultat = "Egalité !";
  } else if (
    (choixJoueur == 1 && choixOrdinateur == 0) ||
    (choixJoueur == 2 && choixOrdinateur == 1) ||
    (choixJoueur == 0 && choixOrdinateur == 2)
  ) {
    scoreJoueur1++;
    resultat = "Vous avez gagné !";
  } else {
    scoreOrdinateur++;
    resultat = "Vous avez perdu !";
  }
}

// EVENT LISTENERS ----------------------------------------------
// -- Dark/light btn CLICK EVENT --
const themeBtn = document.querySelector(".themeBtn");
themeBtn.addEventListener("click", () => {
  // Theme btn
  themeBtn.classList.toggle("darkTheme");
  if (themeBtn.classList.contains("darkTheme"))
    themeBtn.textContent = "Go Dark";
  else themeBtn.textContent = "Go Light";

  // Body
  document.body.classList.toggle("darkTheme");

  // Game btns
  for (let btn of document.querySelectorAll(".btn")) {
    btn.classList.toggle("darkTheme");
  }
});

// -- KeyPress EVENT shifumiKey() on <body> --
document.body.addEventListener("keypress", shifumiKey);