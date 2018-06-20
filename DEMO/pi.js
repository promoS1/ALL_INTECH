//=========================================================================
// Site WEB  PI ALL IN'TECH
// Auteur : ALL IN'TECH
// Version : 27/05/2018
//=========================================================================
"use strict";

var http = require("http");
var url = require("url");
var mon_serveur;
var port;

//-------------------------------------------------------------------------
// DECLARATION DES DIFFERENTS MODULES CORRESPONDANT A CHAQUE ACTION
//-------------------------------------------------------------------------

var req_commencer = require("./req/req_commencer.js");
var req_afficher_formulaire_inscription = require("./req/req_afficher_formulaire_inscription.js");
var req_inscrire = require("./req/req_inscrire.js");
var req_identifier = require("./req/req_identifier.js");
var req_statique = require("./req/req_statique.js");
var req_retour_modele_accueil = require("./req/req_modele_accueil.js");
var req_actualiser_accueil_membre = require ("./req/req_actualiser_accueil_membre.js");
var req_attendre_tour = require ("./req/req_attendre_tour.js");
var req_creerTable = require ("./req/req_creerTable.js");
var req_creerTable = require ("./req/req_creerTable.js");
var req_miser = require ("./req/req_miser.js");	
var req_coucher = require ("./req/req_coucher.js"); 
var req_salon_multi = require ("./req/req_salon_multi.js");
var req_reponse_defi = require ("./req/req_reponse_defi.js");
var req_reponse_hote = require ("./req/req_reponse_hote.js");
var req_deconnexion = require ("./req/req_deconnexion.js");
var req_defier = require ("./req/req_defier.js");
var req_rejouer = require ("./req/req_rejouer.js");
var req_attendre_fin = require ("./req/req_attendre_fin.js");
var req_refuser_defi = require ("./req/req_refuser_defi.js");

var req_erreur = require("./req/req_erreur.js");

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
			case '/req_actualiser_accueil_membre':
				req_actualiser_accueil_membre(req, res, query);
				break;
			case '/req_retour_modele_accueil':
				req_retour_modele_accueil(req, res, query);
				break;
			case '/req_attendre_tour':
				req_attendre_tour(req, res, query);
				break;
			case '/req_miser':
				req_miser (req, res, query);
				break;
			case '/req_coucher':
				req_coucher (req, res, query);
				break;
			case '/req_salon_multi':
				req_salon_multi (req, res, query);
				break;			
			case '/req_reponse_defi':
				req_reponse_defi (req, res, query);
				break;
			case '/req_reponse_hote':
				req_reponse_hote (req, res, query);
				break;
			case '/req_deconnexion':
				req_deconnexion (req, res, query);
				break;
			case '/req_defier':
				req_defier (req, res, query);
				break;
			case '/req_rejouer':
				req_rejouer (req, res, query);
				break;
			case '/req_attendre_fin':
				req_attendre_fin (req, res, query);
				break;
			case '/req_refuser_defi':
				req_refuser_defi (req, res, query);
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
