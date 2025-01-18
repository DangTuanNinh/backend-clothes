module.exports = (app) => {
  var New = require("../controller/New");
  var router = require("express").Router();

  router.post("/", New.create);
  router.get("/", New.findall);
  router.get("/newHome", New.newsHome);
  router.get("/:id", New.findone);
  router.get("/otherNews/:id", New.findOtherNews);
  router.delete("/:id", New.delete);
  router.patch("/:id", New.update);

  app.use("/news", router);
};