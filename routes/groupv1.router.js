const { Router } = require('express');
const {
  createGroupV1,
  getAllGroupsV1,
} = require('../controllers/group.controller');

const groupV1Router = Router();
//http://localhost:3000/api/groups

groupV1Router.route('/').post(createGroupV1);

groupV1Router.route('/users/:idUser').get(getAllGroupsV1);

module.exports = groupV1Router;
