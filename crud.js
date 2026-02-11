console.log("Raghav Rohit Pawar.");
//const http = require("http");
const express = require("express");
const app = express();

const router = express.Router();

const TutorialsController = require('../Controllers/Tutorials.Controller');

//Get a list of all products
router.get('/', TutorialsController.getAllProducts);

app.get('/api/get',(req,res)=>{
//res.send("Hello GET Request");
const status = {
    "Status": "Running"
 };
 
 res.send(status);
});
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hospital_mgmt"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
 
  con.query("SELECT * FROM customers", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });

});
app.listen(3000, () => console.log("executed successfully"));

/*app.post();
app.put();
app.delete();*/