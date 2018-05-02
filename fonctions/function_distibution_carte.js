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
var river = [0, 0, 0];
var contenu;
var i;
var nb1;
var nb2;
var tmp = 0;

contenu = fs.readFileSync("../json/cartes.json", "UTF-8");
cartes = JSON.parse(contenu);

// CORPS
for (i = 0; i < 40; i++) {
	nb1 = Math.floor(Math.random() * 52) + 0;
	nb2 = Math.floor(Math.random() * 52) + 0;
	//console.log(nb1, nb2);
	tmp = cartes[nb1];
	cartes[nb1] = cartes[nb2];
	cartes[nb2] = tmp;
	//console.log(nb1, nb2);
}

contenu = JSON.stringify(cartes);
fs.writeFileSync("../json/cartes.json", contenu, "UTF-8");
