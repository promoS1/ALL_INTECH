//=========================================================================
// Traitement de "function_couleur.js"
// Auteur : ALL IN'TECH
// Version : 15/05/2018
//=========================================================================
"use strict";

var function_couleur = function (carte1Joueur, carte2Joueur, riviere, joueur, partie) {

	// VARIABLE JSON
	var contenu_partie;
	var membres;
	var fs = require ("fs");

	//VARIABLE
	var listeCouleurMain;
	var compteur;
	var i;


	// LECTURE JSON
	contenu_partie = fs.readFileSync("./tables/"+partie+".json", "UTF-8");
	membres = JSON.parse(contenu_partie);

	// ON STOCK DANS UNE LISTE
	listeCouleurMain = [carte1Joueur, carte2Joueur, riviere[0].couleur, riviere[1].couleur, riviere[2].couleur, riviere[3].couleur, riviere[4].couleur ];

	// ON TRI DANS L'ORDRE CROISANT 
	listeCouleurMain.sort((a,b) => a - b);

	compteur = 0;

	for( i = 0; i < listeCouleurMain.length; i++){
		if(listeCouleurMain[i] === listeCouleurMain[i + 1]){
			compteur++;
		}
	}

	if(compteur >= 5){
		membres.valeurMain[joueur] = 6;
	}

	contenu_partie = JSON.stringify(membres);
	fs.writeFileSync("./tables/"+partie+".json", contenu_partie, "UTF-8");

};
//--------------------------------------------------------------------------

module.exports = function_couleur;
