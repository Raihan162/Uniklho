'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.STRING
      },
      receiver_name: {
        type: Sequelize.STRING
      },
      receiver_contact: {
        type: Sequelize.STRING
      },
      receiver_address: {
        type: Sequelize.STRING
      },
      receiver_province: {
        type: Sequelize.STRING
      },
      receiver_city: {
        type: Sequelize.STRING
      },
      courier: {
        type: Sequelize.STRING
      },
      service: {
        type: Sequelize.STRING
      },
      cost: {
        type: Sequelize.INTEGER
      },
      payment_method: {
        type: Sequelize.STRING
      },
      status_midtrans: {
        type: Sequelize.STRING
      },
      total_cost: {
        type: Sequelize.INTEGER
      },
      token_midtrans: {
        type: Sequelize.STRING
      },
      status_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transactions');
  }
};