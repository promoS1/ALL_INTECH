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

	joueurs = {};
	joueurs.pseudo = query.compte;

	contenuPartie = JSON.stringify(joueurs);
	fs.writeFileSync("./json/" + query.compte +".json", contenuPartie, "UTF-8");

    page = fs.readFileSync('./html/table.html', 'utf-8');

    marqueurs = {};
    marqueurs.erreur = "";
    marqueurs.compte = "";
    page = page.supplant(marqueurs);

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
