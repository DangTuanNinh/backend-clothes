"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.Role, {
        through: "UserRoles",
      });
      this.hasMany(models.UserRole, { foreignKey: "userId", as: "userrole" });
      this.hasMany(models.Pet);
      this.hasMany(models.New);
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING(500),
      address: DataTypes.STRING(500),
      phone: DataTypes.STRING,
      male: DataTypes.INTEGER,
      avatar: DataTypes.STRING(500),
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
