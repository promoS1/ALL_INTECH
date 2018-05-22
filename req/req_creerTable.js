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
	var partie;
	var contenuPartie;
	var joueurs;
	var pseudo;
	var hotes;
	var nouvelHote;
	var contenuHotes;
	var riviere;
	var contenuRiviere;
	var contenu_fichier;
	var connecte;
	var i;


// AFFICHAGE DE LA PAGE D'ACCUEIL


// DONNE INFOS DE L'ADMIN DANS LE JSON
	joueurs = [];
	joueurs.compte = query.compte;
	joueurs.partie_en_attente = true;
	joueurs.position = "";
	joueurs.cartes = "";
	joueurs.solde = "";


// LANCEMENT PARTIE EN ATTENTE -> TRUE
	contenu_fichier = fs.readFileSync ('./json/connecte.json' , 'utf-8');
	connecte = JSON.parse(contenu_fichier);
	
	for (i = 0 ; i < connecte.length ; i++) {
		if (query.compte === connecte[i].compte) { 
			connecte[i].partie_en_attente = true;
		}
	}
	
	contenu_fichier = JSON.stringify (connecte);
	fs.writeFileSync ('./json/connecte.json' , contenu_fichier , 'utf-8');

/*

	contenuHotes = fs.readFileSync("./tables/hotes.json", "UTF-8");
	hotes = JSON.parse(contenuHotes);
	
	nouvelHote = {};
	nouvelHote.pseudo = query.compte;
	hotes.push(nouvelHote);


	contenuHotes = JSON.stringify(hotes);
	contenuHotes = fs.writeFileSync("./tables/hotes.json", contenuHotes, "UTF-8");
	
	// CREATION DU JSON AVEC LE NOM DE L'ADMIN

	contenuPartie = JSON.stringify(joueurs);
	fs.writeFileSync("./tables/" + query.compte + ".json", contenuPartie, "UTF-8");

	contenuRiviere = JSON.stringify(riviere);
	fs.writeFileSync("./tables/" + query.compte +"Riviere.json", contenuRiviere);
*/
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
