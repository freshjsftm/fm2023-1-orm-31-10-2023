const { User } = require('../models');

module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;
    const createdUser = await User.create(body);
    createdUser.password = undefined;
    res.status(201).send({ data: createdUser });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const {
      query: { male },
    } = req;
    const users = await User.findAll({
      where: {
        isMale: male || true,
      },
      attributes: {
        exclude: ['password', 'updatedAt'],
      },
    });
    res.status(200).send({ data: users });
  } catch (error) {
    next(error);
  }
};

module.exports.updateUserStatic = async (req, res, next) => {
  try {
    const {
      body,
      params: { idUser },
      query: { male },
    } = req;
    const [count, userUpdated] = await User.update(body, {
      //where: { id: idUser },
      where: { isMale: male },
      returning: true,
    });
    if (count === 0) {
      return res.status(204).send({ data: 'not found' });
    }
    res.status(200).send({ data: userUpdated });
  } catch (error) {
    next(error);
  }
};

module.exports.updateUserInstance = async (req, res, next) => {
  try {
    const {
      body,
      params: { idUser },
    } = req;
    const userInstance = await User.findByPk(idUser);
    if (userInstance) {
      const updatedUserInstance = await userInstance.update(body);
      updatedUserInstance.password = undefined;
      return res.status(200).send({ data: updatedUserInstance });
    }
    res.status(404).send({ data: 'user not exists' });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUserStatic = async (req, res, next) => {
  try {
    const {
      query: { male },
    } = req;
    const count = await User.destroy({
      where: { isMale: male },
    });
    res.status(200).send({ data: count });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUserInstance = async (req, res, next) => {
  try {
    const {
      body,
      params: { idUser },
    } = req;
    const userInstance = await User.findByPk(idUser);
    if (userInstance) {
      const result = await userInstance.destroy();
      return res.status(200).send({ data: userInstance });
    }
    res.status(404).send({ data: 'user not exists' });
  } catch (error) {
    next(error);
  }
};

// module.exports.createUser = async (req, res, next) => {
//   try {
//   } catch (error) {
//     next(error);
//   }
// };
