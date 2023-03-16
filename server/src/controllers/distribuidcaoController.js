const Distribuicao = require("../models/distribuicoes");
const Produto = require("../models/produtos");
const Unidade = require("../models/unidades");

module.exports = {
  async create(request, response) {
    const { id, produtoId, unidadeId, data } = request.body;

    if (id === "" || id == null) {
      return response.status(400).json({ error: "Id vazio" });
    }

    if (
      (await Produto.findOne({ id: produtoId })) &&
      (await Unidade.findOne({ id: unidadeId }))
    ) {
      if (!(await Distribuicao.findOne({ id: id }))) {
        const distribuicao = await Distribuicao.create({
          id,
          produtoId,
          unidadeId,
          data,
          created_at: new Date(),
          updated_at: new Date(),
        });
        return response.json(distribuicao);
      }
      return response.status(400).json({ error: "Id duplicado" });
    }
    return response
      .status(400)
      .json({ error: "Produto ou unidade inexistente" });
  },

  async readAll(request, response) {
    const distribuicoes = await Distribuicao.find();
    return response.json(distribuicoes);
  },

  async readById(request, response) {
    const { id } = request.params;
    const distribuicao = await Distribuicao.findOne({ id: id });
    if (distribuicao) {
      return response.json(distribuicao);
    }
    return response.status(404).json({ error: "Distribuição não encontrada" });
  },

  async update(request, response) {
    const { id } = request.params;
    const { produtoId, unidadeId, data } = request.body;

    if (
      !(await Produto.findOne({ id: produtoId })) ||
      !(await Unidade.findOne({ id: unidadeId }))
    ) {
      return response
        .status(400)
        .json({ error: "Produto ou unidade inexistente" });
    }

    const distribuicaoFound = await Distribuicao.findOneAndUpdate(
      { id: id },
      {
        produtoId: produtoId,
        unidadeId: unidadeId,
        data: data,
        updated_at: new Date(),
      },
      { new: true }
    );

    if (distribuicaoFound) {
      return response.json(distribuicaoFound);
    }

    return response.status(404).json({ error: "Distribuição não encontrada" });
  },

  async delete(request, response) {
    const { id } = request.params;
    const distribuicao = await Distribuicao.findOneAndDelete({ id: id });
    if (distribuicao) {
      return response.json(distribuicao);
    }
    return response.status(404).json({ error: "Distribuição não encontrada" });
  },
};
