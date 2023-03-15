const Doacoes = require("../models/doacoes");
const Pessoa = require("../models/pessoas");
const Local = require("../models/locaisColeta");

module.exports = {
  async create(request, response) {
    const { id, pessoaId, localId, data } = request.body;

    if (id === "" || id == null) {
      return response.status(400).json({ error: "Id vazio" });
    }

    if (
      (await Pessoa.findOne({ id: pessoaId })) &&
      (await Local.findOne({ id: localId }))
    ) {
      if (!(await Doacoes.findOne({ id: id }))) {
        const doacao = await Doacoes.create({
          id,
          pessoaId,
          localId,
          data,
          created_at: new Date(),
          updated_at: new Date(),
        });
        return response.json(doacao);
      }
      return response.status(400).json({ error: "Id duplicado" });
    }
    return response.status(400).json({ error: "Pessoa ou local inexistente" });
  },

  async readAll(request, response) {
    const doacoes = await Doacoes.find();
    return response.json(doacoes);
  },

  async readById(request, response) {
    const { id } = request.params;
    const doacao = await Doacoes.findOne({ id: id });
    if (doacao) {
      return response.json(doacao);
    }
    return response.status(404).json({ error: "Doação não encontrada" });
  },

  async update(request, response) {
    const { id } = request.params;
    const { pessoaId, localId, data } = request.body;

    const doacaoFound = await Doacoes.findOneAndUpdate(
      { id: id },
      {
        pessoaId: pessoaId,
        localId: localId,
        data: data,
        updated_at: new Date(),
      },
      { new: true }
    );

    if (doacaoFound) {
      return response.json(doacaoFound);
    }

    return response.status(404).json({ error: "Doação não encontrada" });
  },

  async delete(request, response) {
    const { id } = request.params;
    const doacao = await Doacoes.findOneAndDelete({ id: id });
    if (doacao) {
      return response.json(doacao);
    }
    return response.status(404).json({ error: "Doação não encontrada" });
  },
};
