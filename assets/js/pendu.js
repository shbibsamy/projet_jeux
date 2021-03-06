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
// Nombre de vies. Longeur du mot s??l??ctionn?? /2 + 3.
let vies = 7;
let lettresUtilises = [];
let jeuxFini = false;

function init() {
    // Pr??pare le jeu
    mot = choisirMot();
    // Stock combien de lettres il faut trouver
    tours = mot.length;
    document.addEventListener("keypress", logKey);
    afficherVies();
    afficherMot();
    afficherAlphabet();
    boutonRejouer.addEventListener("click", e => {
        location.reload();
    })
}

function logKey(e) {
    if (!jeuxFini) {
        if (e.which >= 97 && e.which <= 122) {
            let lettreAppuye = String.fromCharCode(e.which).toUpperCase();
            let spansBoutons = espaceAlphabet.querySelectorAll("span");
            let lettreIndiceAlphabet = alphabet.indexOf(lettreAppuye);
            spansBoutons[lettreIndiceAlphabet].classList.add("lettre-choisi");
            lettreExiste(lettreAppuye);
        }
    }
}

function afficherVies() {
    let asciiArtChoix = `vies${vies}`
    let asciiArt = document.getElementById(asciiArtChoix);
    asciiArt.style.display = "block";
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
    // Pour chaque lettre de l'alphabet, cr??e un span avec la lettre ?? l'int??rieur puis attend qu'on clique dessus.
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
    // Cherche si la lettre a d??j?? ??t?? utilis??
    if (!lettresUtilises.includes(lettre)) {
        // Cherche si la lettre est dans le mot s??l??ctionn??
        if (mot.includes(lettre)) {
            // Compare ?? chaque lettre du mot
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
    // Met ?? jour les vies
    let maSpanVies = document.getElementById("span_vies");
    maSpanVies.innerHTML = `Vies : ${vies}`;
}

function gagner() {
    // Get les endrois sur l'??cran o?? on va afficher le r??sultat
    let spanResultat = document.createElement("span");
    let mesSpans = espaceAlphabet.querySelectorAll("span");
    if (tours == 0) {
        jeuxFini = true;
        // C'est ?? dire que toutes les lettres ont ??t??s trouv??s.
        spanResultat.innerHTML = "C'est gagn?? !";
        espaceResultat.appendChild(spanResultat);
        //Enlever les listener
        for (const span of mesSpans) {
            span.style.pointerEvents = "none";
        }
        window.removeEventListener("keypress", logKey);
    } else if (vies === 0) {
        // C'est perdu
        jeuxFini = true;
        spanResultat.innerHTML = "C'est perdu ! Mot recherch?? :";
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