const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const mots = ["ACAJOU", "AGNEAU", "ALARME", "ANANAS", "ANGORA", "ANIMAL", "ARCADE", "AVIRON", "AZIMUT", "BABINE", "BALADE", "BONZAI", "BASSON", "BILLET", "BOUCHE", "BOUCLE", "BRONZE", "CABANE", "CAIMAN", "CLOCHE", "CHEQUE", "CIRAGE", "COCCYX", "CRAYON", "GARAGE", "GOSPEL", "GOULOT", "GRAMME", "GRELOT", "GUENON", "HOCHET", "HORMIS", "HUMOUR", "HURLER", "JARGON", "LIMITE", "LIONNE", "MENTHE", "OISEAU", "PODIUM", "POULPE", "POUMON", "PUZZLE", "QUARTZ", "RAPIDE", "SEISME", "TETINE", "TOMATE", "WALABI", "WHISKY", "ZIPPER", "ABRITER", "BALLAST", "BARYTON", "BASSINE", "BATAVIA", "BILLARD", "BRETZEL", "CITHARE", "CHARIOT", "CLAIRON", "CORBEAU", "CORTEGE", "CRAPAUD", "CYMBALE", "DENTIER", "DRAPEAU", "EXEMPLE", "FOURMIS", "GRANDIR", "ICEBERG", "JAVELOT", "JOCKEY", "JOURNAL", "JOURNEE", "JOUXTER", "LOSANGE", "MACADAM", "MONDIAL", "NOTABLE", "OXYGENE", "PANIQUE", "PETROLE", "POTERIE", "POUVOIR", "RENEGAT", "SCOOTER", "SENTEUR", "SIFFLET", "SPIRALE", "SUCETTE", "STROPHE", "TONNEAU", "TROUSSE", "TUNIQUE", "VAUTOUR", "ZOZOTER", "AQUARIUM", "ARAIGNEE", "ARBALETE", "ARCHIPEL", "BANQUISE", "BATTERIE", "BROCANTE", "BROUHAHA", "CAPELINE", "CLAVECIN", "CLOPORTE", "DEBUTANT", "DIAPASON", "GANGSTER", "GOTHIQUE", "HAUTBOIS", "HERISSON", "LOGICIEL", "OBJECTIF", "PARANOIA", "PARCOURS", "PASTICHE", "QUESTION", "QUETSCHE", "SCARABEE", "SCORPION", "SYMPTOME", "TABOURET", "TOMAHAWK", "TOUJOURS", "TOURISME", "TRIANGLE", "UTOPIQUE", "ZEPPELIN", "ACCORDEON", "ASCENSEUR", "ASCENSION", "ASEPTISER", "AUTOROUTE", "AVALANCHE", "BALALAIKA", "BILBOQUET", "BOURRICOT", "BRILLANCE", "CABRIOLET", "CONTRARIO", "CORNEMUSE", "DANGEREUX", "EPLUCHAGE", "FEODALITE", "FORTERESSE", "GONDOLIER", "GRAPHIQUE", "HOROSCOPE", "INTREPIDE", "KLAXONNER", "MASCARADE", "METAPHORE", "NARRATEUR", "PERIPETIE", "POPULAIRE", "PRINTEMPS", "QUEMANDER", "TAMBOURIN", "VESTIAIRE", "XYLOPHONE", "APOCALYPSE", "ATTRACTION", "AVENTURIER", "BOUILLOTTE", "CITROUILLE", "CONTROVERSE", "COQUELICOT", "DISSIMULER", "FLIBUSTIER", "FORESTIERE", "GRENOUILLE", "IMPOSSIBLE", "LABYRINTHE", "MAHARADJAH", "PRUDEMMENT", "QUADRICEPS", "SOLILOQUER", "SUBJECTIF"];

// Get les div du jeu
const espaceScore = document.querySelector(".espace-score");
const espaceMot = document.querySelector(".espace-mot");
const espaceAlphabet = document.querySelector(".espace-alphabet");
const boutonRejouer = document.getElementById("rejouer")
const espaceResultat = document.querySelector(".resultat")

// Variables pour faire fonctionner le jeu
let mot;
let tours = 0;
// Nombre de vies. Longeur du mot séléctionné /2 + 3.
let vies = 7;
let lettresUtilises = [];


function init() {
    // Prépare le jeu
    mot = choisirMot();
    // Stock combien de lettres il faut trouver
    tours = mot.length;
    window.addEventListener("keypress", logKey);
    afficherVies();
    afficherMot();
    afficherAlphabet();
    boutonRejouer.addEventListener("click", e => {
        location.reload();
    })
}

function logKey(e) {
    let lettreAppuye = String.fromCharCode(e.which).toUpperCase();
    let spansBoutons = espaceAlphabet.querySelectorAll("span");
    let lettreIndiceAlphabet = alphabet.indexOf(lettreAppuye);
    spansBoutons[lettreIndiceAlphabet].classList.add("lettre-choisi");
    lettreExiste(lettreAppuye)
}

// function afficherVies() {
//     // Affiche les vies de départ
//     vies = Math.floor(mot.length / 2 + 3);
//     let spanVies = document.createElement("span");
//     spanVies.id = "span_vies"
//     spanVies.innerHTML = `Vies : ${vies}`;
//     return spanVies;
// }

function afficherVies() {
    let asciiArtChoix = `vies${vies}`
    let asciiArt = document.getElementById(asciiArtChoix);
    asciiArt.style.display = "flex";
    asciiArt.style.justifyContent = "center";
    if (vies < 7) {
        asciiArtChoix = `vies${vies+1}`
        asciiArt = document.getElementById(asciiArtChoix);
        asciiArt.style.display = "none";
    }
}

function choisirMot() {
    // Choisit un mot du tableau mots.
    let choisirMot = Math.floor(Math.random() * mots.length);
    let motTrouve = mots[choisirMot];
    return motTrouve;
}

function afficherMot() {
    for (const lettre of mot) {
        let spanLettre = document.createElement("span");
        spanLettre.innerHTML = "_";
        espaceMot.appendChild(spanLettre);
    }
}

function afficherAlphabet() {
    // Pour chaque lettre de l'alphabet, crée un span avec la lettre à l'intérieur puis attend qu'on clique dessus.
    for (const lettre of alphabet) {
        let spanLettre = document.createElement("span");
        spanLettre.innerHTML = lettre;
        spanLettre.addEventListener("click", e => {
            lettreExiste(lettre);
            spanLettre.classList.add("lettre-choisi");
        }, {
            once: true
        });
        espaceAlphabet.appendChild(spanLettre);
    }
}

function lettreExiste(lettre) {
    let mesSpans = espaceMot.querySelectorAll("span");
    // Cherche si la lettre a déjà été utilisé
    if (!lettresUtilises.includes(lettre)) {
        // Cherche si la lettre est dans le mot séléctionné
        if (mot.includes(lettre)) {
            // Compare à chaque lettre du mot
            for (const lettreMot in mot) {
                if (mot[lettreMot] === lettre) {
                    mesSpans[lettreMot].innerHTML = lettre;
                    tours--;
                }
            }
        } else {
            vies--
            afficherVies();
        }
    }
    lettresUtilises.push(lettre);
    gagner();
}

function viesMAJ() {
    // Met à jour les vies
    let maSpanVies = document.getElementById("span_vies");
    maSpanVies.innerHTML = `Vies : ${vies}`;
}

function gagner() {
    // Get les endrois sur l'écran où on va afficher le résultat
    let spanResultat = document.createElement("span");
    let mesSpans = espaceAlphabet.querySelectorAll("span");
    if (tours == 0) {
        // C'est à dire que toutes les lettres ont étés trouvés.
        spanResultat.innerHTML = "C'est gagné !";
        espaceResultat.appendChild(spanResultat);
        //Enlever les listener
        for (const span of mesSpans) {
            span.style.pointerEvents = "none";
        }
        window.removeEventListener("keypress", logKey);
    } else if (vies === 0) {
        // C'est perdu
        spanResultat.innerHTML = "C'est perdu ! Mot recherché :";
        let spanMotRecherche = document.createElement("span");
        spanMotRecherche.innerHTML = mot;
        espaceResultat.appendChild(spanResultat);
        espaceResultat.appendChild(spanMotRecherche);
        //Enlever les listener
        for (const span of mesSpans) {
            span.style.pointerEvents = "none";
        }
        window.removeEventListener("keypress", logKey);
    }
}

init();