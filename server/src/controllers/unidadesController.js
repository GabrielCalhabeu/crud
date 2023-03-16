const Unidade = require("../models/unidades");
const Cidade = require("../models/cidades");

module.exports = {
  async create(request, response) {
    const { id, nome, numero, complemento, cidadeId } = request.body;

    if (id === "" || id == null) {
      return response.status(400).json({ error: "Id vazio" });
    }

    if (await Cidade.findOne({ id: cidadeId })) {
      if (!(await Unidade.findOne({ id: id }))) {
        const unidade = await Unidade.create({
          id,
          nome,
          numero,
          complemento,
          cidadeId,
          created_at: new Date(),
          updated_at: new Date(),
        });
        return response.json(unidade);
      }
      return response.status(400).json({ error: "Id duplicado" });
    }
    return response.status(400).json({ error: "Cidade inexistente" });
  },

  async readAll(request, response) {
    const unidades = await Unidade.find();
    return response.json(unidades);
  },

  async readById(request, response) {
    const { id } = request.params;
    const unidade = await Unidade.findOne({ id: id });
    if (unidade) {
      return response.json(unidade);
    }
    return response.status(404).json({ error: "Unidade não encontrada" });
  },

  async update(request, response) {
    const { id } = request.params;
    const { nome, numero, complemento, cidadeId } = request.body;

    const cidade = await Cidade.findOne({ id: cidadeId });
    if (cidade) {
      const unidadeFound = await Unidade.findOneAndUpdate(
        { id },
        {
          nome,
          numero,
          complemento,
          cidadeId,
          updated_at: new Date(),
        },
        { new: true }
      );

      if (unidadeFound) {
        return response.json(unidadeFound);
      }
      return response.status(404).json({ error: "Unidade não encontrada" });
    }
    return response.status(400).json({ error: "Cidade inexistente" });
  },

  async delete(request, response) {
    const { id } = request.params;
    const unidade = await Unidade.findOneAndDelete({ id: id });
    if (unidade) {
      return response.json(unidade);
    }
    return response.status(404).json({ error: "Unidade não encontrada" });
  },
};
