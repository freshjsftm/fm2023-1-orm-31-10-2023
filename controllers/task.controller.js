const { Task, User } = require('../models');

module.exports.createTask = async (req, res, next) => {
  try {
    const { body, userInstance } = req;
    const newTask = await userInstance.createTask(body);
    res.status(201).send({ data: newTask });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllTasks = async (req, res, next) => {
  try {
    const { userInstance } = req;
    const tasks = await userInstance.getTasks({
      where: {isDone: false},
      include: [
        {
          model: User,
          attributes: ['email'] ,
        },
      ],
    });
    if (tasks.length === 0) {
      return res.status(200).send({ data: 'empty' });
    }
    res.status(200).send({ data: tasks });
  } catch (error) {
    next(error);
  }
};
