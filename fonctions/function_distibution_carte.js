//=========================================================================
// Traitement de "function_distribution_carte"
// Auteur : Benjamin
// Version : 29/04/2018
//=========================================================================
"use strict";

// EN TETE


var fs = require("fs"); 
var cartes = [];
var river;
var contenu;
var i;

contenu = fs.readFileSync("../json/cartes.json", "UTF-8");
cartes = JSON.parse(contenu);

river = [];

// CORPS

for (river = 0 ; river < 5; river++) {

	do {

		cartes[i] = Math.floor(Math.random() * 52) + 1;
		i++;
		console.log(cartes);
		cartes[i].dispo = false;
	} while (cartes[i].dispo = false)
}
