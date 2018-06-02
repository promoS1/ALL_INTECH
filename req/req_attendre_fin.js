//=========================================================================
// Traitement de "req_attendre_fin"
// Auteur : ALL IN'TECH
// Version : 31/05/2018
//=========================================================================
"use strict";

var fs = require("fs");
var remedial = require("remedial");

var trait = function (req, res, query) {

    var marqueurs;
    var page;
	var membres;
	var contenu_fichier;
	var i;

	contenu_fichier = fs.readFileSync("./tables/"+query.compte+".json" , "UTF-8");
	membres = JSON.parse(contenu_fichier);
	
	// ON VERIFIE SI TOUS LES JOUEURS SONT SUR PAGE ATTENDRE
	//for (i = 0 ; i < membres.length ; i++) {
		// SI OUI ON LES REDIRIGE VERS PAGE RESULTAT
//		if (membres[i].attendre === true) {
//			page = fs.readFileSync ("./html/modele_page_resultat.html" , "UTF-8");
//		} else {
			page = fs.readFileSync ("./html/modele_page_attendre.html" , "UTF-8");
//		}
	//	}	

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
