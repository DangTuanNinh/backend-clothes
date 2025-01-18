"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RevenueService extends Model {
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
    }
  }
  RevenueService.init(
    {
      serviceId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      money: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "RevenueService",
    }
  );
  return RevenueService;
};
