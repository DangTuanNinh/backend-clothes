var Product = require("../models").Product;
var Tag = require("../models").Tag;
var Category = require("../models").Category;
var ImageProduct = require("../models").ImageProduct;
const { Op } = require("sequelize");
require("dotenv").config();
let PAGE_SIZE = parseInt(process.env.PAGE_SIZE);
exports.create = (req, res) => {
  Product.create(req.body, { include: ["imgproduct", "tagproduct"] })
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
  var category = req.query.category; // Lấy tham số category từ query string
  var name = req.query.name;

  page = parseInt(page);
  let soLuongBoQua = (page - 1) * PAGE_SIZE;

  let whereCondition = {
    quantity: { [Op.ne]: 0 }, // Lọc sản phẩm còn hàng
  };

  if (status) {
    whereCondition.status = status; // Lọc theo trạng thái nếu có
  }

  if (category) {
    whereCondition.categoryId = category; // Lọc theo category nếu có
  }

  if (name) {
    whereCondition.name = { [Op.like]: `%${name}%` }; // Tìm kiếm sản phẩm theo tên (bằng cách sử dụng LIKE)
  }

  if (page || status || category) {
    // Nếu có trang, trạng thái hoặc danh mục
    Product.findAndCountAll({
      where: whereCondition,
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
  } else {
    // Nếu không có bất kỳ bộ lọc nào, trả tất cả sản phẩm
    Product.findAndCountAll({
      where: whereCondition,
      order: [["id", "DESC"]],
    })
      .then((data) => {
        res.json({ data: data });
      })
      .catch((er) => {
        throw er;
      });
  }
};

exports.findone = (req, res) => {
  Product.findOne({
    where: { id: req.params.id },
    include: [
      { model: Tag, where: { status: 1 } },
      { model: ImageProduct, as: "imgproduct", attributes: ["link"] },
      { model: Category, attributes: ["id", "name"], where: { status: 1 } },
    ],
  })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.delete = (req, res) => {
  Product.destroy({ where: { id: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.update = (req, res) => {
  Product.update(req.body, { where: { id: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};

exports.updateQuantity = (req, res) => {
  console.log(req.body);
  Product.bulkCreate(req.body, {
    updateOnDuplicate: ["quantity"],
  })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
