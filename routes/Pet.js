module.exports = (app) => {
  var Pet = require("../controller/Pet");
  var router = require("express").Router();

  router.post("/", Pet.create);
  router.get("/", Pet.findall);
  router.get("/countTypePet", Pet.countTypePet);
  // router.get("/checkPet", Pet.checkPet);
  router.get("/:id", Pet.findone);
  router.get("/getPetUser/:id", Pet.getPetUser);
  router.delete("/:id", Pet.delete);
  router.patch("/:id", Pet.update);
  router.patch("/update/quantity", Pet.updateQuantity);
  app.use("/pets", router);
};
