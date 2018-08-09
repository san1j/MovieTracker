var express = require('express');

var login = express.Router();
module.exports = login;
  
login.get("/",(req,res)=>{
    res.render("login");
  });

login.post("/",(req,res)=>{
    console.log("here");
    res.send("send");
  });