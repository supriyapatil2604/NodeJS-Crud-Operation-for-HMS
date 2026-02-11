module.exports = app => {
    const user = require("../controllers/user.controller.js");
    const { authJwt } = require("../middleware");

    var router = require("express").Router();
  
    // Create a new User
    router.post("/", user.create, [authJwt.verifyToken]);
  
    // Retrieve all user
    router.get("/", user.findAll, [authJwt.verifyToken]);
  
    // Retrieve all published user
    router.get("/published", user.findAllPublished);
  
    // Retrieve a single User with id
    router.get("/:id", user.findOne);
  
    // Retrieve a single User with attribute name
    router.get("/attr", user.findOneAttr);
    // Update a User with id
    router.put("/:id", user.update);
  
    // Delete a User with id
    router.delete("/:id", user.delete);
  
    // Delete all user
    router.delete("/", user.deleteAll);
  
    app.use('/api/user', router);
  };
  