module.exports = (app) => {
  var Contact = require("../controller/Contact");
  var router = require("express").Router();

  router.post("/", Contact.create);
  router.get("/", Contact.findall);
  router.get("/:id", Contact.findone);
  router.delete("/:id", Contact.delete);
  router.patch("/:id", Contact.update);
  app.use("/contacts", router);
};
