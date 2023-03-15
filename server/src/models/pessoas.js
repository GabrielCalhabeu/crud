const mongoose = require("mongoose");
const pessoasSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  nome: String,
  rua: String,
  numero: String,
  complemento: String,
  documento: String,
  cidadeId: { type: Number, required: true },
  tipoId: { type: Number, required: true },
  created_at: Date,
  updated_at: Date,
});

module.exports = mongoose.model("pessoas", pessoasSchema);
