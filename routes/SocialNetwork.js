module.exports = (app) => {
  var SocialNetwork = require("../controller/SocialNetwork");
  var router = require("express").Router();

  router.post("/", SocialNetwork.create);
  router.get("/", SocialNetwork.findall);
  router.get("/:id", SocialNetwork.findone);
  router.delete("/:id", SocialNetwork.delete);
  router.patch("/:id", SocialNetwork.update);
  app.use("/socialNetworks", router);
};
