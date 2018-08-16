var express = require('express');

var signUp= express.Router();
module.exports = signUp;
  
signUp.get("/",(req,res)=>{
    res.render("signUp",{"req":req,"errors":[]});
  });

signUp.post("/",(req,res)=>{
     req.checkBody("email","Please enter a valid email address").isEmail();
     req.checkBody('username',"Username must be at least 2 characters in length").isLength({ min: 2 })
     req.checkBody('password',"Password must be at least 5 characters in length").isLength({ min: 5 });
     //make sure to check username is unique and alert if username is taken
     var errors = req.validationErrors();
     if (errors) {
          res.render("signUp",{"req":req,"errors":errors});
          return;
        } else {
          res.redirect("login/success");
        }
   });