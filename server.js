var express = require("express");
var server = express();
var morgan = require("morgan");

var livres_router = require("./livres.router");
var auteurs_router = require("./auteurs.router");
var global_router = require("./global.router");

const mongo = require("mongoose");

const bodyParser = require("body-parser");

const session = require("express-session");

server.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

server.use(express.static("public"));

mongo.connect("mongodb://localhost/biblio", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

server.use(bodyParser.urlencoded({ extended: false }));

server.use(morgan("dev"));

server.set("trust proxy", 1);

server.use((requete, reponse, next) => {
  reponse.locals.message = requete.session.message;
  delete requete.session.message;
  next();
});
server.use("/livres", livres_router);
server.use("/auteurs", auteurs_router);
server.use("/", global_router);

server.listen(4000);
