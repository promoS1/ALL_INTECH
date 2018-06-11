//=========================================================================
// Traitement de "req_attendre_tour"
// Auteur : ALL IN'TECH
// Version : 26/05/2018
//=========================================================================
"use strict";

var fs = require("fs");
var remedial = require("remedial");

var trait = function (req, res, query) {

	var marqueurs;
	var page;
	var contenu_partie;
	var nouvellePartie;
	var i;
	var joue;
	var partie;
	var carteJoueurs;
	var carte2Joueurs;
	var carte1Riviere;
	var carte2Riviere;
	var carte3Riviere;
	var carte4Riviere;
	var carte5Riviere;
	var soldeJoueur;
	var soldeAdversaire;
	var pot;
	var membres;
	var contenu_fichier;
	var miseJoueur;
	var miseAdversaire;
	var choix;

	contenu_fichier = fs.readFileSync("./json/connecte.json" , "UTF-8");
	membres = JSON.parse (contenu_fichier);

	for (i = 0 ; i < membres.length ; i++) {
		if (membres[i].compte === query.compte) {
			partie = membres[i].table;
		}
	}

	// SAVOIR QUI DOIT JOUER
	contenu_partie = fs.readFileSync("./tables/"+partie+".json" , "UTF-8");
	nouvellePartie = JSON.parse(contenu_partie);

	//JOUE = "EN_ATTENTE";
	if (nouvellePartie.tour === query.compte) {
		joue = "en_jeu";
	} else if (nouvellePartie.tour !== query.compte) {
		joue = "en_attente";
	}

	contenu_partie = JSON.stringify(nouvellePartie);
	fs.writeFileSync("./tables/"+partie+".json" , contenu_partie, "UTF-8");

	if (joue === "en_jeu") {
		page = fs.readFileSync("./html/modele_page_joueur.html" , "UTF-8");

		// LECTURE DU JSON DE LA PARIE POUR POUVOIR PARAMETRER LES MARQUEURS

		//	console.log("OUI"+partie);
		contenu_partie = fs.readFileSync("./tables/"+partie+".json", "UTF-8");
		nouvellePartie = JSON.parse(contenu_partie);

		// JOUEUR 1
		if (query.compte === nouvellePartie.joueurs[0]) {
			carteJoueurs = nouvellePartie.main[0][0].couleur + nouvellePartie.main[0][0].valeur;
			carte2Joueurs = nouvellePartie.main[0][1].couleur + nouvellePartie.main[0][1].valeur;
			miseJoueur = nouvellePartie.mise[0];
			miseAdversaire = nouvellePartie.mise[1];
			soldeJoueur = nouvellePartie.solde[0];
			soldeAdversaire = nouvellePartie.solde[1];
		}

		// JOUEUR 2
		if (query.compte === nouvellePartie.joueurs[1]) {
			carteJoueurs = nouvellePartie.main[1][0].couleur + nouvellePartie.main[1][0].valeur;
			carte2Joueurs = nouvellePartie.main[1][1].couleur + nouvellePartie.main[1][1].valeur;	
			miseJoueur = nouvellePartie.mise[0];
			miseAdversaire = nouvellePartie.mise[1];
			soldeJoueur = nouvellePartie.solde[1];
			soldeAdversaire = nouvellePartie.solde[0];
		}

		pot = nouvellePartie.pot;

		if (pot === 0) {
			choix = "miser";
		}else {
			choix = "relancer";
		}

		carte1Riviere = nouvellePartie.river[0].couleur + nouvellePartie.river[0].valeur; 
		carte2Riviere = nouvellePartie.river[1].couleur + nouvellePartie.river[1].valeur; 
		carte3Riviere = nouvellePartie.river[2].couleur + nouvellePartie.river[2].valeur;
		carte4Riviere = nouvellePartie.river[3].couleur + nouvellePartie.river[3].valeur; 
		carte5Riviere = nouvellePartie.river[4].couleur + nouvellePartie.river[4].valeur; 

		// FERMETURE DU JSON QUI PERMET DE MODIFIER LES PARAMETRES DES MARQUEURS
		contenu_partie = JSON.stringify(nouvellePartie);
		fs.writeFileSync("./tables/"+partie+".json", contenu_partie, "UTF-8");

		// AFFICHAGE DE LA PAGE
		//	if (joue === "en_jeu") 
		// page = fs.readFileSync("./html/modele_page_joueur.html" , "UTF-8");
	} else if (joue === "en_attente") {
		page = fs.readFileSync("./html/modele_page_adversaire.html" , "UTF-8");
	} else {
		console.log("ERREUR");
		page = fs.readFileSync ("./html/modele_error.html" , "UTF-8");

	}

	// MARQUEURS HTML
	marqueurs = {};

	// MARQUEURS CARTE JOUEURS
	marqueurs.carte2Joueurs = carte2Joueurs;
	marqueurs.carteJoueurs = carteJoueurs;

	// MARQUEURS CARTES DANS LA RIVIERE
	marqueurs.carte1Riviere = carte1Riviere;
	marqueurs.carte2Riviere = carte2Riviere;
	marqueurs.carte3Riviere = carte3Riviere;
	marqueurs.carte4Riviere = carte4Riviere;
	marqueurs.carte5Riviere = carte5Riviere;

	marqueurs.miseJoueur = miseJoueur;
	marqueurs.miseAdversaire = miseAdversaire;
	marqueurs.soldeJoueur = soldeJoueur;
	marqueurs.soldeAdversaire = soldeAdversaire;
	marqueurs.choix = choix;
	marqueurs.pot = pot;

	marqueurs.compte = query.compte;
	marqueurs.adversaire = query.adversaire;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
