const _ = require('lodash');
const createError = require('http-errors');
const { Group, User } = require('../models');
const attrsV1 = ['name', 'imagePath', 'description', 'userId'];
const attrsV2 = ['name', 'imagePath', 'description'];

module.exports.createGroupV1 = async (req, res, next) => {
  try {
    const { body } = req;
    const values = _.pick(body, attrsV1);
    //отримати перевірити юзера на існування
    const user = await User.findByPk(values.userId);
    if (!user) {
      return next(createError(404, 'User not found'));
    }
    //створити групу
    const group = await Group.create(values);
    if (!group) {
      return next(createError(400, 'Bad request'));
    }
    //зв'язати юзера та групу магією
    await user.addGroup(group);
    //await group.addUser(user);

    res.status(201).send({ data: group });
  } catch (error) {
    next(error);
  }
};
module.exports.createGroupV2 = async (req, res, next) => {
  try {
    const { userInstance, body } = req;
    const values = _.pick(body, attrsV2);
    const group = await Group.create(values);
    if (!group) {
      return next(createError(400, 'Bad request'));
    }
    await userInstance.addGroup(group);
    res.status(201).send({ data: group });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllGroupsV2 = async (req, res, next) => {
  try {
    const { userInstance } = req;
    const groups = await userInstance.getGroups();
    groups.forEach(
      ({ dataValues }) => (dataValues['users_to_groups'] = undefined)
    );
    res.status(200).send({ data: groups });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllGroupsV1 = async (req, res, next) => {
  try {
    const {
      params: { idUser },
    } = req;
    const userWithGroups = await User.findByPk(idUser, {
      attributes: {
        exclude: ['password'],
      },
      include: [
        {
          model: Group,
          attributes: ['id', 'name'],
          through: {
            attributes: [],
          },
        },
      ],
    });
    if (!userWithGroups) {
      return next(createError(404, 'User not found'));
    }
    res.status(200).send({ data: userWithGroups });
  } catch (error) {
    next(error);
  }
};

module.exports.addUserToGroupV1 = async (req, res, next) => {
  try {
    const {
      params: { idGroup },
      body: { userId },
    } = req;
    const user = await User.findByPk(userId);
    if (!user) {
      return next(createError(404, 'User not found'));
    }
    const group = await Group.findByPk(idGroup);
    if (!group) {
      return next(createError(404, 'Group not found'));
    }
    await group.addUser(user);
    const groupWithUsers = await Group.findByPk(idGroup, {
      include: [
        {
          model: User,
          attributes: ['id', 'email'],
          through: {
            attributes: [],
          },
        },
      ],
    });
    res.status(201).send({ data: groupWithUsers });
  } catch (error) {
    next(error);
  }
};
module.exports.addUserToGroupV2 = async (req, res, next) => {
  try {
    const {
      userInstance,
      params: { idGroup },
    } = req;
    const group = await Group.findByPk(idGroup);
    if (!group) {
      return next(createError(404, 'Group not found'));
    }
    await group.addUser(userInstance);
    const groupWithUsers = await Group.findByPk(idGroup, {
      include: [
        {
          model: User,
          attributes: ['id', 'email'],
          through: {
            attributes: [],
          },
        },
      ],
    });
    res.status(201).send({ data: groupWithUsers });
  } catch (error) {
    next(error);
  }
};
