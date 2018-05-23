//========================================================================
// Traitement de "req_creerTable"
// Auteur : ALL'INTECH 
// Version : 16/05/18
//=========================================================================
"use strict";

var fs = require("fs");
var remedial = require('remedial');

var trait = function (req, res, query) {

    var marqueurs;
    var page;
	var partie = [];
	var contenuPartie;
	var contenu_fichier;
	var connecte;
	var i;

	partie.joueurs = [];
	partie.enJeu = false;
	partie.tour = 0;
	partie.riviere = [];
	partie.main = [];
	partie.mise = [];
	partie.solde = [];

	contenuPartie = JSON.stringify(partie);
	fs.writeFileSync("./tables/"+query.compte+".json", contenuPartie,  "UTF-8");

// LANCEMENT PARTIE EN ATTENTE -> TRUE
	contenu_fichier = fs.readFileSync ('./json/connecte.json' , 'utf-8');
	connecte = JSON.parse(contenu_fichier);
	
	for (i = 0 ; i < connecte.length; i++) {
		if (query.compte === connecte[i].compte) { 
			connecte[i].table = query.compte;
		}
	}
	
	contenu_fichier = JSON.stringify (connecte);
	fs.writeFileSync ('./json/connecte.json' , contenu_fichier , 'utf-8');

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
