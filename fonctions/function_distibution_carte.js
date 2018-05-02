//=========================================================================
// Traitement de "function_distribution_carte"
// Auteur : ALL_INTECH
// Version : 29/04/2018
//=========================================================================
"use strict";

// EN TETE


var cartes;
var fs = require("fs"); 
var cartes;
var river;
var contenu = [];
var i;

contenu = fs.readFileSync("../json/cartes.json", "UTF-8");
cartes = JSON.parse(contenu);

river = [];
cartes = {};

// CORPS

for (river = 0 ; river < 5; river++) {

	do {

		cartes[i] = Math.floor(Math.random() * 52) + 1;
		console.log(cartes[i]);
		cartes[i].dispo = "false";
		i++;
	} while (cartes[i].dispo === "false");
}

contenu = JSON.stringify(cartes);
fs.writeFileSync("../json/cartes.json", contenu, "UTF-8");
