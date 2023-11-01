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

// module.exports.createUser = async (req, res, next) => {
//   try {
//   } catch (error) {
//     next(error);
//   }
// };
