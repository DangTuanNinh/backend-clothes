"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TagNew extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.New, {
        foreignKey: "newId",
        targetKey: "id",
      });
      this.belongsTo(models.Tag, {
        foreignKey: "tagId",
        targetKey: "id",
      });
    }
  }
  TagNew.init(
    {
      tagId: DataTypes.INTEGER,
      newId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "TagNew",
    }
  );
  return TagNew;
};
