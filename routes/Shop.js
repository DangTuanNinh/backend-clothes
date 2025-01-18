module.exports = (app) => {
  var Pet = require("../controller/Pet");
  var router = require("express").Router();

  // router.post("/", Shop.create);
  router.get("/", Pet.getAllShop);
  // router.get("/:id", Shop.findone);
  // router.delete("/:id", Shop.delete);
  // router.patch("/:id", Shop.update);
  app.use("/shops", router);
};
