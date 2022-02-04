const mongo = require("mongoose");

const auteurSchema = mongo.Schema({
  _id: mongo.Schema.Types.ObjectId,
  nom: String,
  prenom: String,
  age: Number,
  sexe: Boolean,
});
auteurSchema.virtual("livres", {
  ref: "livres",
  localField: "_id",
  foreignField: "auteur",
});

const auteurModel = mongo.model("auteurs", auteurSchema);

module.exports = auteurModel;
