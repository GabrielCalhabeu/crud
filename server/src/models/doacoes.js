const mongoose = require("mongoose");

const doacoesSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  pessoaId: { type: Number, required: true },
  localId: { type: Number, required: true },
  data: Date,
  created_at: Date,
  updated_at: Date,
});

module.exports = mongoose.model("doacoes", doacoesSchema);
