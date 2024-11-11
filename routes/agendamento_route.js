// agendamento_route.js

const express = require('express');
const router = express.Router();
const Agendamento = require('../models/agendamento');

// Lista de horários fixos disponíveis para agendamento
const horariosFixos = [
  "09:00", "10:00", "11:00",
  "13:00", "14:00", "15:00", "16:00",
  "17:00"
];

// Rota POST para criar um novo agendamento
router.post('/', async (req, res) => {
  const { profissionalId, userId, franquiaId, category, subcategory, name, data, hora, price } = req.body;

  try {
    // Verificar se o horário solicitado está dentro dos horários fixos
    if (!horariosFixos.includes(hora)) {
      return res.status(400).json({ message: 'Horário inválido' });
    }

    // Verificar se já existe um agendamento ativo no mesmo horário com o mesmo profissional
    const horarioReservado = await Agendamento.findOne({ profissionalId, data, hora, status: 'ativo' });
    if (horarioReservado) {
      return res.status(400).json({ message: 'Horário indisponível' });
    }

    // Criar o novo agendamento com status "ativo"
    const novoAgendamento = new Agendamento({
      profissionalId,
      userId,
      franquiaId,
      category,
      subcategory,
      name,
      data,
      hora,
      price,
      status: 'ativo'
    });

    await novoAgendamento.save();
    res.status(201).json(novoAgendamento);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar agendamento', error });
  }
});

// Rota GET para obter horários disponíveis para um profissional em uma data específica
router.get('/disponiveis/:profissionalId', async (req, res) => {
  const { profissionalId } = req.params;
  const { data } = req.query;

  try {
    // Busca agendamentos ativos do profissional na data especificada
    const agendamentos = await Agendamento.find({ profissionalId, data, status: 'ativo' });
    const horariosReservados = agendamentos.map((agendamento) => agendamento.hora);

    // Filtra os horários fixos para retornar apenas os horários ainda disponíveis
    const horariosDisponiveis = horariosFixos.filter((horario) => !horariosReservados.includes(horario));

    res.json(horariosDisponiveis);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar horários disponíveis.', error });
  }
});

// Nova rota GET para obter agendamentos de um usuário específico
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Buscar todos os agendamentos do usuário
    const agendamentos = await Agendamento.find({ userId }).select('name status data hora category subcategory price')

    
    if (agendamentos.length === 0) {
      return res.status(404).json({ message: 'Nenhum agendamento encontrado para este usuário.' });
    }

    res.json(agendamentos);
  } catch (error) {
    console.error("Erro ao buscar agendamentos do usuário:", error); // Adicionado para detalhar o erro
    res.status(500).json({ message: 'Erro ao buscar agendamentos do usuário.', error: error.message });
  }
});


module.exports = router;
