const _ = require('lodash');
const createError = require('http-errors');
const { User } = require('../models');
const attrs = [
  'firstName',
  'lastName',
  'email',
  'password',
  'birthday',
  'isMale',
  'avatar',
];

module.exports.createUser = async (req, res, next) => {
  try {
    const { body, file } = req;
    const values = _.pick(body, attrs);
    if (file) {
      values.avatar = file.filename;
    }
    const createdUser = await User.create(values);
    if (!createdUser) {
      return next(createError(400, 'User not created'));
    }
    createdUser.dataValues.password = undefined;

    res.status(201).send({ data: createdUser });
  } catch (error) {
    next(error);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const { userInstance } = req;
    userInstance.dataValues.password = undefined;
    res.status(200).send({ data: userInstance });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const { pagination } = req;
    const users = await User.findAll({
      attributes: {
        exclude: ['password', 'updatedAt'],
      },
      ...pagination,
    });
    if (users.length === 0) {
      return res.status(204).send({ data: 'users list is empty' });
    }
    res.status(200).send({ data: users });
  } catch (error) {
    next(error);
  }
};

module.exports.updateUserInstance = async (req, res, next) => {
  try {
    const { body, userInstance, file } = req;
    const values = _.pick(body, attrs);
    if (file) {
      values.avatar = file.filename;
    }
    const updatedUserInstance = await userInstance.update(values);
    if (!updatedUserInstance) {
      return next(createError(404, 'User not updated'));
    }
    updatedUserInstance.dataValues.password = undefined;
    return res.status(200).send({ data: updatedUserInstance });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUserInstance = async (req, res, next) => {
  try {
    const { body, userInstance } = req;
    const result = await userInstance.destroy();
    return res.status(200).send({ data: userInstance });
  } catch (error) {
    next(error);
  }
};
