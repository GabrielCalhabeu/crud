const LocaisColeta = require("../models/locaisColeta");
const Cidade = require("../models/cidades");
const Doacoes = require("../models/doacoes");

module.exports = {
  async create(request, response) {
    const { id, nome, rua, numero, complemento, cidadeId } = request.body;

    if (id === "" || id == null) {
      return response.status(401).json({ error: "Id vazio" });
    }

    const cidadeFound = await Cidade.findOne({ id: cidadeId });
    if (!cidadeFound) {
      return response.status(401).json({ error: "Cidade inexistente" });
    }

    const localFound = await LocaisColeta.findOne({ id: id });
    if (!localFound) {
      const localCreated = await LocaisColeta.create({
        id,
        nome,
        rua,
        numero,
        complemento,
        cidadeId,
        created_at: new Date(),
        updated_at: new Date(),
      });
      return response.json(localCreated);
    }
    return response.status(401).json({ error: "ID duplicado" });
  },

  async readAll(request, response) {
    const locaisColetaList = await LocaisColeta.find();
    return response.json(locaisColetaList);
  },

  async update(request, response) {
    const { id } = request.params;
    const { nome, rua, numero, complemento, cidadeId } = request.body;

    const cidadeFound = await Cidade.findOne({ id: cidadeId });
    if (!cidadeFound) {
      return response.status(401).json({ error: "Cidade inexistente" });
    }

    const localFound = await LocaisColeta.findOneAndUpdate(
      { id: id },
      {
        nome: nome,
        rua: rua,
        numero: numero,
        complemento: complemento,
        cidadeId: cidadeId,
        updated_at: new Date(),
      },
      { new: true }
    );
    if (localFound) {
      return response.json(localFound);
    }
    return response.status(404).json({ error: "Local não encontrado" });
  },

  async readById(request, response) {
    const { id } = request.params;
    const localFound = await LocaisColeta.findOne({ id: id });
    if (localFound) {
      return response.json(localFound);
    }
    return response.status(404).json({ error: "Local não encontrado" });
  },

  async delete(request, response) {
    const { id } = request.params;

    if (await Doacoes.findOne({ localId: id })) {
      return response.status(404).json({
        error: "Local não pode ser deletado pois possui dependencias",
      });
    }
    const localDeleted = await LocaisColeta.findOneAndDelete({ id: id });

    if (localDeleted) {
      return response.json(localDeleted);
    }
    return response.status(404).json({ error: "Local não encontrado" });
  },
};
