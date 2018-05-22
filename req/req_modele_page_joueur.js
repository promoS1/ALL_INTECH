//=========================================================================
// Traitement de "req_modele_page_joueur"
// Auteur :ALL IN'TECH 
// Version : 25/04/2018
//=========================================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

    var marqueurs;
    var page;
	var joueurs;
	var contenuPartie;

    // AFFICHAGE DE LA PAGE D'ACCUEIL

    page = fs.readFileSync('./html/modele_page_joueur.html', 'utf-8');


	joueurs = {};
    joueurs.compte = query.compte;
    joueurs.position = 0;
    joueurs.cartes = "";
    joueurs.solde = "100";

	// DISTRIBUTION DES CARTES
	
    contenuPartie = JSON.stringify(joueurs);
    fs.writeFileSync("./tables/" + query.compte +".json", contenuPartie, "UTF-8");


    marqueurs = {};
    marqueurs.compte = query.compte;
    page = page.supplant(marqueurs);

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();




};
//--------------------------------------------------------------------------

module.exports = trait;

