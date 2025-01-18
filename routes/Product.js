module.exports = (app) => {
  var Product = require("../controller/Product");
  var router = require("express").Router();

  router.post("/", Product.create);
  router.get("/", Product.findall);
  router.patch("/quantity", Product.updateQuantity);
  router.get("/:id", Product.findone);
  router.delete("/:id", Product.delete);
  router.patch("/:id", Product.update);
  app.use("/products", router);
};
