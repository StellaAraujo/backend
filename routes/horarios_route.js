const express = require('express');
const router = express.Router();
const HorarioDisponivel = require('../models/horariosDisponiveis'); // Mantenha o nome do modelo como está
const Agendamento = require('../models/agendamento'); // Se necessário, mantenha ou altere

// Criar horários disponíveis para um profissional
router.post('/', async (req, res) => {
  console.log('Início do POST /disponibilidade'); // Log 1
  try {
    console.log('Corpo da requisição:', req.body); // Log 2
    const { profissionalId, data, horarios } = req.body;

    const novoHorario = new HorarioDisponivel({
      profissionalId,
      data,
      horarios
    });

    await novoHorario.save();
    console.log('Horários criados com sucesso:', novoHorario); // Log 3
    res.status(201).json({ message: 'Horários criados com sucesso!', horario: novoHorario });
  } catch (error) {
    console.error('Erro ao criar horários disponíveis:', error); // Log 4
    res.status(500).json({ error: 'Erro ao criar horários disponíveis' });
  }
});

// Obter horários disponíveis para um profissional em uma data específica
router.get('/:profissionalId/:data', async (req, res) => {
  try {
    const { profissionalId, data } = req.params;

    const horariosDisponiveis = await HorarioDisponivel.findOne({
      profissionalId,
      data: new Date(data)
    });

    if (!horariosDisponiveis) {
      return res.status(404).json({ message: 'Horários não encontrados para essa data' });
    }

    res.status(200).json(horariosDisponiveis);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar horários disponíveis' });
  }
});

// Reservar um horário
router.put('/disponibilidade/reservar/:id', async (req, res) => {
  try {
    console.log('Início da requisição PUT /disponibilidade/reservar');
    const { id } = req.params;
    const { hora } = req.body;

    console.log('Buscando horário por ID...');
    const horario = await HorarioDisponivel.findById(id);

    if (!horario) {
      console.log('Horário não encontrado');
      return res.status(404).json({ message: 'Horário não encontrado' });
    }

    console.log('Verificando disponibilidade do horário...');
    const horarioIndex = horario.horarios.findIndex(h => h.hora === hora);
    if (horarioIndex === -1 || horario.horarios[horarioIndex].reservado) {
      console.log('Horário já reservado ou não encontrado');
      return res.status(400).json({ message: 'Horário já reservado ou não encontrado' });
    }

    console.log('Atualizando status de reservado...');
    horario.horarios[horarioIndex].reservado = true;
    await horario.save();

    console.log('Horário reservado com sucesso');
    res.status(200).json({ message: 'Horário reservado com sucesso!', horario });
  } catch (error) {
    console.error('Erro na reserva:', error);
    res.status(500).json({ error: 'Erro ao reservar horário' });
  }
});

module.exports = router;
