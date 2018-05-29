//========================================================================
// Traitement de "req_creerTable"
// Auteur : ALL IN'TECH 
// Version : 16/05/18
//=========================================================================
"use strict";

var fs = require("fs");
var remedial = require("remedial");

var trait = function (req, res, query) {

    var marqueurs;
    var page;
	var partie = [];
	var contenu_partie;
	var contenu_fichier;
	var connecte;
	var i;
	var nouvellePartie;
	var distribution;
	var melange;
	var mains;
	var river;

/*

	ON GARDE ????
	partie.joueurs = [];
	partie.enJeu = false;
	partie.tour = 0;
	partie.riviere = [];
	partie.main = [];
	partie.mise = [];
	partie.solde = [];

	contenu_partie = JSON.stringify(partie);
	fs.writeFileSync("./tables/"+query.compte+".json", contenu_partie,  "UTF-8");


	// LANCEMENT PARTIE EN ATTENTE 
	contenu_fichier = fs.readFileSync ('./json/connecte.json' , 'utf-8');
	connecte = JSON.parse(contenu_fichier);
	
	for (i = 0 ; i < connecte.length; i++) {
		if (query.compte === connecte[i].compte) { 
			connecte[i].table = query.compte;
		}
	}

	contenu_fichier = JSON.stringify (connecte);
	fs.writeFileSync ('./json/connecte.json' , contenu_fichier , 'utf-8');
*/	
	// APPEL DES MODULES MELANGER ET LES COMBINAISONS
	melange = require("../fonctions/function_melange_cartes.js");
	distribution = require("../fonctions/function_distribution_cartes.js");

	// APPEL DES FONCTIONS
	melange();

	// ECRITURE DU JSON DE PARTIE
	nouvellePartie = {};
	nouvellePartie.admin = query.compte;

	// JOUEURS DE LA PARTIE
	nouvellePartie.joueurs = [];
	nouvellePartie.joueurs[0] = query.compte;
	
	// AJOUT DE(S) ADVERSAIRE(S)
	for (i = 0 ; i < nouvellePartie.joueurs[i] ; i++) { 
		nouvellePartie.joueurs += nouvellePartie.joueurs[i];
		nouvellePartie.joueurs[i] += query.adversaire;
	}

	// TOUR DE JEU
/*	
	nouvellePartie.tour = [];
	nouvellePartie[i].tour = 0;
	nouvellePartie[i].tour = 1;
*/

	// CARTES DE LA RIVIERE
	nouvellePartie.river = [];
	
	// CARTES EN MAIN
	nouvellePartie.main = [];
	nouvellePartie.main[0] = [];
	nouvellePartie.main[1] = [];
	
	// MISE DE CHAQUE JOUERS
	nouvellePartie.mise = [];
	nouvellePartie.mise[0] = 0 ;
	nouvellePartie.mise[1] = 0 ;
	
	for (i = 0 ; i < nouvellePartie.mise[i] ; i++) {
		nouvellePartie.solde += nouvellePartie.mise[i];
	}
	// SOLDE DE CHAQUE JOUEURS, SOLDE DE DEPART DE 100
	nouvellePartie.solde = [];
	nouvellePartie.solde[0] = 100;
	nouvellePartie.solde[1] = 100;
	
	// DISTRIBUTION DES CARTES DANS LA MAIN ET DANS LA RIVIERE
	mains = nouvellePartie.main;
	river = nouvellePartie.river;

	distribution(mains, river);

	// ECRITURE DANS LE JSON DE PARTIE AVEC LES NOUVELLES DONNEES
	contenu_partie = JSON.stringify(nouvellePartie);
	fs.writeFileSync("./tables/"+query.compte+".json", contenu_partie, "UTF-8");


	// AFFICHAGE DE LA PAGE DE JEU
    page = fs.readFileSync("./html/modele_page_joueur.html" , "UTF-8");

    marqueurs = {};
    marqueurs.compte = query.compte;
	marqueurs.adversaire = query.adversaire;
	marqueurs.tables = query.compte;
    page = page.supplant(marqueurs);

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
