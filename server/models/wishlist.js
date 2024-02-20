'use strict';
const {
  Model, DATE, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.products, {
        foreignKey: 'products_id'
      }),
        this.belongsTo(models.users, {
          foreignKey: 'user_id'
        })
    }
  }
  wishlist.init({
    products_id: DataTypes.INTEGER,
    user_id: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'wishlist',
  });
  return wishlist;
};