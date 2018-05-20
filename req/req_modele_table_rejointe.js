//=========================================================================
// Traitement de "req_modele_table_rejointe"
// Auteur : ALL IN'TECH 
// Version : 25/04/2018
//=========================================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

    var marqueurs;
    var page;
	var contenu;
	var joueurs;
	var connecte;

    // AFFICHAGE DE LA PAGE D'ACCUEIL

    page = fs.readFileSync('./html/modele_table_rejointe.html', 'utf-8');

    marqueurs = {};
    marqueurs.erreur = "";
	marqueurs.compte = query.compte;
    page = page.supplant(marqueurs);
	
	// ON LIT LE FICHIER DES JOUEURS CONNECTES

	contenu = fs.readFileSync("./tables/a.json", "UTF-8");
	joueurs = JSON.parse(contenu);

	// ON REGARDE SI L'ADMIN A LANCER LA PARTIE

	connecte = {};
	
	if (connecte.debute === "true") {
		page = fs.readFileSync ('./html/modele_page_adversaire.html');
	} else if (connecte.debute !== "true") {
		page = fs.readFileSync ('./html/modele_table_rejointe.html');
	}

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
