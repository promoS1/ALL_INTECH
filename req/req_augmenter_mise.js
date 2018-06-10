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
	var i;
	var page;
	var nouvellePartie;
	var contenu_fichier;
	var contenu_partie;
	var membres;
	var partie;
	var miseJoueur;
	var miseAdversaire;
	var soldesJoueur;

	contenu_fichier = fs.readFileSync("./json/connecte.json" , "UTF-8");
	membres = JSON.parse (contenu_fichier);

	for (i = 0; i < membres.length; i++) {
		if (membres[i].compte === query.compte) {
			partie = membres[i].table;
		}		
	}

	contenu_partie= fs.readFileSync("./tables/"+partie+".json", "UTF-8");
	nouvellePartie = JSON.parse(contenu_partie);

	if (query.compte === nouvellePartie.joueurs[0]) {
		miseJoueur = nouvellePartie.mise[0];
		miseAdversaire = nouvellePartie.mise[1];
		soldesJoueur = nouvellePartie.solde[0]
		while (miseJoueur < soldesJoueur) {
			miseJoueur += (miseJoueur + (miseJoueur / 4));
		}
	}

contenu_partie = JSON.stringify(nouvellePartie);
fs.writeFileSync("./tables/"+partie+".json", contenu_partie, "UTF-8");



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
