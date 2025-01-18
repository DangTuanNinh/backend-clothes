"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PriceService extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Service, {
        foreignKey: "serviceId",
        targetKey: "id",
      });
      this.belongsTo(models.Weight, {
        foreignKey: "weightId",
        targetKey: "id",
      });
    }
  }
  PriceService.init(
    {
      weightId: DataTypes.INTEGER,
      serviceId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PriceService",
    }
  );
  return PriceService;
};
