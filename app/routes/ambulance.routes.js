module.exports = app => {
  const ambulance = require("../controllers/ambulance.controller.js");

  var router = require("express").Router();

  // Create a new ambulance
  router.post("/", ambulance.create);

  // Retrieve all ambulance
  router.get("/", ambulance.findAll);
 
  // Retrieve a single ambulance with id
  router.get("/:id", ambulance.findOne);

  // Update a ambulance with id
  router.put("/:id", ambulance.update);

  // Delete a ambulance with id
  router.delete("/:id", ambulance.delete);

  // Delete all ambulance
  router.delete("/", ambulance.deleteAll);

  app.use('/api/ambulance', router);
};
