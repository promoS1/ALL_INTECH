//=========================================================================
// Traitement de "req_main_gagnante"
// Auteur : Benjamin
// Version : 25/04/2018
//=========================================================================


// CORRESPONDANCE VALEUR MAIN 

// 0 -> RIEN
// 1 -> 1 PAIRE
// 2 -> 2 PAIRE
// 3 -> BRELAN
// 4 -> QUINTE
// 4,5 -> FULL
// 5 -> COULEUR
// 6 -> CARRE
// 7 -> QUINTE FLUSH
// 8 -> QUINTE FLUSH ROYALE


"use strict";

// EN TETE 

var joueur;
var river;
var carte1;
var carte2;
var river1;
var river2;
var river3;
var valeur_main;
var stop;

joueur = {};
//river = {};


// CORPS
stop = false;

do {
	for (i = 0 ; i < joueur.length ; i++) {
		// PAIRE 1
		if (joueur[i].carte1 !== joueur[i]carte2 && joueur[i].carte1 !== river1 && river1 !== river2 && river2 !== river3) {
			valeur_main[i] = 0;
		} else if (joueur[i].carte1 === river1 || joueur[i].carte1 === river2 || joueur[i].carte1 === river3) {
			valeur_main[i] = 1; 
			// DOUBLE PAIRE
			if (joueur[i].carte2 === river1 || joueur[i].carte2 === river2 || joueur[i].carte2 === river3)
				valeur_main[i] = 2;
			}
		// PAIRE 2	
		} else if (joueur[i].carte2 === river1 || joueur[i].carte2 === river2 || joueur[i].carte2 === river3) {
			valeur_main[i] = 1;
		// BRELAN 1
		} else if (joueur[i].carte1 !== joueur[i].carte2) {
			if (joueur[i].carte1 === river1 && joueur[i].carte1 === river2) {
				valeur_main[i] = 3;
			} else if (joueur[i].carte1 === river2 && joueur[i].carte1 === river3) {
				valeur_main[i] = 3;
			} else if (joueur[i].carte1 === river3 && joueur[i].carte1 === river1) {
				valeur_main[i] = 3;
			}
		// BRELAN 2
		} else if (joueur[i].carte1 === joueur[i].carte2) {
			if (joueur[i].carte1 === river1 || joueur[i].carte1 === river2 || joueur[i].carte1 === river3)
				valeur_main[i] = 3;
			}
		// QUINTE REUSSIR A ORDONNER TOUS LES NB
		} else if ( ) {
			valeur_main[i] = 4;
		// FULL 1
		} else if (joueur[i].carte1 !== joueur[i].carte2) {
            if (joueur[i].carte1 === river1 && joueur[i].carte1 === river2) {
				if (joueur[i].carte1 === river1 || joueur[i].carte1 === river2 || joueur[i].carte1 === river3) {
		            valeur_main[i] = 4,5;
			    } else if (joueur[i].carte2 === river1 || joueur[i].carte2 === river2 || joueur[i].carte2 === river3) {
            		valeur_main[i] = 4,5;	
            } else if (joueur[i].carte1 === river2 && joueur[i].carte1 === river3) {
				 if (joueur[i].carte1 === river1 || joueur[i].carte1 === river2 || joueur[i].carte1 === river3) {
                    valeur_main[i] = 4,5;
                 }  else if (joueur[i].carte2 === river1 || joueur[i].carte2 === river2 || joueur[i].carte2 === river3) {
                    valeur_main[i] = 4,5;
            } else if (joueur[i].carte1 === river3 && joueur[i].carte1 === river1) {
				 if (joueur[i].carte1 === river1 || joueur[i].carte1 === river2 || joueur[i].carte1 === river3) {
                    valeur_main[i] = 4,5;
                 } else if (joueur[i].carte2 === river1 || joueur[i].carte2 === river2 || joueur[i].carte2 === river3) {
                    valeur_main[i] = 4,5;
            }
		// FULL 2
		} else if (joueur[i].carte1 === joueur[i].carte2) {
            if (joueur[i].carte1 === river1 || joueur[i].carte1 === river2 || joueur[i].carte1 === river3) {
                 if (joueur[i].carte1 === river1 || joueur[i].carte1 === river2 || joueur[i].carte1 === river3) {
                    valeur_main[i] = 4,5;
                 } else if (joueur[i].carte2 === river1 || joueur[i].carte2 === river2 || joueur[i].carte2 === river3) {
                    valeur_main[i] = 4,5;
				}
            }
 		// COULEUR FAIRE PLUS BAS
		} else if (        ) {
			valeur_main[i] = 5
		// CARRE 1
		} else if (joueur[i].carte1 === joueur[i].carte2) {
			if (joueur[i].carte1 === river1) {
				if (joueur[i].carte1 === river2 || joueur[i].carte1 === river3)
					valeur_main[i] = 6;
				}
			} else if (joueur[i].carte1 === river2) {
            	if (joueur[i].carte1 === river1 || joueur[i].carte1 === river3)
                	valeur_main[i] = 6;	
				}	
		// CARRE 2
		} else if (joueur[i].carte1 !== joueur[i].carte2) {
			if (river1 === river2 && river2 === river3) {
				valeur_main[i] = 6;
			}
		// QUINTE FLUSH -> ORDONNER CARTES
		} else if (      ) {


		// QUINTE FLUSH ROYALE -> ORDONNER CARTES ET COULEURS
		} else if (             ) {
		}
	}
stop = true	
