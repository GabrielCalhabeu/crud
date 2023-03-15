const mongoose = require("mongoose");

const estadosSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  nome: String,
  sigla: String,
  cidades: Array,
  created_at: Date,
  updated_at: Date,
});

module.exports = mongoose.model("estados", estadosSchema);
