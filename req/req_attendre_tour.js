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

	membres = JSON.parse(contenu_fichier);
	contenu_fichier = fs.readFileSync("./tables/"+query.compte+".json" , "UTF-8");

		
	if (membres[i].joueurs === query.compte) {
		joue = true;
	}
	contenu_fichier = JSON.stringify(membres);
    fs.writeFileSync("./tables/"+query.table+".json" , contenu_fichier, 'UTF-8');


	// AFFICHAGE DE LA PAGE
	if (joue === true) {
		page = fs.readFileSync("./html/modele_page_joueur" , "UTF-8");
	} else if (joue === false) {
		page = fs.readFileSync("./html/modele_page_adversaire" , "UTF-8");
	}
	 
		
	// AFFICHAGE DE LA PAGE ADVERSAIRE
    page = fs.readFileSync("./html/modele_page_adversaire.html", "UTF-8");

    marqueurs = {};
    marqueurs.compte = query.compte;
	marqueurs.adversaire = query.adversaire;
    page = page.supplant(marqueurs);

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
