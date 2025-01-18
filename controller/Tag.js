var Tag = require("../models").Tag;
require("dotenv").config();
let PAGE_SIZE = parseInt(process.env.PAGE_SIZE);
exports.create = (req, res) => {
    console.log(req.body);
    Tag.create(req.body)
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
            Tag.findAndCountAll({
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
            Tag.findAndCountAll({
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
            Tag.findAndCountAll({
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
        Tag.findAndCountAll({ order: [["id", "DESC"]] })
            .then((data) => {
                res.json({ data: data });
            })
            .catch((er) => {
                throw er;
            });
    }
};
exports.findone = (req, res) => {
    Tag.findOne({ where: { id: req.params.id } })
        .then((data) => {
            res.json({ data: data });
        })
        .catch((er) => {
            throw er;
        });
};
exports.delete = (req, res) => {
    Tag.destroy({ where: { id: req.params.id } })
        .then((data) => {
            res.json({ data: data });
        })
        .catch((er) => {
            throw er;
        });
};
exports.update = (req, res) => {
    Tag.update(req.body, { where: { id: req.params.id } })
        .then((data) => {
            res.json({ data: data });
        })
        .catch((er) => {
            throw er;
        });
};
