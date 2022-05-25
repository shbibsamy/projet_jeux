// makes index page menu work
//get div
const jeuDetail = document.querySelector(".detail-jeu");

// create éléments nécessaires
const imgDetail = jeuDetail.querySelector("img");
const titreDetail = jeuDetail.querySelector("h3");
const paraDetail = jeuDetail.querySelector("p");
const boutonJouer = document.getElementById("bouton_jouer");
const boutonScores = document.getElementById("bouton_scores");
const jeux = document.querySelectorAll(".jeu");
jeux.forEach(element => {
    element.addEventListener("click", e => {
        e.preventDefault();
        majDetails(element);
    })
})

function majDetails(element) {
    let lien = element.querySelector("a").href;
    console.log(lien);
    let img = element.querySelector("img").src;
    console.log(img);
    let titre = element.querySelector("h3").innerHTML;
    console.log(titre);
    let para = element.querySelector("p").innerHTML;
    imgDetail.src = img;
    titreDetail.innerHTML = titre;
    paraDetail.innerHTML = para; 
    boutonJouer.href = lien;
}