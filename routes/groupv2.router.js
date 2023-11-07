const { Router } = require('express');
const groupController = require('../controllers/group.controller');

const groupV2Router = Router();
//http://localhost:3000/api/users/122/groups
groupV2Router
  .route('/')
  .post(groupController.createGroupV2)
  .get(groupController.getAllGroupsV2);

module.exports = groupV2Router;
