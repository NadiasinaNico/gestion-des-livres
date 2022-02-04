var express = require("express");
var mongo = require("mongoose");
const multer = require("multer");
const fs = require("fs");
var router = express.Router();
const twig = require("twig");

const livreController = require("./controller/livresController.controller.js")


const storage = multer.diskStorage({
  destination: (requete, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (requete, file, cb) => {
    var date = new Date().toISOString();
    cb(
      null,
      date + "-" + Math.round(Math.random() * 10000) + "-" + file.originalname
    );
  },
});

const fileFilter = (requete, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("l'image n'est pas acceptée"), false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});


router.get("/", livreController.livreListe);

router.post("/", upload.single("file"),livreController.livresAjout );

router.get("/:id", livreController.livresDetails);

router.post("/delete/:id", livreController.livreSupprimer)

router.get("/modification/:id", livreController.livresModification);


router.post("/modificationLivre", livreController.livreModificatioValidation);


router.post("/updateImages",upload.single("file"), livreController.livreModificationImage);



module.exports = router;
