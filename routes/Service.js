module.exports = (app) => {
  var Service = require("../controller/Service");
  var router = require("express").Router();

  router.post("/", Service.create);
  router.get("/", Service.findall);
  router.get("/getServiceHome", Service.getServiceHome);
  router.get("/:id", Service.findone);
  router.delete("/:id", Service.delete);
  router.patch("/:id", Service.update);
  app.use("/services", router);
};
