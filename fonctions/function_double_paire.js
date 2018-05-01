//=========================================================================
// Traitement de "function_double_paire.js"
// Auteur : Benjamin
// Version : 01/05/2018
//=========================================================================
"use strict"

// EN TETE

var fs = require ("fs");

// CORPS

// DEBUT DE LA FONCTION

var trait = function (req, res, query) {


    var river1;
    var river2;
    var river3;
    var carte1Joueur1;
    var carte2Joueur1;
    var valeurMain;

    valeurMain = 0;
    if (carteJoueur1 === carteJoueur2) {
		if (carte1Joueur1 === river1 || carte1Joueur1 === river2 || carte1Joueur1 === river3 ) {
			valeurMain = 3;
		} else if (carte2Joueur1 === river1 || carte2Joueur1 === river2 || carte2Joueur1 === river3) {
			valeurMain = 3;
		}
    } else if (carte1Joueur1 === river1 || carte1Joueur1 === river2 || carte1Joueur1 === river3 ) {
        if (carteJoueur1 === carteJoueur2) {
			valeurMain = 3;
		} else if (carte2Joueur1 === river1 || carte2Joueur1 === river2 || carte2Joueur1 === river3 ) {
			valeurMain = 3;
		}
    } else if (carte2Joueur1=== river1 || carte2Joueur1 === river2 || carte2Joueur1 === river3 ) {
		if (carte1Joueur1 === carte2Joueur1) {
			valeurMain = 3;
		} else if (carte1Joueur1 === river1 || carte1Joueur1 === river2 || carte1Joueur1 === river3 ) {
			valeurMain = 3;
		}
    }
};
//--------------------------------------------------------------------------

module.exports = trait;
