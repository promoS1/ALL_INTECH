//=========================================================================
// Traitement de "function_carre.js"
// Auteur : ALL IN'TECH
// Version : 01/05/2018
//=========================================================================
"use strict";

// EN TETE

var fs = require ("fs");

// CORPS

// DEBUT DE LA FONCTION

var function_carre = function (carte1Joueur1, carte2Joueur1) {


    var river1;
    var river2;
    var river3;
    var valeurMain;

	if (carte1Joueur1 === carte2Joueur1) {
		if (carte1Joueur1 === river1 && carte1Joueur1 === river2) {
			valeurMain = 8;
		} else if (carte1Joueur1 === river2 && carte1Joueur1 === river3) {
			valeurMain = 8;
		} else if (carte1Joueur1 === river1 && carte1Joueur1 === river3) {
			valeurMain = 8;
		}
	} else if (carte1Joueur1 !== carte2Joueur1) {
		if (river1 === river2 && river1 === river3) {
			// CARTE 1
			if (carte1Joueur1 === river1) {
			valeurMain = 8;
			// CARTE 2
			} else if (carte2Joueur2 === river2) {
			valeurMain = 8;
			}
		}
	}
};
//--------------------------------------------------------------------------

module.exports = function_carre;
