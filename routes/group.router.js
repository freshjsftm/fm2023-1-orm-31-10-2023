const { Router } = require('express');
const groupController = require('../controllers/group.controller');
const { singleUpload } = require('../middlewares/upload.mw');

const groupRouter = Router();

groupRouter
  .route('/')
  .post(singleUpload('image'), groupController.createGroup);

  groupRouter.route('/:idGroup').post(groupController.addUserToGroup);

  groupRouter.route('/users/:idUser').get(groupController.getAllGroups);

  groupRouter.patch(
  '/:idGroup/image',
  singleUpload('image'),
  groupController.addImage
);
module.exports = groupRouter;
