const mongo = require("mongoose");

const livreSchema = mongo.Schema({
  _id: mongo.Schema.Types.ObjectId,
  titre: String,
  auteur: {
    type: mongo.Schema.Types.ObjectId,
    ref: "auteurs",
    required: true
  },
  page: Number,
  description: String,
  image: String,
});

const livreModel = mongo.model("livres", livreSchema);

module.exports = livreModel;
