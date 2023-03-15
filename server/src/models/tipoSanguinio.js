const mongoose = require("mongoose");
const tipoSanguinioSchema = mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  tipo: String,
  fator: String,
  created_at: Date,
  updated_at: Date,
});

module.exports = mongoose.model("tipoSanguinio", tipoSanguinioSchema);
