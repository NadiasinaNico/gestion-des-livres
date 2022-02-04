const livreModel = require("../models/livres.model.js");
const auteurModel = require("../models/auteurs.model.js");

var mongo = require("mongoose");

exports.livreListe = (requete, reponse) => {
  auteurModel
    .find()
    .exec()
    .then((auteurs) => {
      livreModel
        .find()
        .populate("auteur")
        .exec()
        .then((livres) => {
          reponse.render("livres/listes.html.twig", {
            livres,
            auteurs,
            isModif: false,
            message: reponse.locals.message,
          });
        })
        .catch();
    });
};
exports.livresAjout = (requete, reponse) => {
  const livre = new livreModel({
    _id: new mongo.Types.ObjectId(),
    titre: requete.body.titre,
    auteur: requete.body.auteur,
    page: requete.body.page,
    description: requete.body.description,
    image: requete.file.path.substring(14),
  });

  livre
    .save()
    .then((livres) => {
      reponse.redirect("/livres");
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.livresModification = (requete, reponse) => {
  auteurModel
    .find()
    .exec()
    .then((auteurs) => {
      livreModel
        .findById(requete.params.id)
        .populate("auteur")
        .exec()
        .then((livre) => {
          reponse.render("livres/livreDetail.html.twig", {
            livre: livre,
            auteurs: auteurs,
            isModif: true,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });
};
exports.livreModificatioValidation = (requete, reponse) => {
  const livreModification = {
    titre: requete.body.titre,
    auteur: requete.body.auteur,
    page: requete.body.page,
    description: requete.body.description,
  };
  livreModel
    .update({ _id: requete.body.identifiant }, livreModification)
    .exec()
    .then((resultat) => {
      requete.session.message = {
        type: "success",
        contenu: "Modifier avec success",
      };
      reponse.redirect("/livres");
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.livresDetails = (requete, reponse) => {
  livreModel
    .findById(requete.params.id)
    .populate("auteur")
    .exec()
    .then((livre) => {
      reponse.render("livres/livreDetail.html.twig", {
        livre: livre,
        isModif: false,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.livreSupprimer = (requete, reponse) => {
  var livreImage = livreModel
    .findById(requete.params.id)
    .select("image")
    .exec()
    .then((livre) => {
      fs.unlink("./public/images/" + livre.image, (error) => {
        console.log(error);
      });
    });
  livreModel
    .remove({ _id: requete.params.id })
    .exec()
    .then((livre) => {
      requete.session.message = {
        type: "success",
        contenu: "Suppression effectuée",
      };
      reponse.redirect("/livres");
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.livreModificationImage = (requete, reponse) => {
  var livreImageUpdate = livreModel
    .findById(requete.body.identifiant)
    .select("image")
    .exec()
    .then((livre) => {
      fs.unlink("./public/images/" + livre.image, (error) => {
        console.log(error);
      });
    });
  const livreImageModif = {
    image: requete.file.path.substring(14),
  };
  livreModel
    .update({ _id: requete.body.identifiant }, livreImageModif)
    .exec()
    .then((resultat) => {
      reponse.redirect("/livres/modification/" + requete.body.identifiant);
    })
    .catch((error) => {
      console.log(error);
    });
};
