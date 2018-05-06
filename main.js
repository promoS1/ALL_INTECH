//=========================================================================
// Traitement de "main.js"
// Auteur : ALL-IN'TECh
// Version : 04/05/2018
//=========================================================================
"use strict";

// VARIABLES

var melanger = require("./fonctions/function_melange_cartes");
var distribuer = require("./fonctions/function_distribution_cartes.js");

// EXECUTION DES FONCTIONS

melanger();
distribuer();

console.log("Les cartes ont été mélangées et distrubuées!");
