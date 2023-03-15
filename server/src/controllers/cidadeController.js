const Cidades = require("../models/cidades");
const Estados = require("../models/estados");

module.exports = {
  async create(request, response) {
    const { id, nome, estadoId } = request.body;
    if (id == null || id === "" || estadoId == null || estadoId === "") {
      return response.status(401).json({ error: "Id Vazio" });
    }
    const estadoFound = await Estados.findOne({ id: estadoId });
    if (estadoFound) {
      const cidadeFound = await Cidades.findOne({ id: id });
      if (!cidadeFound) {
        const cidadeCreated = await Cidades.create({
          id,
          nome,
          estadoId,
          created_at: new Date(),
          updated_at: new Date(),
        });

        let cidadeList = estadoFound.cidades;
        await cidadeList.push(id);
        await Estados.findOneAndUpdate(
          { id: estadoId },
          { cidades: cidadeList }
        );
        return response.json(cidadeCreated);
      } else {
        return response.status(401).json({ error: "Id duplicado" });
      }
    }
    return response.status(404).json({ error: "Id de estado nao existe" });
  },

  async update(request, response) {
    const { id } = request.params;
    const { nome, estadoId } = request.body;

    const estadoExists = await Estado.exists({ id: estadoId });

    if (!estadoExists) {
      return response.status(404).json({ error: "Estado não encontrado" });
    }
    const cidadeFound = await Cidades.findOneAndUpdate(
      { id: id },
      {
        nome: nome,
        estadoId: estadoId,
        updated_at: new Date(),
      },
      { new: true }
    );
    if (cidadeFound) {
      return response.json(cidadeFound);
    }
    return response.status(404).json({ error: "Id de cidade nao existe" });
  },

  async readAll(request, response) {
    const cidadeList = await Cidades.find();
    return response.json(cidadeList);
  },

  async readById(request, response) {
    const { id } = request.params;
    const cidadeFound = await Cidades.findOne({ id: id });
    if (cidadeFound) {
      return response.json(cidadeFound);
    }
    return response.status(404).json({ error: "Cidade nao encontrada" });
  },

  async delete(request, response) {
    const { id } = request.params;
    const cidadeDeleted = await Cidades.findOneAndDelete({ id: id });

    if (cidadeDeleted) {
      const estado = await Estados.findOne({ id: cidadeDeleted.estadoId });
      let index = estado.cidades.indexOf(cidadeDeleted.id);
      let list = estado.cidades;
      list.splice(index, 1);
      if (estado.cidades.length < 1) {
        list = [];
      }
      await Estados.findOneAndUpdate(
        { id: cidadeDeleted.estadoId },
        { cidades: list }
      );
      return response.json(cidadeDeleted);
    }
    return response.status(404).json({ error: "Cidade nao encontrada" });
  },
};
