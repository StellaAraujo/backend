const express = require('express');
const router = express.Router();
const Profissional = require('../models/profissional');

// Rota POST para criar um novo profissional e associá-lo a uma franquia
router.post('/:franquiaId', async (req, res) => {
  const { nome, especialidade, horario, imagemUrl } = req.body;
  const { franquiaId } = req.params;

  try {
    // Cria um novo profissional e associa ao ID da franquia fornecida na rota
    const novoProfissional = new Profissional({
      nome,
      especialidade,
      franquiaId, // Adiciona o ID da franquia diretamente
      horario,
      imagemUrl
    });
    await novoProfissional.save(); // Salva no banco de dados
    res.status(201).json(novoProfissional); // Retorna o novo profissional criado
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar profissional', error });
  }
});

// Rota GET para buscar todos os profissionais de uma franquia específica
router.get('/:franquiaId', async (req, res) => {
  try {
    const { franquiaId } = req.params;
    const profissionais = await Profissional.find({ franquiaId });
    res.json(profissionais);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar profissionais.' });
  }
});

// Rota PUT para atualizar um profissional específico
router.put('/:franquiaId/:profissionalId', async (req, res) => {
  const { profissionalId } = req.params;
  const { nome, especialidade, horario, imagemUrl } = req.body;
  
  try {
    const profissionalAtualizado = await Profissional.findByIdAndUpdate(
      profissionalId,
      { nome, especialidade, horario, imagemUrl },
      { new: true, runValidators: true } // Retorna o documento atualizado e valida os dados
    );

    if (!profissionalAtualizado) {
      return res.status(404).json({ message: 'Profissional não encontrado.' });
    }

    res.json(profissionalAtualizado);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar profissional', error });
  }
});

// Rota DELETE para remover um profissional específico
router.delete('/:franquiaId/:profissionalId', async (req, res) => {
  const { profissionalId } = req.params;

  try {
    const profissionalDeletado = await Profissional.findByIdAndDelete(profissionalId);

    if (!profissionalDeletado) {
      return res.status(404).json({ message: 'Profissional não encontrado.' });
    }

    res.status(204).send(); // Responde com status 204 No Content
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar profissional.', error });
  }
});


module.exports = router;
