const mongoose = require("mongoose");
const distribuicaoSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  produtoId: Number,
  unidadeId: Number,
  data: Date,
  created_at: Date,
  updated_at: Date,
});
module.exports = mongoose.model("distribuicao", distribuicaoSchema);
