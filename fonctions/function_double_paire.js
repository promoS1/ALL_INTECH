//=========================================================================
// Traitement de "function_double_paire.js"
// Auteur : ALL IN'TECH
// Version : 14/05/2018
//=========================================================================
"use strict";

// EN TETE

var fs = require ("fs");

// CORPS

// DEBUT DE LA FONCTION

var function_double_paire = function (carte1Joueur, carte2Joueur, riviere, valeurMain) {

	// VARIABLE

    var river1;
    var river2;
    var river3;

	// TEST DU DOUBLE PAIRE

	river1 = riviere[0].valeur;
	river2 = riviere[1].valeur;
	river3 = riviere[2].valeur;

    if (carteJoueur1 === carteJoueur2) {
		if (carte1Joueur1 === river1 || carte1Joueur1 === river2 || carte1Joueur1 === river3 ) {
			valeurMain.valeurMain += 3;
		} else if (carte2Joueur1 === river1 || carte2Joueur1 === river2 || carte2Joueur1 === river3) {
			valeurMain.valeurMain += 3;
		}
    } else if (carte1Joueur1 === river1 || carte1Joueur1 === river2 || carte1Joueur1 === river3 ) {
        if (carteJoueur1 === carteJoueur2) {
			valeurMain.valeurMain += 3;
		} else if (carte2Joueur1 === river1 || carte2Joueur1 === river2 || carte2Joueur1 === river3 ) {
			valeurMain.valeurMain += 3;
		}
    } else if (carte2Joueur1=== river1 || carte2Joueur1 === river2 || carte2Joueur1 === river3 ) {
		if (carte1Joueur1 === carte2Joueur1) {
			valeurMain.valeurMain += 3;
		} else if (carte1Joueur1 === river1 || carte1Joueur1 === river2 || carte1Joueur1 === river3 ) {
			valeurMain.valeurMain += 3;
		}
    }
};
//--------------------------------------------------------------------------

module.exports = function_double_paire;
