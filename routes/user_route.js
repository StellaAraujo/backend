// routes/user.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Rotas
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.put('/updateProfile', UserController.updateProfile);


module.exports = router;
