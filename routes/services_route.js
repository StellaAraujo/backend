// routes/services_route.js
const express = require('express');
const router = express.Router();
const Service = require('../models/service'); // Importar o Model corretamente

// Rota para buscar subcategorias de uma categoria específica
router.get('/:category', async (req, res) => { // Remover '/services' da rota
  const category = req.params.category;

  try {
    // Buscar os serviços com base na categoria
    const services = await Service.find({ category });

    // Retornar os serviços no formato JSON
    res.json({ subcategories: services });
  } catch (error) {
    // Se houver erro, retornar um status de erro
    res.status(500).json({ message: 'Erro ao buscar subcategorias' });
  }
});

// Rota para criar um novo serviço
router.post('/', async (req, res) => { // Remover '/services' da rota
  const { name, category, subcategory, price, description, image } = req.body;

  // Cria uma nova instância de serviço
  const newService = new Service({
    name,
    category,
    subcategory,
    price,
    description,
    image,
  });

  try {
    // Salva o serviço no MongoDB
    await newService.save();
    res.status(201).json({ message: 'Serviço criado com sucesso!' });
  } catch (error) {
    // Em caso de erro, responde com status 500
    res.status(500).json({ message: 'Erro ao criar o serviço', error });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, category, subcategory, price, description, image } = req.body;

  try {
    // Busca e atualiza o serviço pelo ID
    const updatedService = await Service.findByIdAndUpdate(
      id,
      {
        name,
        category,
        subcategory,
        price,
        description,
        image,
      },
      { new: true } // Retorna o documento atualizado
    );

    if (!updatedService) {
      return res.status(404).json({ message: 'Serviço não encontrado' });
    }

    res.status(200).json({ message: 'Serviço atualizado com sucesso!', updatedService });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar o serviço', error });
  }
});

module.exports = router;
