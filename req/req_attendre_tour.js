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
	var i;
	var contenu_fichier;
	var tour;
	var table;

	




	
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
