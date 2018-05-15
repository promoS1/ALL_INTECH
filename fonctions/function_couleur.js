//=========================================================================
// Traitement de "function_couleur.js"
// Auteur : ALL IN'TECH
// Version : 15/05/2018
//=========================================================================
"use strict";

// EN TETE

var fs = require ("fs");

// CORPS

// DEBUT DE LA FONCTION

var function_couleur = function (Carte1Joueur, Carte2Joueur, riviere, valeurMainJoueur) {
        
    // VARIABLE

	var river1;
	var river2;
	var river3;

	// TEST DE LA COULEUR

	river1 = riviere[0].couleur;
	river2 = riviere[1].couleur;
	river3 = riviere[2].couleur;
	river4 = riviere[3].couleur;
	river5 = riviere[4].couleur;

	if(carte1Joueur === carte2Joueur){
		if(carte1Joueur === river1 && carte1Joueur === river2 && carte1Joueur && carte1Joueur === river3){
			valeurMain.valeurMain = 6;
		}else if(carte1Joueur === river2 && carte1Joueur === {


		}

	}







};
//--------------------------------------------------------------------------

module.exports = function_couleur;
