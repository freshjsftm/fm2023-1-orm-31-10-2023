const { Router } = require('express');
const UserController = require('../controllers/user.controller');
const { checkUser } = require('../middlewares/users.mw');
const paginate = require('../middlewares/paginate.mw');
const { singleUpload } = require('../middlewares/upload.mw');

const userRouter = Router();

userRouter
  .route('/')
  .post(singleUpload('avatar'), UserController.createUser)
  .get(paginate, UserController.getAllUsers);

userRouter
  .route('/:idUser')
  .all(checkUser)
  .get(UserController.getUser)
  .patch(singleUpload('avatar'), UserController.updateUserInstance)
  .delete(UserController.deleteUserInstance);

module.exports = userRouter;
