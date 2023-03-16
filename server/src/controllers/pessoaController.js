const Pessoa = require("../models/pessoas");
const Cidade = require("../models/cidades");
const Tipo = require("../models/tipoSanguinio");
module.exports = {
  async create(request, response) {
    const { id, nome, rua, numero, complemento, documento, cidadeId, tipoId } =
      request.body;

    if (id === "" || id == null) {
      return response.status(401).json({ error: "Id Vazio" });
    }
    //Verifica se existe a cidade, se existe o tipo, e se a pessoa ainda nao existe.
    if (
      (await Cidade.findOne({ id: cidadeId })) &&
      (await Tipo.findOne({ id: tipoId }))
    ) {
      const pessoa = await Pessoa.findOne({ id: id });
      if (!(await Pessoa.findOne({ id: id }))) {
        const pessoaCreated = await Pessoa.create({
          id,
          nome,
          rua,
          numero,
          complemento,
          documento,
          cidadeId,
          tipoId,
          created_at: new Date(),
          updated_at: new Date(),
        });
        return response.json(pessoaCreated);
      }
      return response.status(401).json({ error: "ID duplicado" });
    }
    return response.status(401).json({ error: "Tipo ou Cidade inexistente" });
  },

  async update(request, response) {
    const { id } = request.params;
    const { nome, rua, numero, complemento, documento, cidadeId, tipoId } =
      request.body;

    const cidadeExists = await Cidade.findOne({ id: cidadeId });
    if (!cidadeExists) {
      return response.status(404).json({ error: "Cidade não encontrada" });
    }

    const tipoExists = await Tipo.findOne({ id: tipoId });
    if (!tipoExists) {
      return response.status(404).json({ error: "Tipo não encontrada" });
    }
    const pessoaFound = await Pessoa.findOneAndUpdate(
      { id: id },
      {
        nome: nome,
        rua: rua,
        numero: numero,
        complemento: complemento,
        documento: documento,
        cidadeId: cidadeId,
        tipoId: tipoId,
        updated_at: new Date(),
      },
      { new: true }
    );
    if (pessoaFound) {
      return response.json(pessoaFound);
    }
    return response.status(404).json({ error: "Pessoa não encontrada" });
  },

  async readAll(request, response) {
    const pessoaList = await Pessoa.find();
    return response.json(pessoaList);
  },

  async readById(request, response) {
    const { id } = request.params;
    const pessoaFound = await Pessoa.findOne({ id: id });
    if (pessoaFound) {
      return response.json(pessoaFound);
    }
    return response.status(404).json({ error: "Pessoa não encontrada" });
  },

  async delete(request, response) {
    const { id } = request.params;
    const pessoaDeleted = await Pessoa.findOneAndDelete({ id: id });
    if (pessoaDeleted) {
      return response.json(pessoaDeleted);
    }
    return response.status(404).json({ error: "Pessoa não encontrada" });
  },
};
