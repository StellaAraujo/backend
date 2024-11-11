// models/service.js

const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: String,           // Nome do serviço
  category: String,       // Categoria do serviço (ex: "Cabelo", "Maquiagem")
  subcategory: String,    // Subcategoria do serviço (ex: "Corte", "Pintura")
  price: Number,           // Preço do serviço
  description: String,    // Descrição do serviço
  image: String,           // URL da imagem do serviço
});

module.exports = mongoose.model('Service', serviceSchema);
