var express = require('express');

var signUp= express.Router();
module.exports = signUp;
  
signUp.get("/",(req,res)=>{
    res.render("signUp");
  });

signUp.post("/",(req,res)=>{
    console.log("here");
    res.send("send post");
  });