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
        this.belongsTo(models.products, {
          foreignKey: 'products_id'
        })
    }
  }
  transactions.init({
    user_id: DataTypes.STRING,
    product_id: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'transactions',
  });
  return transactions;
};