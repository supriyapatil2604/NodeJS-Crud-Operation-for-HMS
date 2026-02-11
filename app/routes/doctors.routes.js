module.exports = app => {
  const doctors = require("../controllers/doctors.controller.js");

  var router = require("express").Router();

  // Create a new doctors
  router.post("/", doctors.create);

  // Retrieve all doctors
  router.get("/", doctors.findAll);
 
  // Retrieve a single doctors with id
  router.get("/:id", doctors.findOne);

  // Update a doctors with id
  router.put("/:id", doctors.update);

  // Delete a doctors with id
  router.delete("/:id", doctors.delete);

  // Delete all doctors
  router.delete("/", doctors.deleteAll);

  app.use('/api/doctors', router);
};
