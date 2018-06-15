//=========================================================================
// Traitement de "function_quinte.js"
// Auteur : ALL IN'TECH
// Version : 15/05/2018
//=========================================================================
"use strict";

// DEBUT DE LA FONCTION

var function_quinte = function (carte1Joueur, carte2Joueur, riviere, joueur, partie) {

	// VARIABLE JSON 
	var contenu_partie;
	var membres;
	var fs = require ("fs");

	//VARIABLE

	var listeValeurMain;
	var compteur;
	var i;
	var n;

	// LECTURE JSON
	contenu_partie = fs.readFileSync("./tables/"+partie+".json", "UTF-8");
	membres = JSON.parse(contenu_partie);

	// ON STOCK DANS UNE LISTE
	listeValeurMain = [carte1Joueur, carte2Joueur, riviere[0].valeur, riviere[1].valeur, riviere[2].valeur, riviere[3].valeur, riviere[4].valeur ];

	// ON TRI DANS L'ORDRE CROISANT 
	listeValeurMain.sort((a,b) => a - b);

	//ON VERIFIE SI IL Y A UNE SUITE
	n = Number(listeValeurMain[0]);
	compteur = 0;
	i = 0;

	console.log(listeValeurMain)

	while(n < listeValeurMain.length){

		console.log("n"+n);

		i++;

		console.log("i"+i);

		if((n+1) === listeValeurMain[i]){

			console.log("n+1"+n);
		
			compteur++;

			console.log("compteur"+compteur);
		}
		n = Number(listeValeurMain[i]);
	}














/*

	//	var river = [];
	//	var i;
	//	var suite = 0;

	//	if (carte2Joueur === (carte1Joueur + 1)) {
	//		suite += 1;
	//	} 
	//	else if (carte1Joueur === (carte1Joueur + 1)) {
	//		suite += 1;
	//	}
	//}

	//	for (i = 0; i < 5; i++) {
	//		if (riviere[i] === riviere[i-1]) {
	//			suite += 1;
	//		}

	//	}
	//}

	var listeValeurMain = [];
	var nb1;
	var nb2;
	var nb3;
	var nb4;
	var nb5;
	var nb6;
	var nb7;

*/


	};
//--------------------------------------------------------------------------

module.exports = function_quinte;
