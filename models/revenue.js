'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Revenue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Revenue.init({
    name: DataTypes.STRING,
    money: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Revenue',
  });
  return Revenue;
};