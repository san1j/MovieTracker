var express = require('express');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;


var login = express.Router();
module.exports = login;
  
login.get("/login",(req,res)=>{
    res.render("login", {"req":req,"success":"","error":false});
   });

login.get("/login/error",(req,res)=>{
     res.render("login",{"req":req,"success":"","error":true});
    });

login.get("/login/success",(req,res)=>{
     res.render("login",{"req":req,"success":"Sign up successful. Please login.","error":false});
    });

login.post("/login",passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login/error',
                                   failureFlash: false }));

login.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});