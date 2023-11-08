const { Router } = require('express');
const groupController = require('../controllers/group.controller');
const { singleUpload } = require('../middlewares/upload.mw');

const groupV1Router = Router();
//http://localhost:3000/api/groups
groupV1Router
  .route('/')
  .post(singleUpload('image'), groupController.createGroupV1);
//http://localhost:3000/api/groups/4
groupV1Router.route('/:idGroup').post(groupController.addUserToGroupV1);
//http://localhost:3000/api/groups/users/23
groupV1Router.route('/users/:idUser').get(groupController.getAllGroupsV1);
//http://localhost:3000/api/groups/4/image
groupV1Router.patch(
  '/:idGroup/image',
  singleUpload('image'),
  groupController.addImage
);
module.exports = groupV1Router;
