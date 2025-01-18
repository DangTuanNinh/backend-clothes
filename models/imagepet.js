"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ImagePet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Pet, { foreignKey: "petId", targetKey: "id" });
    }
  }
  ImagePet.init(
    {
      link: DataTypes.STRING(500),
      petId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ImagePet",
    }
  );
  return ImagePet;
};
