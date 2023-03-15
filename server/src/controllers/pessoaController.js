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
};
