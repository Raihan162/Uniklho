'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
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
  cart.init({
    product_id: DataTypes.INTEGER,
    user_id: DataTypes.STRING,
    qty: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'cart',
  });
  return cart;
};