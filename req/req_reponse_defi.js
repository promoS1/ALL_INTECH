//=========================================================================
// Traitement de "req_reponse_defi"
// Auteur : ALL IN'TECH
// Version : 27/05/2018
//=========================================================================
"use strict"

var fs = require("fs");
var url = require ("url");
var remedial = require = ("remedial");

var trait = function (req, res, query) {

	var marqueurs;
	var contenu_fichier;
	var membres;
	var i;
	var page;
	var marqueurs = {};

	// LECTURE DU JSON
	contenu_fichier = fs.readFileSync("./json/connecte.json", "UTF-8");
	liste_membres = JSON.parse (contenu_fichier);

	// MODIFICATION DU JSON CONNECTE.JSON
	for (i = 0; i < membres.length; i++) {
		if (membres[i].compte === query.compte) {
			membres[i].connecte = "attente";
			membres[i].adversaire = query.adversaire;
		} else if ( membres[i].compte === query.adversaire ) {
			membres[i].connecte = "attente";
			membres[i].adversaire = query.compte;
		}
	}

	contenu_fichier = JSON.stringify(membres);
	fs.writeFileSync("./json/connecte.json", contenu_fichier, "utf-8");

	// AFFICHAGE DE LA PAGE ATTENDRE REPONSE
	page = fs.readFileSync("./html/modele_attendre_reponse.html", "utf-8");

	marqueurs.adversaire = query.adversaire;
	marqueurs.compte = query.compte;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

};

//-------------------------------------------------------------------------//

module.exports = trait;
