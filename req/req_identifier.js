"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

    var marqueurs;
    var compte;
    var mdp;
    var page;
    var membre;
    var contenu_fichier;
    var listeMembres;
	var listeConnecte;
	var nouveauConnecte;
    var i;
	var liste;
	var connecte;
    var trouve;

    // ON LIT LES COMPTES EXISTANTS

    contenu_fichier = fs.readFileSync("./json/membres.json", 'utf-8');    
    listeMembres = JSON.parse(contenu_fichier);

    // ON VERIFIE QUE LE PSEUDO/PASSWORD EXISTE

    trouve = false;
    i = 0;
    while (i<listeMembres.length && trouve === false) {
        if (listeMembres[i].compte === query.compte) {
            if (listeMembres[i].mdp === query.mdp) {
                trouve = true;
            }
        }
        i++;
    }

    // ON RENVOIT UNE PAGE HTML 

    if(trouve === false) {

        // SI IDENTIFICATION INCORRECTE, ON REAFFICHE PAGE ACCUEIL AVEC ERREUR

        page = fs.readFileSync('./html/modele_accueil.html', 'utf-8');

        marqueurs = {};
        marqueurs.erreur = "ERREUR : compte ou mot de passe incorrect";
        marqueurs.compte = query.compte;
        page = page.supplant(marqueurs);

    } else {

        // SI IDENTIFICATION OK, ON ENVOIE PAGE ACCUEIL MEMBRE

        page = fs.readFileSync('./html/modele_accueil_membre.html', 'UTF-8');

        marqueurs = {};
        marqueurs.compte = query.compte;
        page = page.supplant(marqueurs);
    }

	
	// ON LIT LES COMPTES CONNECTES

    contenu_fichier = fs.readFileSync("./json/connecte.json", 'utf-8');
    listeConnecte = JSON.parse(contenu_fichier);

    // ON VERIFIE QUE LE COMPTE N'EST PAS DEJA CONNECTE

    trouve = false;
    i = 0;
    while (i<listeConnecte.length && trouve === false) {
        if (listeConnecte[i].compte === query.compte) {
            trouve = true;
        }
        i++;
    }

    // SI PAS TROUVE, ON AJOUTE LE NOUVEAU COMPTE DANS LA LISTE DES COMPTES CONNECTES

    if (trouve === false) {
        nouveauConnecte = {};
        nouveauConnecte.compte = query.compte;
		nouveauConnecte.connecte = true;
        listeConnecte[listeConnecte.length] = nouveauConnecte;

        contenu_fichier = JSON.stringify(listeConnecte);

        fs.writeFileSync("./json/connecte.json", contenu_fichier, 'utf-8');
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();

};

//---------------------------------------------------------------------------

module.exports = trait;
