module.exports = app => {
  const billing = require("../controllers/billing.controller.js");

  var router = require("express").Router();

  // Create a new billing
  router.post("/", billing.create);

  // Retrieve all billing
  router.get("/", billing.findAll);
 
  // Retrieve a single billing with id
  router.get("/:id", billing.findOne);

  // Update a billing with id
  router.put("/:id", billing.update);

  // Delete a billing with id
  router.delete("/:id", billing.delete);

  // Delete all billing
  router.delete("/", billing.deleteAll);

  app.use('/api/billing', router);
};
