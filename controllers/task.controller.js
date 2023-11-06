const { Task, User } = require('../models');
const LimitTasksError = require('../errors/LimitTasksError');

module.exports.createTask = async (req, res, next) => {
  try {
    const { body, userInstance } = req;
    const count = await userInstance.countTasks();
    if (count >= 10) {
      return next(new LimitTasksError('Task must be less or equal 10'));
    }
    const newTask = await userInstance.createTask(body);
    res.status(201).send({ data: newTask });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllTasks = async (req, res, next) => {
  try {
    const { userInstance, pagination } = req;
    const tasks = await userInstance.getTasks({
      where: { isDone: false },
      include: [
        {
          model: User,
          attributes: ['email'],
        },
      ],
      ...pagination,
    });
    if (tasks.length === 0) {
      return res.status(200).send({ data: 'empty' });
    }
    res.status(200).send({ data: tasks });
  } catch (error) {
    next(error);
  }
};

module.exports.getTask = async (req, res, next) => {
  try {
    const { taskInstance } = req;
    res.status(200).send({ data: taskInstance });
  } catch (error) {
    next(error);
  }
};

module.exports.updateTask = async (req, res, next) => {
  try {
    const { taskInstance, body } = req;
    const updatedTask = await taskInstance.update(body);
    res.status(200).send({ data: updatedTask });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteTask = async (req, res, next) => {
  try {
    const { taskInstance } = req;
    await taskInstance.destroy();
    res.status(200).send({ data: taskInstance });
  } catch (error) {
    next(error);
  }
};
