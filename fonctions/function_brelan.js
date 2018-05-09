//=========================================================================
// Traitement de "function_brelan.js"
// Auteur : ALL IN'TECH
// Version : 01/05/2018
//=========================================================================
"use strict";

// EN TETE

var fs = require ("fs");

// CORPS

// DEBUT DE LA FONCTION

var function_brelan = function (carte1Joueur1, carte2Joueur1) {


	var river1;
	var river2;
	var river3;
	var valeurMain;

	valeurMain = 0;
	if (carte1Joueur1 === carte2Joueur1) {
		if (carte1Joueur1 === river1 || carte1Joueur1 === river2 || carte1Joueur1 === river3) {
			valeurMain = 4;
		}
	} else if (carte1Joueur1 !== carte2Joueur1) { 

		// CARTE 1

		if (carte1Joueur1 === river1 && carte1Joueur1 === river2) {
			valeurMain = 4;
		} else if (carte1Joueur1 === river1 && carte1Joueur1 === river3) {
			valeurMain = 4;
		} else if (carte1Joueur1 === river2 && carte1Joueur1 === river3) {
			valeurMain = 4;

			// CARTE 2

		} else if (carte2Joueur1 === river1 && carte2Joueur1 === river2) {
			valeurMain = 4;
		} else if (carte2Joueur1 === river1 && carte2Joueur1 === river3) {
			valeurMain = 4;
		} else if (carte2Joueur1 === river2 && carte2Joueur1 === river3) {
			valeurMain = 4;
		}
	};
	//--------------------------------------------------------------------------

	module.exports = function_brelan;
