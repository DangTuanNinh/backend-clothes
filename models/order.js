"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Thiết lập mối quan hệ với bảng User (có thể thêm mối quan hệ với các bảng khác nếu cần)
      Order.belongsTo(models.User, { foreignKey: "userId" });
    }
  }

  Order.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      listProduct: {
        type: DataTypes.STRING, // Có thể là JSON chứa các sản phẩm trong đơn hàng
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "pending", // Trạng thái mặc định
      },
      // Thêm thông tin người mua
      buyerName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      buyerPhone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      buyerAddress: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );

  return Order;
};
