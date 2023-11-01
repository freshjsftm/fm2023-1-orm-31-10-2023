const { Router } = require('express');
const UserController = require('../controllers/user.controller');

const router = Router();

// http://localhost:3000/api/users
//router.get('/users')

// create user
router.post('/users', UserController.createUser);
router.get('/users', UserController.getAllUsers);

router.patch('/users', UserController.updateUserStatic);

module.exports = router;
