//=========================================================================
// Traitement de "req_actualiser_accueil_membre"
// Auteur : ALL IN'TECH
// Version : 26/04/2018
//=========================================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

    var marqueurs;
    var page;
	var contenu;
	var partie_en_attente;
	var connecte;
	

    // AFFICHAGE DE LA PAGE D'ACCUEIL

    page = fs.readFileSync('html/modele_accueil_membre.html', 'utf-8');

    
	
	
	// AFFICHAGE DES PARTIES EN ATTENTE

	contenu_fichier = fs.readFileSync("./json/connecte.json", "UTF-8");
	contenu = JSON.parse (contenu_fichier);

	connecte[i].partie_en_attente = "";

	for (var i = 0 ; i < connecte.length ; i++) {
		if (connecte[i].partie_en_attente === true) {
			partie_en_attente += 
	
		}
	}

	marqueurs.partie = partie_en_attente;
	
	
	marqueurs = {};
    marqueurs.compte = query.compte;
    page = page.supplant(marqueurs);


    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
