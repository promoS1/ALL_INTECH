//=========================================================================
// Traitement de "req_creerTable"
// Auteur : ALL'INTECH 
// Version : 24/04
//=========================================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var table;
    var marqueurs;
    var page;
	query.compte = {};

    // AFFICHAGE DE LA PAGE D'ACCUEIL

	
    page = fs.readFileSync('table.html', 'utf-8');

	table = JSON.stringify(query.compte);
	table = fs.writeFileSync("./tables/query.compte.json", table, "UTF-8");
	query.compte.push("abcd");

    marqueurs.erreur = "";
    marqueurs.compte = "";
    page = page.supplant(marqueurs);

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
	
	// CRÉATION DE L'OBJET CONTENANT LES INFORMATIONS SUR LA PARTIE 


};
//--------------------------------------------------------------------------

module.exports = trait;
