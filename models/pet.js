"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
      });
      this.hasMany(models.ImagePet, { as: "imgpet" });
    }
  }
  Pet.init(
    {
      name: DataTypes.STRING,
      avatar: DataTypes.STRING(500),
      price: DataTypes.STRING,
      type: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      description: DataTypes.STRING(1000),
      text: DataTypes.TEXT,
      checkAdmin: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Pet",
    },
  );
  return Pet;
};
