// models/avaliacao.js
const mongoose = require('mongoose');

const avaliacaoSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // ID do usuário
  notaServico: { type: Number, required: true }, // Nota do serviço
  notaProfissional: { type: Number, required: true }, // Nota do profissional
  notaUnidade: { type: Number, required: true }, // Nota da unidade
}, { timestamps: true }); // Adiciona timestamps de criação e atualização

const Avaliacao = mongoose.model('Avaliacao', avaliacaoSchema);
module.exports = Avaliacao;