const path = require('path');
const { Router } = require('express');
const multer = require('multer');
const groupController = require('../controllers/group.controller');
const { PATH_IMAGES } = require('../constants');

// const upload = multer({
//   dest: path.resolve(__dirname, '../public/images'),
// });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, `../${PATH_IMAGES}`));
  },
  filename: (req, file, cb) => {
    const uniqueFileName =
      Date.now() +
      '-' +
      Math.round(Math.random() * 100) +
      '-' +
      file.originalname;
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage: storage });

const groupV1Router = Router();
//http://localhost:3000/api/groups
groupV1Router.route('/').post(groupController.createGroupV1);
//http://localhost:3000/api/groups/4
groupV1Router.route('/:idGroup').post(groupController.addUserToGroupV1);
//http://localhost:3000/api/groups/users/23
groupV1Router.route('/users/:idUser').get(groupController.getAllGroupsV1);
//http://localhost:3000/api/groups/4/image
groupV1Router.patch(
  '/:idGroup/image',
  upload.single('image'),
  groupController.addImage
);
module.exports = groupV1Router;
