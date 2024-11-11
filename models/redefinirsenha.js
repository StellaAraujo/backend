// Rota para solicitar redefinição de senha
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado!' });
      }
  
      // Gerar token JWT ou qualquer outro método para redefinir senha
      const token = jwt.sign({ id: user._id }, 'seu_segredo_para_redefinir_senha', { expiresIn: '1h' });
  
      // Enviar email para o usuário com o link de redefinição
      // Exemplo: `http://localhost:3000/reset-password/${token}`
  
      res.status(200).json({ message: 'Email de redefinição de senha enviado!' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  