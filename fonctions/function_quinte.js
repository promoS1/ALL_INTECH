//=========================================================================
// Traitement de "function_quinte.js"
// Auteur : ALL IN'TECH
// Version : 01/05/2018
//=========================================================================
"use strict";

// EN TETE

var fs = require ("fs");



// DEBUT DE LA FONCTION

var function_quinte = function (carte1Joueur, carte2Joueur, riviere, valeurMain) {

	var river = [];
	var i;
	var suite = 0;

	if (carte2Joueur === (carte1Joueur + 1)) {
		suite += 1;
	} 
	else if (carte1Joueur === (carte1Joueur + 1)) {
		suite += 1;
	}
}

	for (i = 0; i < 5; i++) {
		if (riviere[i] === riviere[i-1]) {
			suite += 1;
		}

	}
}





};
//--------------------------------------------------------------------------

module.exports = function_quinte;
