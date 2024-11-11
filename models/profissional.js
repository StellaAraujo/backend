// models/profissionais.js

const mongoose = require('mongoose');

// Definir o esquema do profissional
const ProfissionalSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  especialidade: { type: String, required: true },
  franquiaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Franquia', required: true },
  horario: { type: String, required: true },
  imagemUrl: { type: String, required: true },
});

// Criar o modelo
const Profissional = mongoose.model('Profissional', ProfissionalSchema);

module.exports = Profissional;
