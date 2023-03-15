const mongoose = require("mongoose");
const unidadeSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  nome: String,
  numero: String,
  complemento: String,
  cidadeId: { type: Number, required: true },
  created_at: Date,
  updated_at: Date,
});

module.exports = mongoose.model("unidades", unidadeSchema);
