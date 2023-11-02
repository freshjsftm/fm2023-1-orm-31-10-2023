const { Task, User } = require('../models');

module.exports.createTask = async (req, res, next) => {
  try {
    const {
      body,
      params: { idUser },
    } = req;
    const newTask = await Task.create({ ...body, userId: idUser });
    res.status(201).send({ data: newTask });
  } catch (error) {
    next(error);
  }
};
