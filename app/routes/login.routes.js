module.exports = app => {
    const loginCtr = require("../controllers/login.controller");
    const { authJwt } = require("../middleware");
    var router = require("express").Router();
  
    router.post("/", [authJwt.verifyToken], loginCtr.login);
    console.log("after login");
    
    app.use('/api/login', router);
};