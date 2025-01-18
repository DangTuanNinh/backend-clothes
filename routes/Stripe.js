module.exports = (app) => {
  var Stripe = require("../controller/Stripe");
  var router = require("express").Router();

  router.post("/", Stripe.payment);

  app.use("/payment", router);
};
