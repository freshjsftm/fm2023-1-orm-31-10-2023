const { Router } = require('express');
const UserController = require('../controllers/user.controller');
const TaskController = require('../controllers/task.controller');
const { checkUser } = require('../middlewares/users.mw');

const router = Router();

router.post('/users', UserController.createUser);
router.get('/users', UserController.getAllUsers);

router.patch('/users/:idUser', checkUser, UserController.updateUserInstance);
router.delete('/users/:idUser', checkUser, UserController.deleteUserInstance);


router.post('/users/:idUser/tasks', TaskController.createTask);

module.exports = router;
