var Bill = require("../models").Bill;
require("dotenv").config();
let PAGE_SIZE = parseInt(process.env.PAGE_SIZE);
const { Op } = require("sequelize");

exports.create = (req, res) => {
  console.log(req.body);
  Bill.create(req.body)
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.findall = (req, res) => {
  var page = req.query.page;
  var status = req.query.status;
  page = parseInt(page);
  let soLuongBoQua = (page - 1) * PAGE_SIZE;
  if (page || status) {
    if (page && !status) {
      Bill.findAndCountAll({
        order: [["id", "DESC"]],
        offset: soLuongBoQua,
        limit: PAGE_SIZE,
      })
        .then((data) => {
          res.json({ data: data });
        })
        .catch((er) => {
          throw er;
        });
    } else if (status && !page) {
      Bill.findAndCountAll({
        where: { status: status },
        order: [["id", "DESC"]],
      })
        .then((data) => {
          res.json({ data: data });
        })
        .catch((er) => {
          throw er;
        });
    } else {
      Bill.findAndCountAll({
        where: { status: status },
        order: [["id", "DESC"]],
        offset: soLuongBoQua,
        limit: PAGE_SIZE,
      })
        .then((data) => {
          res.json({ data: data });
        })
        .catch((er) => {
          throw er;
        });
    }
  } else {
    Bill.findAndCountAll({ order: [["id", "DESC"]] })
      .then((data) => {
        res.json({ data: data });
      })
      .catch((er) => {
        throw er;
      });
  }
};
exports.findone = (req, res) => {
  Bill.findOne({ where: { id: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.delete = (req, res) => {
  Bill.destroy({ where: { id: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.update = (req, res) => {
  Bill.update(req.body, { where: { id: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.getRevenueStatistics = async (req, res) => {
  const { year, month } = req.query;
  const monthlyRevenue = Array(12).fill(0);
  let totalRevenue = 0;

  try {
    if (!year) {
      return res.status(400).json({ message: "Năm là bắt buộc!" });
    }

    const whereClause = {
      createdAt: {
        [Op.gte]: new Date(year, 0, 1), // Ngày bắt đầu năm
        [Op.lt]: new Date(parseInt(year) + 1, 0, 1), // Ngày kết thúc năm
      },
    };

    // Nếu có tháng, chỉ lọc theo tháng đó
    if (month) {
      whereClause.createdAt[Op.gte] = new Date(year, month - 1, 1); // Tháng bắt đầu
      whereClause.createdAt[Op.lt] = new Date(year, month, 1); // Tháng kết thúc
    }

    console.log("Where clause:", whereClause);

    const bills = await Bill.findAll({
      where: whereClause,
    });

    // Kiểm tra nếu không có đơn hàng nào trong năm/tháng
    if (bills.length === 0) {
      return res.json({ totalRevenue, monthlyRevenue });
    }

    // Tính tổng doanh thu cho mỗi tháng và tổng doanh thu chung
    bills.forEach((bill) => {
      try {
        const products = JSON.parse(bill.listProduct);

        // Kiểm tra nếu products không phải là mảng
        if (!Array.isArray(products)) {
          throw new Error(
            `listProduct của bill ID ${bill.id} không phải là mảng`
          );
        }

        const billMonth = new Date(bill.createdAt).getMonth(); // Lấy tháng từ createdAt

        products.forEach((product) => {
          const price = parseFloat(product.price) || 0;
          const quantity = product.quantityCurrent || 1;
          monthlyRevenue[billMonth] += price * quantity;
          totalRevenue += price * quantity; // Cộng doanh thu vào tổng doanh thu
        });
      } catch (error) {
        console.error(
          `Lỗi trong việc xử lý sản phẩm của hóa đơn ID ${bill.id}:`,
          error.message
        );
      }
    });

    // Trả về tổng doanh thu cùng với doanh thu từng tháng
    res.json({ totalRevenue, monthlyRevenue });
  } catch (error) {
    console.error("Error fetching revenue statistics:", error);
    res.status(500).json({
      message: "Có lỗi xảy ra khi lấy dữ liệu thống kê.",
      error: error.message,
    });
  }
};
