module.exports = (app) => {
  var Bill = require("../controller/Bill");
  var router = require("express").Router();

  router.post("/", Bill.create);
  router.get("/statistics", Bill.getRevenueStatistics);
  router.get("/", Bill.findall);
  router.get("/:id", Bill.findone);
  router.delete("/:id", Bill.delete);
  router.patch("/:id", Bill.update);
  app.use("/bills", router);
};
