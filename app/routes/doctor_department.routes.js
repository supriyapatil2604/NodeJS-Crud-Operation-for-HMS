module.exports = app => {
  const doctor_department = require("../controllers/doctor_department.controller.js");

  var router = require("express").Router();

  // Create a new doctor_department
  router.post("/", doctor_department.create);

  // Retrieve all doctor_department
  router.get("/", doctor_department.findAll);

  // Retrieve all published doctor_department
  router.get("/published", doctor_department.findAllPublished);

  // Retrieve a single doctor_department with id
  router.get("/:id", doctor_department.findOne);

  // Update a doctor_department with id
  router.put("/:id", doctor_department.update);

  // Delete a doctor_department with id
  router.delete("/:id", doctor_department.delete);

  // Delete all doctor_department
  router.delete("/", doctor_department.deleteAll);

  app.use('/api/doctor_department', router);
};
