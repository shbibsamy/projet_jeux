// Qui joue? J1: 1, J2: -1
let tour = -1;
// Un objet pour suivre le jeu qui permet de tester si quelqu'un a gagné
let objJeu = {
    rows: [],
    cols: [],
    diags: [0, 0]
};

// Combien de fois on a joué
let tours = 0;
let tailleGrille = document.getElementById("taille").value;
let inputGrille = document.getElementById("taille");

inputGrille.addEventListener("change", e => {
    tailleGrille = document.getElementById("taille").value;
    init()
})
init();
function init() {
    // Au cas où on a déjà joué, je réinitialise le jeu
    let preEspaceJeu = document.getElementById("boite_jeu");
    if (preEspaceJeu !== null) {
        preEspaceJeu.remove();
        tour = -1;
        tours = 0;
        objJeu = {
            rows: [],
            cols: [],
            diags: [0, 0]
        };
    }
    // Trouver où on va afficher le jeu
    let laGrille = document.querySelector(".jeu-grille");
    // Créer une div pour la contenir
    let espaceJeu = document.createElement("div");
    espaceJeu.id = "boite_jeu";    
    // Créer le table du jeu
    creerObjJeu();
    maTable = createTable();
    espaceJeu.appendChild(maTable);
    laGrille.appendChild(espaceJeu);
}

// Génerer l'objet qui va suivre le jeu
function creerObjJeu() {
    let rows = objJeu.rows
    for (let i = 0; i < tailleGrille; i++) {
        rows.push(0);
    }
    let cols = objJeu.cols
    for (let i = 0; i < tailleGrille; i++) {
        cols.push(0);
    }
}

function createTable() {
    // Créer le table et lui ajouter un titre
    let maTable = document.createElement("table");
    let tBody = document.createElement("tbody");
    maTable.appendChild(tBody);
    let maTableCaption = maTable.createCaption();
    maTableCaption.innerHTML = "Morpion";
    maTableCaption.classList.add("morpion-titre");
    // Créer les lignes et les cellules
    for (let rows = 0; rows < tailleGrille; rows++) {
        let row = document.createElement("tr");
        for (let cols = 0; cols < tailleGrille; cols++) {
            let cell = document.createElement("td");
            // Ajouter un event listener à chaque cellule. Si cliqué, appel la fonction dessiner et jouer
            cell.addEventListener("click", e => {
                tour *= -1;
                // Met le joueur dans la className
                cell.classList.add(tour);
                // Continuer
                dessiner(cell);
                jouer(cell, rows, cols);
            }, {
                // Le bouton ne marche qu'une seule fois
                once: true
            })
            row.appendChild(cell);
        }
        tBody.appendChild(row);
    }
    return maTable;
}

// Fonction qui va déssiner dans la céllule
function dessiner(cell) {
    if (tour === 1) {
        cell.innerHTML = "X";
    } else {
        cell.innerHTML = "O";
    }
}

// Fonction qui va suivre le déroulement du jeu
function jouer(cell, row, col) {
    let cClass = parseInt(cell.classList.value, 10);
    // Met à jour l'objet qui suit le jeu en additionnant le numéro du joueur
    objJeu.rows[row] += cClass;
    objJeu.cols[col] += cClass;
    if (row === col) {
        objJeu.diags[0] += cClass;
    }
    if (row+col === tailleGrille-1) {
        objJeu.diags[1] += cClass;
    }
    gagner();
}


function gagner() {
    // Faire un string de l'objet qui suit le jeu
    let resultat = JSON.stringify(objJeu);
    let boutonGagne = document.getElementById("gagne_bouton");
    let spanGagne = document.getElementById("gagne_span");
    // Cherche si l'objet contient le chiffre 3
    if (resultat.includes(tailleGrille)) {
        maTable.classList.add("disabled");
        if (tour === 1) {
            spanGagne.innerHTML = "Joueur 1 a Gagné ! Bravo !";
        } else {
            spanGagne.innerHTML = "Joueur 2 a Gagné ! Bravo !";

        }
        boutonGagne.removeAttribute("hidden", "");
        boutonGagne.addEventListener("click", e => {
            location.reload();
        })
    } else {
        tours++;
        if (tours === tailleGrille*tailleGrille) {
            boutonGagne.removeAttribute("hidden", "");
            spanGagne.innerHTML = "Oups!"
            boutonGagne.addEventListener("click", e => {
                location.reload();
            })
        }
    }
}