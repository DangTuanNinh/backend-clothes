var User = require("../models").User;
const jwt = require("jsonwebtoken");

require("dotenv").config();
let PAGE_SIZE = parseInt(process.env.PAGE_SIZE);
exports.create = (req, res) => {
  User.findOne({ where: { email: req.body.email } })
    .then((data) => {
      if (data === null) {
        User.create(req.body, { include: ["userrole"] })
          .then((data) => {
            res.json({ data: data });
          })
          .catch((er) => {
            throw er;
          });
      } else {
        res.json({ message: "Email đã tồn tại!" });
      }
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
      User.findAndCountAll({
        order: [["id", "DESC"]],
        offset: soLuongBoQua,
        limit: PAGE_SIZE,
        attributes: { exclude: ["password"] },
      })
        .then((data) => {
          res.json({ data: data });
        })
        .catch((er) => {
          throw er;
        });
    } else if (status && !page) {
      User.findAndCountAll({
        where: { status: status },
        order: [["id", "DESC"]],
        attributes: { exclude: ["password"] },
      })
        .then((data) => {
          res.json({ data: data });
        })
        .catch((er) => {
          throw er;
        });
    } else {
      User.findAndCountAll({
        where: { status: status },
        order: [["id", "DESC"]],
        offset: soLuongBoQua,
        limit: PAGE_SIZE,
        attributes: { exclude: ["password"] },
      })
        .then((data) => {
          res.json({ data: data });
        })
        .catch((er) => {
          throw er;
        });
    }
  } else {
    User.findAndCountAll({
      order: [["id", "DESC"]],
      attributes: { exclude: ["password"] },
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
  User.findOne({ where: { id: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.register = (req, res) => {
  User.findOne({
    where: { email: req.query.email, password: req.query.password },
    attributes: [
      "avatar",
      "firstName",
      "lastName",
      "id",
      "phone",
      "male",
      "address",
      "email",
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
  User.destroy({ where: { id: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.update = (req, res) => {
  User.update(req.body, { where: { id: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.checkUser = (req, res) => {
  if (
    req.headers &&
    req.headers.authorization &&
    String(req.headers.authorization.split(" ")[0]).toLowerCase() === "bearer"
  ) {
    var token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
      if (err) {
        return res.status(403).send({
          message: "token loi roi",
        });
      } else {
        res.json({ data: data });
      }
    });
  } else {
    return res.status(403).send({
      message: "UN",
    });
  }
};
