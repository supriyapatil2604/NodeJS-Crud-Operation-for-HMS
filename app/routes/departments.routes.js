module.exports = app => {
  const departments = require("../controllers/departments.controller.js");

  var router = require("express").Router();

  // Create a new Departments
  router.post("/", departments.create);

  // Retrieve all departments
  router.get("/", departments.findAll);

  // Retrieve a single Departments with id
  router.get("/:id", departments.findOne);

  // Update a Departments with id
  router.put("/:id", departments.update);

  // Delete a Departments with id
  router.delete("/:id", departments.delete);

  // Delete all departments
  router.delete("/", departments.deleteAll);

  app.use('/api/departments', router);
};
