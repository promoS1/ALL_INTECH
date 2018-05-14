//=========================================================================
// Traitement de "main.js"
// Auteur : ALL-IN'TECh
// Version : 04/05/2018
//=========================================================================
"use strict";

//===============================VARIABLE==================================
// VARIABLE JSON

var fs = require("fs");
var contenuJoueur;
var joueurs;
var contenuRiviere;
var riviere;
var contenuCarte;
var cartes;

// VARIABLE QUI APPELLE LA FONCTION

var melanger = require("./fonctions/function_melange_cartes");
var distribuer = require("./fonctions/function_distribution_cartes.js");
var brelan = require("./fonctions/function_brelan.js");

// VARIABLE

var i;
var valeurMainJoueur;
var carte1Joueur;
var carte2Joueur;
var valeurMain;

//========================================================================

// LECTURE JSON

contenuJoueur = fs.readFileSync("./json/table1.json", "UTF-8");
joueurs = JSON.parse(contenuJoueur);

contenuRiviere = fs.readFileSync("./json/riviere.json", "UTF-8");
riviere = JSON.parse(contenuRiviere);

contenuCarte = fs.readFileSync("./json/testcartes.json", "UTF-8");
cartes = JSON.parse(contenuCarte);

// EXECUTION DES FONCTIONS

//melanger(cartes);
//distribuer(joueurs, cartes, riviere);
//console.log("Les cartes ont été mélangées et distrubuées!");

// TEST COMBINAISON POUR CHAQUE JOUEUR


for(i = 0; i < joueurs.length; i++){

valeurMainJoueur = joueurs[i];
carte1Joueur = joueurs[i].Carte1[0].valeur; 
carte2Joueur = joueurs[i].Carte2[0].valeur;
valeurMain = joueurs[i].valeurMain;

brelan(carte1Joueur, carte2Joueur, riviere, valeurMainJoueur);

console.log("Le joueur " + i + " a comme valeur de main: " + valeurMain);

}

// ECRITURE JSON

contenuJoueur = JSON.stringify(joueurs);
fs.writeFileSync("./json/table1.json", contenuJoueur, "UTF-8");

contenuRiviere = JSON.stringify(riviere);
fs.writeFileSync("./json/riviere.json", contenuRiviere, "UTF-8");

contenuCarte = JSON.stringify(cartes);
fs.writeFileSync("./json/testcartes.json", contenuCarte, "UTF-8");
