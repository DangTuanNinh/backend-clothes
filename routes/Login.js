module.exports = (app) => {
  var Login = require("../controller/Login");
  var router = require("express").Router();

  router.post("/", Login.login);

  app.use("/login", router);
};
