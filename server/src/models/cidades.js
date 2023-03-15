const mongoose = require("mongoose");
const cidadeSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  nome: String,
  estadoId: { type: Number, required: true },
  created_at: Date,
  updated_at: Date,
});

module.exports = mongoose.model("cidades", cidadeSchema);
