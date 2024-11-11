const mongoose = require('mongoose');

const horarioDisponivelSchema = new mongoose.Schema({
  profissionalId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Profissional', },
  data: { type: Date, required: true },
  horarios: [
    {
      hora: { type: String, required: true },
      reservado: { type: Boolean, default: false }
    }
  ]
});

module.exports = mongoose.model('HorarioDisponivel', horarioDisponivelSchema);
