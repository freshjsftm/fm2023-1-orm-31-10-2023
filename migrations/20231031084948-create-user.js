'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        field:'first_name',
        type: Sequelize.STRING(64),
        allowNull: false,
      },
      lastName: {
        field:'last_name',
        type: Sequelize.STRING(64),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        field: 'password_hash',
        allowNull: false,
        type: Sequelize.TEXT
      },
      birthday: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      isMale: {
        field: 'is_male',
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};