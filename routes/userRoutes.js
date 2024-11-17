const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth')
const authenticationController = require('../controllers/authenticationController')


// login
router.post('/register', authenticationController.register);
router.post('/login', authenticationController.login);
router.post('/forgot-password', authenticationController.forgotPassword);
router.post('/reset-password', authenticationController.resetPassword);

// routes
router.post('/users', userController.createUser);
router.get('/users/:id', auth, userController.getUser);
router.get('/users', auth, userController.getAllUsers)
router.put('/users/:id', auth, userController.updateUser);
router.delete('/users/:id', auth, userController.deleteUser)


module.exports = router;