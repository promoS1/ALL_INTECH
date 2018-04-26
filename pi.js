//=========================================================================
// Site WEB demo PI
// Auteur : P. Thiré
// Version : 09/10/2015
//=========================================================================

"use strict";

var http = require("http");
var url = require("url");
var mon_serveur;
var port;

//-------------------------------------------------------------------------
// DECLARATION DES DIFFERENTS MODULES CORRESPONDANT A CHAQUE ACTION
//-------------------------------------------------------------------------

var req_commencer = require("./req_commencer.js");
var req_afficher_formulaire_inscription = require("./req_afficher_formulaire_inscription.js");
var req_inscrire = require("./req_inscrire.js");
var req_identifier = require("./req_identifier.js");
var req_quitter_mode_visiteur = require ("./req_quitter_mode_visiteur.js");
var req_modele_page_visiteur = require ("./req_modele_page_visiteur.js");
var req_statique = require("./req_statique.js");
var req_quitter_table_rejointe = require ("./req_quitter_table_rejointe.js");
var req_modele_page_table = require ("./req_modele_page_table.js");
var req_modele_page_joueur = require ("./req_modele_page_joueur.js");
var req_retour_modele_accueil = require("./req_modele_accueil.js");
var req_quitter_table = require ("./req_quitter_table.js");
var req_modele_table_rejointe = require ("./req_modele_table_rejointe.js");
var req_nouvelle_partie = require ("./req_nouvelle_partie.js");
var req_modele_page_resultat = require ("./req_modele_page_resultat.js");
var req_retour_salon = require ("./req_retour_salon.js");

var req_erreur = require("./req_erreur.js");



//-------------------------------------------------------------------------
// FONCTION DE CALLBACK APPELLEE POUR CHAQUE REQUETE
//-------------------------------------------------------------------------

var traite_requete = function (req, res) {

    var ressource;
    var requete;
    var pathname;
    var query;

    console.log("URL reçue : " + req.url);
    requete = url.parse(req.url, true);
    pathname = requete.pathname;
    query = requete.query;

    // ROUTEUR

    try {
        switch (pathname) {
            case '/':
            case '/req_commencer':
                req_commencer(req, res, query);
                break;
            case '/req_afficher_formulaire_inscription':
                req_afficher_formulaire_inscription(req, res, query);
                break;
            case '/req_inscrire':
                req_inscrire(req, res, query);
                break;
            case '/req_identifier':
                req_identifier(req, res, query);
                break;
			case '/req_creerTable':
				req_creerTable(req, res, query);
				break;
			case '/req_quitter_mode_visiteur':
				req_quitter_mode_visiteur(req, res, query);
				break;
			case '/req_quitter_table_rejointe':
				req_quitter_table_rejointe(req, res, query);
				break;
			case '/req_modele_page_table':
				req_modele_page_table(req, res, query);
				break;
			case '/req_modele_page_joueur':
				req_modele_page_joueur(req, res, query);
				break;
			case '/req_modele_page_visiteur':
                req_modele_page_visiteur(req, res, query);
                break;
			case '/req_modele_page_joueur':
                req_modele_page_joueur(req, res, query);
                break;
			case '/req_quitter_table':
                req_quitter_table(req, res, query);
                break;
			case '/req_nouvelle_partie':
                req_nouvelle_partie(req, res, query);
                break;
			case '/req_retour_salon':
                req_retour_salon(req, res, query);
                break;
			case '/req_modele_table_rejointe':
                req_modele_table_rejointe(req, res, query);
                break;
			case '/req_retour_modele_accueil':
                req_retour_modele_accueil(req, res, query);
                break;
			case '/req_modele_page_resultat':
                req_modele_page_resultat(req, res, query);
                break;
            default:
                req_statique(req, res, pathname);
                break;
        }
    } catch (e) {
        console.log('Erreur : ' + e.stack);
        console.log('Erreur : ' + e.message);
        //console.trace();
        req_erreur(req, res, query);
    }
};

//-------------------------------------------------------------------------
// CREATION ET LANCEMENT DU SERVEUR
//-------------------------------------------------------------------------

mon_serveur = http.createServer(traite_requete);
port = 5000;
console.log("Serveur en ecoute sur port " + port);
mon_serveur.listen(port);
