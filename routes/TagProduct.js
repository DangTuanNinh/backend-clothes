module.exports = (app) => {
  var TagProduct = require("../controller/TagProduct");
  var router = require("express").Router();

  router.post("/", TagProduct.create);
  router.get("/", TagProduct.findall);
  router.get("/:id", TagProduct.findone);
  router.delete("/:id", TagProduct.delete);
  router.patch("/:id", TagProduct.update);

  app.use("/tagProducts", router);
};
