//=========================================================================
// Traitement de "req_reponse_defi"
// Auteur : ALL IN'TECH
// Version : 28/05/2018
//=========================================================================
"use strict";

var fs = require("fs");
var remedial = require ("remedial");

var trait = function (req, res, query) {

	var marqueurs;
	var contenu_fichier;
	var membres;
	var i;
	var a;
	var nouvellePartie;
	var contenu_partie;
	var page;
	var adversaire_trouve;
	var compte;
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
	var miseJoueur;
	var miseAdversaire;
	var choix;


	// LECTURE DU JSON CONNECTE POUR SAVOIR QUELS JOUEURS VEULENT JOUER
	contenu_fichier = fs.readFileSync("./json/connecte.json", "UTF-8");
	membres = JSON.parse (contenu_fichier);

	adversaire_trouve = false;
	// REDIRECTION VERS LES DIFFERENTES PAGES QUAND JOUEUR DÉFIÉ
	for (i = 0 ; i < membres.length; i++) {
		if (membres[i].compte === query.compte) {
			a=i;
			if (membres[a].connecte === true) {
				adversaire_trouve = true; 	
			}
		}
	}

	for (i = 0 ; i < membres.length ; i++) {
		if (membres[i].compte === query.compte) {
			partie = membres[i].table;
		}
	}


	if (membres[a].connecte === "attente") {
		page = fs.readFileSync("./html/modele_attendre_reponse.html" , "UTF-8");
	} else if (membres[a].connecte === "joue") {

		// LECTURE DU JSON DE LA PARIE POUR POUVOIR PARAMETRER LES MARQUEURS

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

		page = fs.readFileSync("./html/modele_page_adversaire.html", "UTF-8");

	} else if (membres[i].compte === query.adversaire) {
		if (membres[i].connecte === true) {
			page = fs.readFileSync ("./html/modele_salon_mutli.html" , "UTF-8");
		}
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

//-------------------------------------------------------------------------//

module.exports = trait;
