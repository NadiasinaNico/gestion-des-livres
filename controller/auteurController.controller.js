const auteurModel = require("../models/auteurs.model.js");
var mongo = require("mongoose");

exports.auteur_affichage = (requete, reponse) => {
  auteurModel
    .findById(requete.params.id)
    .populate("livres")
    .exec()
    .then((auteur) => {
      reponse.render("auteurs/auteur.html.twig", { auteur: auteur });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.liste_auteur = (requete, reponse) => {
  auteurModel
    .find()
    .populate("livres")
    .exec()
    .then((auteurs) => {
      reponse.render("auteurs/listes.html.twig", { auteurs });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.ajouter_auteur = (requete, reponse) => {
  const auteur = new auteurModel({
    _id: new mongo.Types.ObjectId(),
    nom: requete.body.nom,
    prenom: requete.body.prenom,
    age: requete.body.age,
    sexe:(requete.body.sexe) ? true : false,
  });
 
  auteur
    .save()
    .then((auteur) => {
      reponse.redirect("/auteurs");
      console.log(auteur);
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.auteur_supprimer = (requete, reponse) => {

  auteurModel.remove({ _id: requete.params.id})
  .exec()
  .then(resultat => {
    reponse.redirect("/auteurs")
  })
  .catch(error => {
    console.log(error);
  })
}

exports.auteur_modification = (requete, reponse) => {
  auteurModel.findById(requete.params.id)
  .populate("livres")
  .exec()
  .then(auteur => {
    reponse.render("auteurs/auteur_modification.html.twig", {auteur})
  })
  .catch(error => {
    console.log(error);
  })

}

exports.auteur_validation_modification = (requete, reponse) => {
  const auteur = {
    nom: requete.body.nom,
    prenom: requete.body.prenom,
    age:requete.body.age,
    sexe: (requete.body.sexe)? true: false,
  }
  auteurModel.update({_id:requete.body.identifiant }, auteur)
  .exec()
  .then(auteur => {
    reponse.redirect("/auteurs")
  })
  .catch(error => {
    console.log(error);
  } )
}