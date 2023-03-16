const mongoose = require("mongoose");
const produtosSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  etiqueta: String,
  doacaoId: Number,
  validade: Date,
  created_at: Date,
  updated_at: Date,
});
module.exports = mongoose.model("produtos", produtosSchema);
