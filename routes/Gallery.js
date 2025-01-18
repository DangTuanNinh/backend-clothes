module.exports = (app) => {
  var Gallery = require("../controller/Gallery");
  var router = require("express").Router();

  router.post("/", Gallery.create);
  router.get("/", Gallery.findall);
  router.get("/getGalleryHome", Gallery.getGalleryHome);
  router.get("/:id", Gallery.findone);
  router.delete("/:id", Gallery.delete);
  router.patch("/:id", Gallery.update);
  app.use("/galleries", router);
};
