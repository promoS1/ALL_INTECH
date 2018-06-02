//====================================================================
// Traitement de "req_miser"
// Auteur : ALL IN'TECH
// Version : 28/05/2018
//=========================================================================
"use strict";

var fs = require("fs");
var remedial = require("remedial");

var trait = function (req, res, query) {

    var marqueurs;
    var page;
	var contenu_fichier;
	var membres;
	var i;


	// PASSAGE DE JOUEUR ACTIF A PASSIF
	membres = JSON.parse(contenu_fichier);
	contenu_fichier = fs.readFileSync("./tables/"+query.table+".json" , "UTF-8");
	
	membres.tour = query.adversaire;
	// LE JOUEUR EST SUR PAGE ATTENDRE
	membres.attendre = true;

	contenu_fichier = JSON.stringify(membres);
	fs.writeFileSync("./tables/"+query.table+".json" , contenu_fichier, 'UTF-8');

    // AFFICHAGE DE LA PAGE RESULTAT
	page = fs.readFileSync('./html/modele_page_attendre.html', 'UTF-8');

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
