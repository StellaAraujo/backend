// models/agendamento.js

const mongoose = require('mongoose');

// Definir o esquema do agendamento
const AgendamentoSchema = new mongoose.Schema({
  profissionalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profissional', required: true },
  userId: { type: String, required: true }, // ID do usuário que fez o agendamento
  franquiaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Franquia', required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  name: { type: String, required: true },
  data: { type: Date, required: true },
  hora: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, enum: ['ativo', 'cancelado'], default: 'ativo' } // Controle do status do agendamento
});

// Índice composto para garantir que um horário específico de um profissional em uma data não seja duplicado
AgendamentoSchema.index({ profissionalId: 1, data: 1, hora: 1 }, { unique: true });

const Agendamento = mongoose.model('Agendamento', AgendamentoSchema);

module.exports = Agendamento;
