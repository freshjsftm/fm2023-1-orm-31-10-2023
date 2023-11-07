const { Router } = require('express');
const userRouter = require('./user.router');
const taskRouter = require('./task.router');
const groupV1Router = require('./groupv1.router');
const groupV2Router = require('./groupv2.router');
const { checkUser } = require('../middlewares/users.mw');

const router = Router();
//http://localhost:3000/api

router.use('/users', userRouter); 
router.use('/users/:idUser/tasks', checkUser, taskRouter);
//http://localhost:3000/api/groups
router.use('/groups', groupV1Router);
//
router.use('/users/:idUser/groups', checkUser, groupV2Router);

module.exports = router;
