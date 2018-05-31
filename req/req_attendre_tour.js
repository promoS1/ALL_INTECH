//=========================================================================
// Traitement de "req_attendre_tour"
// Auteur : ALL IN'TECH
// Version : 26/05/2018
//=========================================================================
"use strict";

var fs = require("fs");
var remedial = require('remedial');

var trait = function (req, res, query) {

    var marqueurs;
    var page;
	var contenu_fichier;
	var membres;
	var i;
	var joue;

	// SAVOIR QUI DOIT JOUER

	contenu_fichier = fs.readFileSync("./tables/"+query.compte+".json" , "UTF-8");
	membres = JSON.parse (contenu_fichier);

	if (membres.tour === query.compte) {
		joue = "en_jeu";
	} else if (membres.tour === "") {
		joue = "resultats";
	} else {
		joue = "en_attente";
	}

// 					NAHEL
//	if (membres[i].joueurs === query.compte) {
//		joue = true;
//	}
	contenu_fichier = JSON.stringify(membres);
    fs.writeFileSync("./tables/"+query.table+".json" , contenu_fichier, 'UTF-8');

	// AFFICHAGE DE LA PAGE
	if (joue === "en_jeu") {
		page = fs.readFileSync("./html/modele_page_joueur.html" , "UTF-8");
	} else if (joue === "en_attente") {
		page = fs.readFileSync("./html/modele_page_adversaire.html" , "UTF-8");
	} else if (joue === "resultats") {
		page = fs.readFileSync ("./html/modele_page_resultat.html" , "UTF-8");
	} else {
		page = fs.readFileSync ("./html/mode_salon_multi.html" , "UTF-8");
	}
	 
		
	// AFFICHAGE DE LA PAGE ADVERSAIRE
//    page = fs.readFileSync("./html/modele_page_adversaire.html", "UTF-8");

    marqueurs = {};
    marqueurs.compte = query.compte;
	marqueurs.adversaire = query.adversaire;
	marqueurs.table = query.table;
    page = page.supplant(marqueurs);

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
