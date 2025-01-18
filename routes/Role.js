module.exports = (app) => {
  var Role = require("../controller/Role");
  var router = require("express").Router();

  router.post("/", Role.create);
  router.get("/", Role.findall);
  router.get("/:id", Role.findone);
  router.delete("/:id", Role.delete);
  router.patch("/:id", Role.update);
  app.use("/roles", router);
};
