"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TagProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Product, {
        foreignKey: "productId",
        targetKey: "id",
      }),
        this.belongsTo(models.Tag, { foreignKey: "tagId", targetKey: "id" });
    }
  }
  TagProduct.init(
    {
      tagId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "TagProduct",
    }
  );
  return TagProduct;
};
