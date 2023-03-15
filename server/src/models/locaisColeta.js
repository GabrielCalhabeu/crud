const mongoose = require("mongoose");

const locaisColeta = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  nome: String,
  rua: String,
  numero: String,
  complemento: String,
  cidadeId: { type: Number, required: true },
  created_at: Date,
  updated_at: Date,
});

module.exports = mongoose.model("locaisColeta", locaisColeta);
