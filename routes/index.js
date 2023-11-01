const { Router } = require('express');
const UserController = require('../controllers/user.controller');

const router = Router();

// http://localhost:3000/api/users
//router.get('/users')

// create user
router.post('/users', UserController.createUser);
router.get('/users', UserController.getAllUsers);

module.exports = router;
