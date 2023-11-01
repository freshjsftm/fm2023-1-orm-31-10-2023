const { Router } = require('express');
const UserController = require('../controllers/user.controller');

const router = Router();

// http://localhost:3000/api/users
//router.get('/users')

// create user
router.post('/users', UserController.createUser);
router.get('/users', UserController.getAllUsers);

router.patch('/users', UserController.updateUserStatic);
router.patch('/users/:idUser', UserController.updateUserInstance);


router.delete('/users', UserController.deleteUserStatic);
router.delete('/users/:idUser', UserController.deleteUserInstance);

module.exports = router;
