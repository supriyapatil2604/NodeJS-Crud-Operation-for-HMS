const express = require("express");
const jwt = require("jsonwebtoken");
const fs =require('fs');

const privateKey = fs.readFileSync('private.key', 'utf8');
const publicKey = fs.readFileSync('public.key', 'utf8');

  var payload ={};
  payload.username="Raghav";
  payload.password="Pawar@123";
  payload.email="raghav@gmail.com";
  payload.id=5;
 
  console.log("Payload", JSON.stringify(payload));

  var iss = "Supriya Developer";
  var sub = 'sp@gmail.com';
  var aud = 'www.sp.com';

  var exp = '24h';

  var signOption = {
    expiresIn : exp,
    algorithm : 'RS256'
  }

  console.log("Options", JSON.stringify(signOption));
  var token = jwt.sign(payload,privateKey, signOption);
  console.log("---------------------------------------------------------------");
  console.log("source  == "+token);
  console.log("---------------------------------------------------------------");


  //Desination source code

  var verifyOption = {
    expiresIn : exp,
    algorithm : ['RS256']
  };

  var verified = jwt.verify(token, publicKey,verifyOption);
  console.log(verified);
/**
 * Decode
 */

var decoded = jwt.decode(token,{complete: true});
console.log("decoded Header"+JSON.stringify(decoded.header));
console.log("decoded Payload"+JSON.stringify(decoded.payload));