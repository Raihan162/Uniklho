'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.category, {
        foreignKey: 'category_id'
      }),
        this.hasMany(models.comments, {
          foreignKey: 'products_id'
        }),
        this.hasMany(models.cart, {
          foreignKey: 'product_id'
        }),
        this.hasMany(models.transactions, {
          foreignKey: 'products_id'
        }),
        this.hasMany(models.wishlist, {
          foreignKey: 'products_id'
        })
    }
  }
  products.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    image_url: DataTypes.STRING,
    image_public_id: DataTypes.STRING,
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'products',
  });
  return products;
};