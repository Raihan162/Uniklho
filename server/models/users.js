'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.comments, {
        foreignKey: 'user_id'
      }),
        this.hasMany(models.cart, {
          foreignKey: 'user_id'
        }),
        this.hasMany(models.transactions, {
          foreignKey: 'user_id'
        }),
        this.belongsTo(models.role, {
          foreignKey: 'role_id'
        })
    }
  }
  users.init({
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    contact: DataTypes.STRING,
    password: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
    address: DataTypes.STRING,
    subdistrict: DataTypes.STRING,
    city: DataTypes.STRING,
    province: DataTypes.STRING,
    photo_profile:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};