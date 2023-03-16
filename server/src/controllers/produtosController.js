const Produtos = require("../models/produtos");
const Doacoes = require("../models/doacoes");

module.exports = {
  async create(request, response) {
    const { id, etiqueta, doacaoId, validade } = request.body;

    if (id === "" || id == null) {
      return response.status(400).json({ error: "Id vazio" });
    }

    if (await Doacoes.findOne({ id: doacaoId })) {
      if (!(await Produtos.findOne({ id: id }))) {
        const produto = await Produtos.create({
          id,
          etiqueta,
          doacaoId,
          validade,
          created_at: new Date(),
          updated_at: new Date(),
        });
        return response.json(produto);
      }
      return response.status(400).json({ error: "Id duplicado" });
    }
    return response.status(400).json({ error: "Doação inexistente" });
  },

  async readAll(request, response) {
    const produtos = await Produtos.find();
    return response.json(produtos);
  },

  async readById(request, response) {
    const { id } = request.params;
    const produto = await Produtos.findOne({ id: id });
    if (produto) {
      return response.json(produto);
    }
    return response.status(404).json({ error: "Produto não encontrado" });
  },

  async update(request, response) {
    const { id } = request.params;
    const { etiqueta, doacaoId } = request.body;

    const doacaoExists = await Doacoes.findOne({ id: doacaoId });

    if (!doacaoExists) {
      return response.status(400).json({ error: "Doação inexistente" });
    }

    const produtoFound = await Produtos.findOneAndUpdate(
      { id: id },
      {
        etiqueta: etiqueta,
        doacaoId: doacaoId,
        updated_at: new Date(),
      },
      { new: true }
    );

    if (produtoFound) {
      return response.json(produtoFound);
    }

    return response.status(404).json({ error: "Produto não encontrado" });
  },

  async delete(request, response) {
    const { id } = request.params;
    const produto = await Produtos.findOneAndDelete({ id: id });
    if (produto) {
      return response.json(produto);
    }
    return response.status(404).json({ error: "Produto não encontrado" });
  },
};
