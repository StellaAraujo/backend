// controllers/userController.js
const User = require('../models/user'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registro de usuário
exports.register = async (req, res) => {
  const { name, email, password, cpf, birthDate, phone } = req.body;

  try {
    const user = new User({ name, email, password, cpf, birthDate, phone });
    await user.save();
    res.status(201).json({ message: 'Usuário criado com sucesso!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login de usuário
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Senha incorreta!' });
    }

    // Criação do token JWT
    const token = jwt.sign({ id: user._id }, 'seu_segredo', { expiresIn: '1h' });

    // Retornando o token e o nome do usuário
    res.json({ token, name: user.name, userId: user._id}); // Adicione o campo name aqui
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  const { userId, email, phone } = req.body;

  try {
    // Encontra o usuário pelo ID e atualiza o email e telefone
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    user.email = email;
    user.phone = phone;

    await user.save();
    res.status(200).json({ message: 'Perfil atualizado com sucesso!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};