'use strict';
const { isAfter } = require('date-fns');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      // define association here
      Task.belongsTo(models.User, {
        foreignKey: 'userId'
      });
    }
  }
  Task.init(
    {
      content: {
        allowNull: false,
        type: DataTypes.TEXT,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
      deadline: {
        allowNull: false,
        type: DataTypes.DATEONLY,
        validate: {
          notNull: true,
          isDate: true,
          isValidDate(value) {
            if (isAfter(new Date(), new Date(value))) {
              throw new Error('check deadline');
            }
          },
        },
      },
      isDone: {
        field: 'is_done',
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Task',
      tableName: 'tasks',
      underscored: true,
    }
  );
  return Task;
};
