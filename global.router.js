var express = require("express");
var mongo = require("mongoose");
const multer = require("multer");
const fs = require("fs");
var router = express.Router();
const twig = require("twig");


router.get("", (requete, reponse) => {
  reponse.render("accueil.html.twig");
});

router.get("/contact", (requete, reponse) => {
  reponse.render("contact.html.twig");
});

module.exports = router;