//=========================================================================
// Traitement de "function_distribution_carte"
// Auteur : Benjamin
// Version : 29/04/2018
//=========================================================================
"use strict";

// EN TETE

var fs = require("fs"); 
var carte;
var river;

river = {}

// CORPS

river = 0
for (river = 0 ; river <= 5; river++) {
	
	carte = Math.floor(Math.random() * 52) + 1;
	console.log(carte);
}
