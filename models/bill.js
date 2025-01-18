"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bill.init(
    {
      userName: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      detailProduct: DataTypes.STRING(5000),
      listProduct: DataTypes.TEXT,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Bill",
    },
  );
  return Bill;
};
