"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        allowNull: false,
      },
      totalPrice: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      paymentMethod: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      listProduct: {
        type: Sequelize.JSON, // Sử dụng JSON thay vì STRING
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "pending", // Trạng thái mặc định
      },
      // Thêm thông tin người mua
      buyerName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      buyerPhone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      buyerAddress: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW, // Tự động thiết lập thời gian tạo
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW, // Tự động thiết lập thời gian cập nhật
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Orders");
  },
};
