//=========================================================================
// Traitement de "function_distribution_carte"
// Auteur : ALL_INTECH
// Version : 29/04/2018
//=========================================================================
"use strict";

// EN TETE

var fs = require("fs"); 

// DEBUT DE LA FONCTION

var function_melange_cartes = function (nb1, nb2) {

	var cartes;
	var river = [0, 0, 0];
	var contenu;
	var i;
	var tmp;

	contenu = fs.readFileSync("../json/cartes.json", "UTF-8");
	cartes = JSON.parse(contenu);

	tmp = 0;

	for (i = 0; i < 40; i++) {
		nb1 = Math.floor(Math.random() * 52) + 0;
		nb2 = Math.floor(Math.random() * 52) + 0;
		tmp = cartes[nb1];
		cartes[nb1] = cartes[nb2];
		cartes[nb2] = tmp;
	}

	contenu = JSON.stringify(cartes);
	fs.writeFileSync("../json/cartes.json", contenu, "UTF-8");
};
//--------------------------------------------------------------------------

module.exports = function_melange_cartes;
