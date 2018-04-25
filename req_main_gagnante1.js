"use strict";

// EN TETE 

var fs = require ("fs");

var main_joueur;
var river;
var valeur_main;
var contenu;


main_joueur = {};
river = {};

// CORPS 

contenu = fs.readFileSync("main_joueur.json", "UTF-8");
main_joueur = JSON.parse(contenu);



