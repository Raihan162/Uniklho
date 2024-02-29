'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.transactions, {
        foreignKey: 'transaction_id'
      }),
      this.belongsTo(models.products, {
        foreignKey: 'product_id'
      })
    }
  }
  transaction_details.init({
    product_id: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    transaction_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'transaction_details',
  });
  return transaction_details;
};