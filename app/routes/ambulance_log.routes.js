module.exports = app => {
  const ambulance_log = require("../controllers/ambulance_log.controller.js");

  var router = require("express").Router();

  // Create a new Ambulance Log
  router.post("/", ambulance_log.create);

  // Retrieve all Ambulance Log
  router.get("/", ambulance_log.findAll);

  // Retrieve a single Ambulance Log with id
  router.get("/:id", ambulance_log.findOne);

  // Update a Ambulance Log with id
  router.put("/:id", ambulance_log.update);

  // Delete a Ambulance Log with id
  router.delete("/:id", ambulance_log.delete);

  // Delete all Ambulance Log
  router.delete("/", ambulance_log.deleteAll);

  app.use('/api/ambulance_log', router);
};
