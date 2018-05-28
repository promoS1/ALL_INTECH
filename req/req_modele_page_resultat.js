//=========================================================================
// Traitement de "req_modele_page_resultat"
// Auteur : ALL IN'TECH 
// Version : 28/05/2018
//=========================================================================
"use strict";

var fs = require("fs");
var remedial = require("remedial");

var trait = function (req, res, query) {

    var marqueurs;
    var page;

    // AFFICHAGE DE LA PAGE DE RESULTAT
    page = fs.readFileSync('./html/modele_page_resultat.html', 'UTF-8');

    marqueurs = {};
    marqueurs.compte = query.compte;
	marqueurs.adversaire = query.adversaire;
	marqueurs.table = query.table;
    page = page.supplant(marqueurs);

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
