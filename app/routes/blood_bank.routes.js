module.exports = app => {
  const blood_bank = require("../controllers/blood_bank.controller.js");

  var router = require("express").Router();

  // Create a new blood_bank
  router.post("/", blood_bank.create);

  // Retrieve all blood_bank
  router.get("/", blood_bank.findAll);

  // Retrieve a single blood_bank with id
  router.get("/:id", blood_bank.findOne);

  // Update a blood_bank with id
  router.put("/:id", blood_bank.update);

  // Delete a blood_bank with id
  router.delete("/:id", blood_bank.delete);

  // Delete all blood_bank
  router.delete("/", blood_bank.deleteAll);

  app.use('/api/blood_bank', router);
};
