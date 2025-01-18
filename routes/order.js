module.exports = (app) => {
  const orderController = require("../controller/order");
  var router = require("express").Router();

  // Lấy danh sách tất cả đơn hàng
  router.get("/", orderController.getOrders);

  // Lấy chi tiết đơn hàng theo ID
  router.get("/:id", orderController.getOrderById);

  // Tạo đơn hàng mới
  router.post("/", orderController.createOrder);

  // Xác nhận đơn hàng
  router.post("/confirm/:id", orderController.confirmOrder);

  // Cập nhật trạng thái đơn hàng
  router.put("/:id", orderController.updateOrderStatus);

  app.use("/orders", router);
};
