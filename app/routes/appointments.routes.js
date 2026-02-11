module.exports = app => {
  const appointments = require("../controllers/appointments.controller.js");

  var router = require("express").Router();

  // Create a new Appointments
  router.post("/", appointments.create);

  // Retrieve all Appointments
  router.get("/", appointments.findAll);

  // Retrieve a single Appointments with id
  router.get("/:id", appointments.findOne);

  // Update a Appointments with id
  router.put("/:id", appointments.update);

  // Delete a Appointments with id
  router.delete("/:id", appointments.delete);

  // Delete all Appointments
  router.delete("/", appointments.deleteAll);

  app.use('/api/appointments', router);
};
