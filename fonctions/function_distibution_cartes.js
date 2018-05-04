//=========================================================================
// Traitement de "function_distribution_carte"
// Auteur : ALL_INTECH
// Version : 29/04/2018
//=========================================================================
"use strict";

// EN TETE

var fs = require("fs"); 

// DEBUT DE LA FONCTION

var function_distibution_cartes = function () {

	
	var contenu;
	var cartes = [];
	var river = [0, 0, 0];
	var i;
	var j;

	// LECTURE DU JSON DE LA TABLE ACTUELLE

	contenuJoueur = fs.readFileSync("../json/table1.json", "UTF-8");
	joueur = JSON.parse(contenuJoueur);

	contenuCarte = fs.readFileSync("../json/cartes.json", "UTF-8");
	cartes = JSON.parse(contenuCarte);


	// DISTRIBUTION DES CARTES DANS RIVIERE

	for (i = 0 ; i =<3 ; i++) {
		river = cartes[i];
	}

	// DISTRIBUTION DES CARTES AUX JOUEURS

	for (i = 0 ; i < pseudo.length ; i++) {
		for (j = O ; i < 2 ; j++) {
// COMMENT ATTRIBUER DANS LE JSON UNE CARTE DANS L ORDRE
// EX : RIVER = CARTE 1 , CARTE 2 ET CARTE 3 JOUEUR1 : CARTE 4 ET CARTE 5

	contenuJoueur = JSON.stringify(contenuJoueur);
	fs.writeFileSync("../json/table1.json", contenuJoueur, "UTF-8");

	contenuCarte = JSON.stringify(contenuCarte);
	fs.writeFileSync("../json/cartes.json", contenuCarte, "UTF-8");

};
//--------------------------------------------------------------------------

module.exports = function_distribution_carte;
