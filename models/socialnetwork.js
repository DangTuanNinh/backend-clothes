"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SocialNetwork extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SocialNetwork.init(
    {
      name: DataTypes.STRING,
      color: DataTypes.STRING,
      icon: DataTypes.STRING,
      link: DataTypes.STRING(500),
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "SocialNetwork",
    }
  );
  return SocialNetwork;
};
