'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.users, {
        foreignKey: 'role_id'
      })
    }
  }
  role.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'role',
  });
  return role;
};