//=============================================================================
// Traitement de "req_creerTable"
// Auteur : ALL IN'TECH 
// Version : 17/06/18
//==============================================================================
"use strict";

var fs = require("fs");
var remedial = require("remedial");

var trait = function (req, res, query) {

	var marqueurs;
	var page;
	var partie;
	var contenu_partie;
	var contenu_fichier;
	var connecte;
	var i;
	var a; 
	var b;
	var nouvellePartie;
	var distribution;
	var melange;
	var mains;
	var river;
	var membres;
	var table;
	var carteJoueurs;
	var carte2Joueurs;
	var carte1Riviere;
	var carte2Riviere;
	var carte3Riviere;
	var carte4Riviere;
	var carte5Riviere;
	var soldeJoueur;
	var soldeAdversaire;
	var miseJoueur;
	var miseAdversaire;
	var choix;
	var attendre;
	var pot;

	// VARIABLES DES COMBINAISONS
	var x;
	var valeurMainJoueur;
	var carte1Joueur;
	var carte2Joueur;
	var couleur1Joueur;
	var couleur2Joueur;
	var riviere;

	// VARIABLE QUI APPELLE LA FONCTION
	var carteHaute = require("../fonctions/function_carte_haute.js");
	var paire = require("../fonctions/function_paire.js");
	var doublePaire = require("../fonctions/function_double_paire.js");
	var brelan = require("../fonctions/function_brelan.js");
	var quinte = require("../fonctions/function_quinte.js");
	var couleur = require("../fonctions/function_couleur.js");
	var full = require("../fonctions/function_full.js");
	var carre = require("../fonctions/function_carre.js");
	var quinteFlush = require("../fonctions/function_quinte_flush.js");
	var quinteFlushRoyale = require("../fonctions/function_quinte_flush_royale.js");

	// LECTURE DU JSON DES MEMBRES
	contenu_fichier = fs.readFileSync("./json/connecte.json", "UTF-8");
	membres = JSON.parse(contenu_fichier);

	// ON DONNE LA DISPONIBILITE DE CHAQUE JOUEURS
	for (a = 0 ; a < membres.length ; a++) {
		if (membres[a].compte === query.compte) {
			membres[a].connecte = "joue";
		}
	}
	for (b = 0 ; b < membres.length ; b++) {
		if (membres[b].compte === query.adversaire) {
			membres[b].connecte = "joue";
		}
	}

	// LANCEMENT DU TOUR
	contenu_fichier = JSON.stringify(membres);
	fs.writeFileSync("./json/connecte.json" , contenu_fichier , "UTF-8");

	// CODE JEU

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
	nouvellePartie.joueurs[1] = query.adversaire;

	// TOUR DE JEU
	nouvellePartie.tour = query.compte;

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

	// POT
	//nouvellePartie.pot = Number(nouvellePartie.pot);
	nouvellePartie.pot = Number(0);

	for (i = 0 ; i < nouvellePartie.mise[i] ; i++) {
		nouvellePartie.solde += nouvellePartie.mise[i];
	}
	// SOLDE DE CHAQUE JOUEURS, SOLDE DE DEPART DE 100
	nouvellePartie.solde = [];
	nouvellePartie.solde[0] = 1000;
	nouvellePartie.solde[1] = 1000;

	// DISTRIBUTION DES CARTES DANS LA MAIN ET DANS LA RIVIERE
	mains = nouvellePartie.main;
	river = nouvellePartie.river;

	// ATTENDRE TRUE OU FALSE
	nouvellePartie.attendre = [false,false];

	// VALEUR DES MAINS
	nouvellePartie.valeurMain = [0,0];

	distribution(mains, river);

	// ECRITURE DANS LE JSON DE PARTIE AVEC LES NOUVELLES DONNEES
	contenu_partie = JSON.stringify(nouvellePartie);
	fs.writeFileSync("./tables/"+query.compte+".json", contenu_partie, "UTF-8");

	// LECTURE DU JSON DE LA PARIE POUR POUVOIR PARAMETRER LES MARQUEURS
	contenu_partie = fs.readFileSync("./tables/"+query.compte+".json", "UTF-8");
	nouvellePartie = JSON.parse(contenu_partie);

	// JOUEURS 1
	if(query.compte === nouvellePartie.joueurs[0]){
		carteJoueurs = nouvellePartie.main[0][0].couleur + nouvellePartie.main[0][0].valeur;
		carte2Joueurs = nouvellePartie.main[0][1].couleur + nouvellePartie.main[0][1].valeur;
		miseJoueur = nouvellePartie.mise[0];
		miseAdversaire = nouvellePartie.mise[1];
		soldeJoueur = nouvellePartie.solde[0];
		soldeAdversaire = nouvellePartie.solde[1];
	}

	// JOUEUR 2
	if(query.compte === nouvellePartie.joueurs[1]){
		carteJoueurs = nouvellePartie.main[0][2].couleur + nouvellePartie.main[0][2].valeur;
		carte2Joueurs = nouvellePartie.main[0][3].couleur + nouvellePartie.main[0][3].valeur;
		miseJoueur = nouvellePartie.mise[1];
		miseAdversaire = nouvellePartie.mise[0];
		soldeJoueur = nouvellePartie.solde[1];
		soldeAdversaire = nouvellePartie.solde[0];
	}

	pot = nouvellePartie.pot;

	if (pot === 0) {
		choix = "miser";
	} else {
		choix = "relancer";
	}

	carte1Riviere = nouvellePartie.river[0].couleur + nouvellePartie.river[0].valeur; 
	carte2Riviere = nouvellePartie.river[1].couleur + nouvellePartie.river[1].valeur; 
	carte3Riviere = nouvellePartie.river[2].couleur + nouvellePartie.river[2].valeur; 
	carte4Riviere = nouvellePartie.river[3].couleur + nouvellePartie.river[3].valeur; 
	carte5Riviere = nouvellePartie.river[4].couleur + nouvellePartie.river[4].valeur; 

	// FERMETURE DU JSON QUI PERMET DE MODIFIER LES PARAMETRES DES MARQUEURS
	contenu_partie = JSON.stringify(nouvellePartie);
	fs.writeFileSync("./tables/"+query.compte+".json", contenu_partie, "UTF-8");

	// LECTURE DU JSON DE LA PARIE POUR POUVOIR PARAMETRER LES MARQUEURS
	contenu_partie = fs.readFileSync("./tables/"+query.compte+".json", "UTF-8");
	nouvellePartie = JSON.parse(contenu_partie);

	// CALCUL DES MAINS
	partie = query.compte;
	riviere = nouvellePartie.river;

	for(x = 0; x < nouvellePartie.joueurs.length; x++){

		carte1Joueur = nouvellePartie.main[x][0].valeur;
		carte2Joueur = nouvellePartie.main[x][1].valeur;
		couleur1Joueur = nouvellePartie.main[x][0].couleur;
		couleur2Joueur = nouvellePartie.main[x][1].couleur;

		carteHaute(carte1Joueur, carte2Joueur, riviere, x, partie);
		paire(carte1Joueur, carte2Joueur, riviere, x, partie);
		doublePaire(carte1Joueur, carte2Joueur, riviere, x, partie);
		brelan(carte1Joueur, carte2Joueur, riviere, x, partie);
		quinte(carte1Joueur, carte2Joueur, riviere, x, partie);
		//couleur(couleur1Joueur, couleur2Joueur, riviere, x, partie);
		full(carte1Joueur, carte2Joueur, riviere, x, partie);
		carre(carte1Joueur, carte2Joueur, riviere, x, partie);
		quinteFlush(carte1Joueur, carte2Joueur, riviere, x, partie);
		//quinteFlushRoyale(carte1Joueur, carte2Joueur, riviere, x, partie);

	}

	// AFFICHAGE DE LA PAGE DE JEU
	page = fs.readFileSync("./html/modele_page_joueur.html" , "UTF-8");

	// MARQUEURS HTML
	marqueurs = {};

	// MARQUEURS CARTE JOUEUR
	marqueurs.carte2Joueurs = carte2Joueurs;
	marqueurs.carteJoueurs = carteJoueurs;

	// MARQUEURS CARTE DE LA RIVIERE
	marqueurs.carte1Riviere = carte1Riviere;
	marqueurs.carte2Riviere = carte2Riviere;
	marqueurs.carte3Riviere = carte3Riviere;
	marqueurs.carte4Riviere = carte4Riviere;
	marqueurs.carte5Riviere = carte5Riviere;

	marqueurs.soldeJoueur = soldeJoueur;
	marqueurs.soldeAdversaire = soldeAdversaire;
	marqueurs.pot = pot;
	marqueurs.miseJoueur = miseJoueur;
	marqueurs.miseAdversaire = miseAdversaire;
	marqueurs.choix = choix;

	marqueurs.compte = query.compte;
	marqueurs.adversaire = query.adversaire;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
