module.exports = app => {
  const cleaning_service = require("../controllers/cleaning_service.controller.js");

  var router = require("express").Router();

  // Create a new cleaning_service
  router.post("/", cleaning_service.create);

  // Retrieve all cleaning_service
  router.get("/", cleaning_service.findAll);

  // Retrieve all published cleaning_service
  router.get("/published", cleaning_service.findAllPublished);

  // Retrieve a single cleaning_service with id
  router.get("/:id", cleaning_service.findOne);

  // Update a cleaning_service with id
  router.put("/:id", cleaning_service.update);

  // Delete a cleaning_service with id
  router.delete("/:id", cleaning_service.delete);

  // Delete all cleaning_service
  router.delete("/", cleaning_service.deleteAll);

  app.use('/api/cleaning_service', router);
};
