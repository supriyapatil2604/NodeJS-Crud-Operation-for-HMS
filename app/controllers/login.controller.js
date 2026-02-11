const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
 console.log("login controllerpage");
const db = require("../models");
const fs =require('fs');

const User = db.login;
const Op = db.Sequelize.Op;
const privateKey = fs.readFileSync('private.key', 'utf8');

/*
exports.register= (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = User.create({ username, email, password });

      res.status(201).json({ user: user, message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error registering user" });
    }
  },
*/
  exports.login= async (req, res) => {
    console.log("login async before const");
     //res.json({ message: "Welcome to Login Controller."+req.body });

    const { email, password } = req.body;
    try {
          const user = await User.findOne({ where: { email } });
      console.log(user);

      if(!user){
        return res.status(401).json({ message: "User not exist!" });
      }
      const hash = bcrypt.hashSync(password, 10);

      bcrypt.compare(password, user.password, function(err, result) {
        if (err) {
          // Handle error
          return;
        }
        if (result === true) {
          // Passwords match
          console.log("Passwords match");
        } else {
          // Passwords do not match
          console.log("Passwords do not match");
          return res.status(401).json({ message: "Invalid credentials" });

        }
      });

      // Generate a JWT token upon successful login
      var token = jwt.sign(JSON.stringify(req.body),privateKey, {algorithm : 'RS256'});
      res.status(200).json({ token: token, message: "User logged successfully" });
    } catch (error) {
      res.status(500).json({ message: "Login failed"+error });
    }
  }