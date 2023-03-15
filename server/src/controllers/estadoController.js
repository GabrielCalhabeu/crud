const Estados = require("../models/estados");
module.exports = {
  async create(request, response) {
    const { id, nome, sigla } = request.body;
    if (id === "" || id == null) {
      return response.status(401).json({ error: "Id Vazio" });
    }
    const estadoFound = await Estados.findOne({ id: id });
    if (!estadoFound) {
      const estadoCreated = await Estados.create({
        id,
        nome,
        sigla,
        created_at: new Date(),
        updated_at: new Date(),
      });
      return response.json(estadoCreated);
    }
    return response.status(401).json({ error: "Duplicated Id" });
  },

  async readAll(request, response) {
    const estadoList = await Estados.find();
    return response.json(estadoList);
  },

  async update(request, response) {
    const { id } = request.params;
    const { nome, sigla } = request.body;
    const estadoFound = await Estados.findOneAndUpdate(
      { id: id },
      { nome: nome, sigla: sigla, updated_at: new Date() },
      { new: true }
    );
    if (estadoFound) {
      return response.json(estadoFound);
    }
    return response.status(404).json({ error: "Estado nao encontrado" });
  },

  async readById(request, response) {
    const { id } = request.params;
    const estadoFound = await Estados.findOne({ id: id });
    if (estadoFound) {
      return response.json(estadoFound);
    }
    return response.status(404).json({ error: "Estado nao encontrado" });
  },
  async delete(request, response) {
    const { id } = request.params;
    const estadoDeleted = await Estados.findOneAndDelete({ id: id });
    if (estadoDeleted) {
      return response.json(estadoDeleted);
    }
    return response.status(404).json({ error: "Estado nao encontrado" });
  },
};
