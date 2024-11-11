//routes/franquias_route.js

const express = require('express');
const router = express.Router();
const Franquia = require('../models/franquias');
const Profissional = require('../models/profissional');


// Rota POST para criar uma nova franquia
router.post('/', async (req, res) => {
  const { nome, endereco, horario, imagemUrl } = req.body;

  try {
    const novaFranquia = new Franquia({ nome, endereco, horario, imagemUrl });
    await novaFranquia.save(); // Salvar no banco de dados
    res.status(201).json(novaFranquia); // Retornar a nova franquia criada
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar franquia' });
  }
});


// Rota GET para buscar todas as franquias do banco de dados
router.get('/', async (req, res) => {
  try {
    const franquias = await Franquia.find(); // Buscar todas as franquias
    res.json(franquias); // Retornar as franquias como JSON
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar franquias' });
  }
});

// Rota PUT para atualizar uma franquia pelo ID
router.put('/:id', async (req, res) => {
  const { nome, endereco, horario, imagemUrl } = req.body;
  const { id } = req.params;

  try {
    const franquiaAtualizada = await Franquia.findByIdAndUpdate(
      id,
      { nome, endereco, horario, imagemUrl },
      { new: true } // Retorna o documento atualizado
    );

    if (!franquiaAtualizada) {
      return res.status(404).json({ message: 'Franquia não encontrada' });
    }

    res.json(franquiaAtualizada); // Retornar a franquia atualizada como JSON
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Erro ao atualizar franquia' });
  }
});

module.exports = router;