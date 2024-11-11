//server.js

const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const franquiasRoute = require('./routes/franquias_route');
const userRoutes = require('./routes/user_route');
const services_route= require('./routes/services_route');
const { register } = require('./controllers/userController');
const profissionaisRouter = require('./routes/profissionais_route');
const agendamentoRoutes = require('./routes/agendamento_route'); // Verifique o caminho correto para o arquivo
const horariosRoutes = require('./routes/horarios_route');


dotenv.config();

// URL de conexão com o  MongoDB Atlas
mongoose.connect('mongodb+srv://stellaaraujo:PimTurquesa@clusterpim.0v20e.mongodb.net/?retryWrites=true&w=majority&appName=ClusterPIM',{
}).then(() => {
  console.log('Conectado ao MongoDB Atlas');
}).catch((error) => {
  console.error('Erro ao conectar ao MongoDB:', error);
});

// Middleware para lidar com JSON
app.use(express.json());

// routes
app.use('/franquias', franquiasRoute);
app.use('/user', userRoutes);
app.use('/services',services_route);
app.use('/profissionais', profissionaisRouter);
app.use('/agendamentos', agendamentoRoutes);
app.use('/disponibilidade', horariosRoutes );

// Resposta de funcionamento do servidor (servidor rodando na porta 3000)
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// Rota para receber avaliações
app.post('/avaliacao', async (req, res) => {
  const { userId, notaServico, notaProfissional, notaUnidade } = req.body;

  try {
    const novaAvaliacao = new Avaliacao({
      userId,
      notaServico,
      notaProfissional,
      notaUnidade,
    });

    await novaAvaliacao.save();
    res.status(201).json({ message: 'Avaliação enviada com sucesso' });
  } catch (error) {
    console.error('Erro ao salvar avaliação:', error);
    res.status(500).json({ message: 'Erro ao salvar avaliação', error });
  }
});
