//=========================================================================
// Traitement de "req_reponse_defi"
// Auteur : ALL IN'TECH
// Version : 28/05/2018
//=========================================================================
"use strict";

var fs = require("fs");
var remedial = require ("remedial");

var trait = function (req, res, query) {

	var marqueurs;
	var contenu_fichier;
	var membres;
	var i;
	var page;
	var adversaire_trouve;

	// LECTURE DU JSON CONNECTE POUR SAVOIR QUELS JOUEURS VEULENT JOUER
	contenu_fichier = fs.readFileSync("./json/connecte.json", "UTF-8");
	membres = JSON.parse (contenu_fichier);

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
	fs.writeFileSync("./json/connecte.json", contenu_fichier, "UTF-8");

	// REDIRECTION VERS LES DIFFERENTES PAGES QUAND JOUEUR DÉFIÉ
	if (adversaire_trouve === false) {
		page = fs.readFileSync('./html/modele_salon_multi.html','UTF-8');
	} else if (adversaire_trouve === true) {
		page = fs.readFileSync("./html/modele_reponse_defi.html", "UTF-8");
	} else {
		page = fs.readFileSync("./html/modele_attendre_reponse.html", "utf-8");
	}


	// MARQUEURS
	marqueurs = {};
	marqueurs.adversaire = query.adversaire;
	marqueurs.compte = query.compte;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

};

//-------------------------------------------------------------------------//

module.exports = trait;
