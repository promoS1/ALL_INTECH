//=========================================================================
// Traitement de "req_reponse_hote"
// Auteur :ALL IN'TECH 
// Version : 27/05/2018
//=========================================================================
"use strict";

var fs = require("fs");
var remedial = require('remedial');


var trait = function (req, res, query) {

	var contenu_fichier;
	var liste_membres;
	var compte;
	var adversaire_trouve;
	var adversaire;
	var joueurs;
	var i;
	var marqueurs;
	var page;


	// LECTURE DU JSON 
	contenu_fichier = fs.readFileSync("./json/connecte.json", "UTF-8");
	liste_membres = JSON.parse(contenu_fichier);
	
	// ON DONNE LA DISPONIBILITE DE CHAQUE JOUEURS
	adversaire_trouve = false;
	for (i = 0 ; i < liste_membres.length; i++) {
		if (liste_membres[i].compte === query.compte) {
			compte = liste_membres[i].compte;
			if (liste_membres[i].connecte === "attente") {
				adversaire_trouve = true;
				adversaire = liste_membres[i].adversaire;
			}
		}
	}

	// ENVOIE VERS LES DIFFERENTES PAS HTML EN FONCTION DU STATUT
	if (adversaire_trouve === false) {
		page = fs.readFileSync ("./html/modele_salon_multi.html","UTF-8");
	} else if (adversaire_trouve === true) {
		page = fs.readFileSync ("./html/modele_reponse_defi.html", "UTF-8");
	} else {
		page = fs.readFileSync ("./html/modele_accueil_membre.html" , "UTF-8");
	}
/*
	// CREATION DU MARQUEUR JOUEURS
	joueurs = "";
	for (i = 0; i < liste_membres.length; i++) {
		if (liste_membres[i].compte !== query.compte && liste_membres[i].connecte === true && liste_membres[i].libre === true) {
			joueurs = joueurs + "<form action = './req_reponse_defi' method='GET'><input type = 'hidden' name='compte' value='"+ query.compte +"'><input type='submit' name='adversaire' value='"+ liste_membres[i].compte +"'></form>";
		}
	}
*/
	// MARQUEURS
	marqueurs = {};
	marqueurs.joueurs = joueurs;
	marqueurs.compte = query.compte;
	marqueurs.adversaire = adversaire;
	page = page.supplant(marqueurs);


	res.writeHead(200, {'Content-type': 'text/html'});
	res.write(page);
	res.end();

};
//==================================================

module.exports = trait;
