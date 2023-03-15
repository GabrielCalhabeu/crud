const TipoSanguinio = require("../models/tipoSanguinio");

module.exports = {
  async create(request, response) {
    const { id, tipo, fator } = request.body;
    if (id === "" || id == null) {
      return response.status(401).json({ error: "Id Vazio" });
    }
    const tipoFound = await TipoSanguinio.findOne({ id: id });
    if (!tipoFound) {
      const tipoCreated = await TipoSanguinio.create({
        id,
        tipo,
        fator,
        created_at: new Date(),
        updated_at: new Date(),
      });
      return response.json(tipoCreated);
    } else {
      return response.status(401).json({ error: "Id duplicado" });
    }
  },
  async update(request, response) {
    const { id } = request.params;
    const { tipo, fator } = request.body;
    const tipoFound = await TipoSanguinio.findOneAndUpdate(
      { id: id },
      { tipo: tipo, fator: fator, updated_at: new Date() },
      { new: true }
    );
    if (tipoFound) {
      return response.json(tipoFound);
    }
    return response.status(404).json({ error: "Tipo nao encontrado" });
  },

  async readAll(request, response) {
    const tipoFound = await TipoSanguinio.find();
    return response.json(tipoFound);
  },

  async readById(request, response) {
    const { id } = request.params;
    const tipoFound = await TipoSanguinio.findOne({ id: id });
    if (tipoFound) {
      return response.json(tipoFound);
    }
    return response.status(404).json({ error: "Id nao existe" });
  },

  async delete(request, response) {
    const { id } = request.params;

    const tipoDelted = await TipoSanguinio.findOneAndDelete({ id: id });
    if (tipoDelted) {
      return response.json(tipoDelted);
    }
    return response.status(404).json({ error: "Id nao existe" });
  },
};
