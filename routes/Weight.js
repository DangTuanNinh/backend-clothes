module.exports = (app) => {
  var Weight = require("../controller/Weight");
  var router = require("express").Router();

  router.post("/", Weight.create);
  router.get("/", Weight.findall);
  router.get("/:id", Weight.findone);
  router.delete("/:id", Weight.delete);
  router.patch("/:id", Weight.update);
  app.use("/weights", router);
};
