'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.users, {
        foreignKey: 'user_id'
      }),
        this.belongsTo(models.status, {
          foreignKey: 'status_id'
        }),
        this.hasMany(models.transaction_details, {
          foreignKey: 'transaction_id'
        })
    }
  }
  transactions.init({
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    user_id: DataTypes.STRING,
    receiver_name: DataTypes.STRING,
    receiver_contact: DataTypes.STRING,
    receiver_address: DataTypes.STRING,
    receiver_province: DataTypes.STRING,
    receiver_city: DataTypes.STRING,
    courier: DataTypes.STRING,
    service: DataTypes.STRING,
    cost: DataTypes.INTEGER,
    payment_method: DataTypes.STRING,
    status_midtrans: DataTypes.STRING,
    total_cost: DataTypes.INTEGER,
    token_midtrans: DataTypes.STRING,
    status_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'transactions',
  });
  return transactions;
};