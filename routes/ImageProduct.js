module.exports = (app) => {
  var ImageProduct = require("../controller/ImageProduct");
  var router = require("express").Router();

  router.post("/", ImageProduct.create);
  router.get("/", ImageProduct.findall);
  router.get("/:id", ImageProduct.findone);
  router.delete("/:id", ImageProduct.delete);
  router.patch("/:id", ImageProduct.update);

  app.use("/imageProducts", router);
};
