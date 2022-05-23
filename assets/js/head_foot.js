// Get le header sur la page
const header = document.querySelector("header");
// Insérer header.html
fetch("./header.html")
    .then(res => res.text())
    .then(data => {
        header.innerHTML = data;
        // creerHeader();
    });
// Get le footer sur la page
const footer = document.querySelector("footer");
// Insérer footer.html
fetch("./footer.html")
    .then(res => res.text())
    .then(data2 => {
        footer.innerHTML = data2;
        // creerFooter();
    });