const { Order, Bill, User, Product } = require("../models");

// Lấy danh sách tất cả đơn hàng
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      attributes: [
        "id",
        "totalPrice",
        "paymentMethod",
        "listProduct",
        "status",
        "buyerName",
        "buyerPhone",
        "buyerAddress",
      ],
    });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy chi tiết đơn hàng theo ID
exports.getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id, {
      include: {
        model: User,
        attributes: ["firstName"],
      },
    });

    if (!order) {
      return res.status(404).json({ message: "Đơn hàng không tồn tại" });
    }

    res.status(200).json(order); // Trả về đơn hàng cùng với thông tin người mua
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// API tạo đơn hàng mới
exports.createOrder = async (req, res) => {
  const { userId, totalPrice, paymentMethod, listProduct } = req.body;

  try {
    // Kiểm tra sự tồn tại của người dùng từ `userId`
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    // Không tính lại totalPrice nữa, sử dụng giá trị đã gửi từ frontend
    // let totalPrice = 0; // Loại bỏ phần này
    // listProduct.forEach((product) => {
    //   totalPrice += product.priceResult * product.quantityCurrent;
    // });

    // Lấy thông tin từ user để điền vào đơn hàng
    const buyerName = user.firstName + " " + user.lastName;
    const buyerPhone = user.phone;
    const buyerAddress = user.address;

    // Tạo đơn hàng mới
    const newOrder = await Order.create({
      userId,
      totalPrice, // Sử dụng giá trị tổng từ frontend
      paymentMethod,
      listProduct: JSON.stringify(listProduct), // Chuyển `listProduct` sang JSON nếu là mảng
      status: "pending",
      buyerName,
      buyerPhone,
      buyerAddress,
    });

    res.status(201).json({
      message: "Đơn hàng đã được tạo thành công",
      order: newOrder.toJSON(), // Trả về đối tượng JSON của `Order`
    });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ error: err.message });
  }
};

// Xác nhận đơn hàng
exports.confirmOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByPk(id, {
      include: [
        {
          model: User,
          as: "User",
          attributes: ["firstName", "lastName", "address", "phone"],
        },
      ],
    });

    if (!order) {
      return res.status(404).json({ message: "Đơn hàng không tồn tại" });
    }

    // Lấy chi tiết sản phẩm từ `listProduct`
    const productList = JSON.parse(order.listProduct || "[]");
    const detailedProducts = [];

    let totalPrice = 0;
    for (const product of productList) {
      const detailedProduct = await Product.findByPk(product.id);
      if (detailedProduct) {
        const priceResult = detailedProduct.price * product.quantity;
        detailedProducts.push({
          ...detailedProduct.toJSON(),
          quantity: product.quantity,
          priceResult, // Dùng giá đã tính toán cho từng sản phẩm
        });
        totalPrice += priceResult; // Cộng dồn giá trị vào tổng đơn hàng
      }
    }

    // Cập nhật giá trị tổng vào hóa đơn
    const newBill = await Bill.create({
      userName: order.buyerName,
      address: order.buyerAddress,
      phone: order.buyerPhone,
      listProduct: JSON.stringify(detailedProducts),
      price: totalPrice, // Sử dụng tổng đã tính toán từ các sản phẩm
    });

    order.status = "confirmed";
    await order.save();

    res.status(200).json({
      message: "Đơn hàng đã được xác nhận và gửi sang Hóa đơn",
      bill: newBill,
    });
  } catch (err) {
    console.error("Error confirming order:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findByPk(id); // Tìm đơn hàng theo ID
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status; // Cập nhật trạng thái
    await order.save();

    res.json(order); // Trả về đơn hàng đã được cập nhật
  } catch (error) {
    res.status(500).json({ message: "Error updating order status", error });
  }
};
