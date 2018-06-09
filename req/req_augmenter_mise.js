//========================================================================
// Traitement de "req_augmenter_mise"
// Auteur : ALL'INTECH 
// Version : 09/06/18
//=========================================================================
"use strict";

var fs = require("fs");
var remedial = require("remedial");

var trait = function (req, res, query) {

	var marqueurs;
	var page;









	// AFFICHAGE DE LA PAGE RESULTAT
	page = fs.readFileSync("./html/modele_page_joueur.html", "UTF-8");

	// MARQUEURS HTML
	marqueurs = {};
	marqueurs.compte = query.compte;
	marqueurs.adversaire = query.adversaire;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};
//---------------------------------------------------------------------------

module.exports = trait;
