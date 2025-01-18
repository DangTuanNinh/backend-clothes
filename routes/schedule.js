module.exports = (app) => {
  var Schedule = require("../controller/Schedule");
  var router = require("express").Router();

  router.post("/", Schedule.create);
  router.get("/", Schedule.findall);
  router.get("/:id", Schedule.findone);
  router.delete("/:id", Schedule.delete);
  router.patch("/:id", Schedule.update);
  app.use("/Schedules", router);
};
