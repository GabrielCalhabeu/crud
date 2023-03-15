const express = require("express");
const routes = express.Router();
const estadoController = require("./controllers/estadoController");
const cidadeController = require("./controllers/cidadeController");
const tipoSanguinioController = require("./controllers/tipoSanguinioController");
const pessoaController = require("./controllers/pessoaController");
//Rota Estados
routes.post("/estados", estadoController.create);
routes.post("/estados/:id", estadoController.update);
routes.get("/estados", estadoController.readAll);
routes.get("/estados/:id", estadoController.readById);
routes.delete("/estados/:id", estadoController.delete);

//Rota Cidades
routes.post("/cidades", cidadeController.create);
routes.post("/cidades/:id", cidadeController.update);
routes.get("/cidades", cidadeController.readAll);
routes.get("/cidades/:id", cidadeController.readById);
routes.delete("/cidades/:id", cidadeController.delete);

//Rotas TipoSanguinio
routes.post("/tipoSanguinio", tipoSanguinioController.create);
routes.post("/tipoSanguinio/:id", tipoSanguinioController.update);
routes.get("/tipoSanguinio", tipoSanguinioController.readAll);
routes.get("/tipoSanguinio/:id", tipoSanguinioController.readById);
routes.delete("/tipoSanguinio/:id", tipoSanguinioController.delete);

//Rota Pessoa
routes.post("/pessoas", pessoaController.create);

module.exports = routes;
