//=========================================================================
// Traitement de "req_creerTable"
// Auteur : ALL'INTECH 
// Version : 16/05/18
//=========================================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

    var marqueurs;
    var page;
	var partie;
	var contenuPartie;
	var joueurs;

    // AFFICHAGE DE LA PAGE D'ACCUEIL


	// DONNE INFOS DE L'ADMIN 

	joueurs = {};
	joueurs.compte = query.compte;
	joueurs.debute = "true";
	joueurs.position = "";
	joueurs.cartes = "";
	joueurs.solde = "";



	contenuPartie = JSON.stringify(joueurs);
	fs.writeFileSync("./tables/" + query.compte +".json", contenuPartie, "UTF-8");

    page = fs.readFileSync('./html/modele_page_table.html' , 'utf-8');

    marqueurs = {};
    marqueurs.compte = query.compte;
    page = page.supplant(marqueurs);

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
