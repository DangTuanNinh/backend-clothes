module.exports = (app) => {
  var ImagePet = require("../controller/ImgPet");
  var router = require("express").Router();

  router.post("/", ImagePet.create);
  router.get("/", ImagePet.findall);
  router.get("/:id", ImagePet.findone);
  router.delete("/:id", ImagePet.delete);
  router.patch("/:id", ImagePet.update);
  app.use("/imagePets", router);
};
module.exports = (app) => {
  var ImagePet = require("../controller/ImgPet");
  var router = require("express").Router();

  router.post("/", ImagePet.create);
  router.get("/", ImagePet.findall);
  router.get("/:id", ImagePet.findone);
  router.delete("/:id", ImagePet.delete);
  router.patch("/:id", ImagePet.update);
  app.use("/imagePets", router);
};
