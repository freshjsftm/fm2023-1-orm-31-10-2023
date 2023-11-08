const { Router } = require('express');
const {  createGroupV1,  getAllGroupsV1, addUserToGroupV1,
} = require('../controllers/group.controller');

const groupV1Router = Router();
//http://localhost:3000/api/groups
groupV1Router.route('/').post(createGroupV1);
//http://localhost:3000/api/groups/4
groupV1Router.route('/:idGroup').post(addUserToGroupV1);
http://localhost:3000/api/groups/users/23
groupV1Router.route('/users/:idUser').get(getAllGroupsV1);

module.exports = groupV1Router;
