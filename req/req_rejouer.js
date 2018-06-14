//=========================================================================
// Traitement de "req_rejouer"
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
	var contenu_partie;
	var partie;
	var i;
	var a;
	var b;
	var connecte;
	var nouvellePartie;
	var distribution;
	var melange;
	var mains;
	var river;
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

	contenu_fichier = fs.readFileSync("./json/connecte.json" , "UTF-8");
	membres = JSON.parse (contenu_fichier);

	for (i = 0 ; i < membres.length ; i++) {
		if (membres[i].compte === query.compte) {
			partie = membres[i].table;
		}
	}

	// LECTURE DU JSON TABLE
	membres = JSON.parse(contenu_fichier);
	contenu_partie = fs.readFileSync("./tables/"+partie+".json" , "UTF-8");

	// DANS LE JSON DE LA TABLE, ON ENVOIE LE PREMIER "JOEURS" SUR MODELE PAGE JOUEUR
	for (i = 0 ; i < membres.length ; i++) {
		if (membres[i].joueurs === query.compte && query.compte === partie) {
			page = fs.readFileSync ("./html/modele_page_joueur.html" , "UTF-8");
		} else {
			page = fs.readFileSync ("./html/modele_page_attendre.html" , "UTF-8");
		}
	}

	contenu_partie = JSON.stringify(membres);
	fs.writeFileSync("./tables/"+partie+".json" , contenu_fichier, 'UTF-8');

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
	nouvellePartie.solde[0] = {soldeJoueur};
	nouvellePartie.solde[1] = {soldeAdversaire};

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

	marqueurs = {};
	// MARQUEURS HTML

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
