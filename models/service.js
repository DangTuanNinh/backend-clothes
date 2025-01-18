"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Weight, { through: "PriceServices" });
      this.hasMany(models.RevenueService);
    }
  }
  Service.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING(1000),
      icon: DataTypes.STRING(2000),
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Service",
    }
  );
  return Service;
};
