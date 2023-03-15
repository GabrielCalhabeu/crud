const express = require("express");
const routes = express.Router();
const estadoController = require("./controllers/estadoController");
const cidadeController = require("./controllers/cidadeController");
const tipoSanguinioController = require("./controllers/tipoSanguinioController");
const pessoaController = require("./controllers/pessoaController");
const locaisColetaController = require("./controllers/locaisColetaController");
const doacoesController = require("./controllers/doacoesController");
const unidadesController = require("./controllers/unidadesController");
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
routes.post("/pessoas/:id", pessoaController.update);
routes.get("/pessoas", pessoaController.readAll);
routes.get("/pessoas/:id", pessoaController.readById);
routes.delete("/pessoas/:id", pessoaController.delete);

//Rota Locais Coleta
routes.post("/locaisColeta", locaisColetaController.create);
routes.post("/locaisColeta/:id", locaisColetaController.update);
routes.get("/locaisColeta", locaisColetaController.readAll);
routes.get("/locaisColeta/:id", locaisColetaController.readById);
routes.delete("/locaisColeta/:id", locaisColetaController.delete);

//Rota Doacoes
routes.post("/doacoes", doacoesController.create);
routes.get("/doacoes", doacoesController.readAll);
routes.get("/doacoes/:id", doacoesController.readById);
routes.post("/doacoes/:id", doacoesController.update);
routes.delete("/doacoes/:id", doacoesController.delete);

routes.post("/unidades", unidadesController.create);
routes.get("/unidades", unidadesController.readAll);
routes.get("/unidades/:id", unidadesController.readById);
routes.post("/unidades/:id", unidadesController.update);
routes.delete("/unidades/:id", unidadesController.delete);
module.exports = routes;
