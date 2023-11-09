'use strict';
const { isAfter } = require('date-fns');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      User.hasMany(models.Task, {
        foreignKey: 'userId'
      }); 

      User.belongsToMany(models.Group, {
        through: 'users_to_groups',
        foreignKey: 'userId'
      })
    }
  }
  User.init(
    {
      avatar:{
        type: DataTypes.TEXT,
      },
      firstName: {
        type: DataTypes.STRING(64),
        allowNull: false,
        field: 'first_name',
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      lastName: {
        type: DataTypes.STRING(64),
        allowNull: false,
        field: 'last_name',
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: true,
          notEmpty: true,
          isEmail: true,
        },
      },
      password: {
        field: 'password_hash',
        allowNull: false,
        type: DataTypes.TEXT,
        set(value) {
          this.setDataValue('password', 'new_hash_password');
        },
      },
      birthday: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true,
          isValidDate(value) {
            if (isAfter(new Date(value), new Date())) {
              throw new Error('check birthday');
            }
          },
        },
      },
      isMale: {
        field: 'is_male',
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      underscored: true,
    }
  );
  return User;
};
