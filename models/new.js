"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class New extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Tag, { through: "TagNews" });
      this.hasMany(models.TagNew, { foreignKey: "newId", as: "tagnew" });
      this.belongsTo(models.User, { foreignKey: "userId", targetKey: "id" });
    }
  }
  New.init(
    {
      name: DataTypes.STRING(500),
      samary: DataTypes.STRING(1000),
      content: DataTypes.TEXT,
      avatar: DataTypes.STRING(500),
      userId: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "New",
    }
  );
  return New;
};
