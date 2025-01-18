module.exports = (app) => {
  var Category = require("../controller/Category");
  var router = require("express").Router();

  router.post("/", Category.create);
  router.get("/", Category.findall);
  router.get("/:id", Category.findone);
  router.delete("/:id", Category.delete);
  router.patch("/:id", Category.update);
  app.use("/categorys", router);
};
