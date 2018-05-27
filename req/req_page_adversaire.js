//=========================================================================
// Traitement de "req_page_adversaire"
// Auteur : ALL IN'TECH 
// Version : 27/05/2018
//=========================================================================
"use strict";

var fs = require("fs");
var remedial = require = ("remedial");

var trait = function (req, res, query) {
	
	var contenu_fichier;
	var contenu_fichier2;
	var partie;
	var liste_membres;
	var adversaire;
	var i;
	var a;
	var b;
	var compte;
	var hote;
	var page;
	var marqueurs;


	// LECTURE DU JSON "connecte.json" --> VOIR SI ÉTAT PASSE EN "attente" 
	
	contenu_fichier2 = fs.readFileSync("./json/connecte.json", "utf-8");
	liste_membres = JSON.parse(contenu_fichier2);

	// REDIRECTION VERS PAGE HTML SI JOUEUR DÉFIÉ

	for (i = 0; i < liste_membres.length; i++) {
		if (liste_membres[i].compte === query.compte) {
			compte = query.compte;
			a = i;
			hote = liste_membres[i].hote;
			adversaire = liste_membres[i].adversaire;
			if (liste_membres[i].connecte === true) {
				page = fs.readFileSync('./html/modele_salon_multi.html','utf-8');
			} else if (liste_membres[i].etat === "joue") {
				page = fs.readFileSync("./html/page_adversaire.html", "utf-8");
			} else {
				page = fs.readFileSync("./html/modele_accueil_membre.html", "utf-8");
			}
		}
	}


	marqueurs = {};
	marqueurs.joueur = query.joueur;
	marqueurs.adversaire = adversaire;
	marqueurs.compte = compte;
	marqueurs.hote = hote;

	page = page.supplant(marqueurs);
    
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
};

// ==================================================================================

module.exports = trait;
