var express = require("express");
var mongo = require("mongoose");
const multer = require("multer");
const fs = require("fs");
var router = express.Router();
const twig = require("twig");
const auteurController = require("./controller/auteurController.controller.js");

router.get("/:id", auteurController.auteur_affichage);
router.get("/", auteurController.liste_auteur);
router.post("/ajoutAuteur", auteurController.ajouter_auteur);
router.post("/delete/:id", auteurController.auteur_supprimer);
router.post("/modification/", auteurController.auteur_validation_modification);
router.get("/modification/:id", auteurController.auteur_modification);

module.exports = router;
