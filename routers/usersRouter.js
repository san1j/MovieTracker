var express = require('express');
var reviews = require('../data/reviews.json')
var userdata = require('../data/users.json')
var rp = require('request-promise');

var users= express.Router();
module.exports = users;

users.get("/",(req,res)=>{
    res.render("users",{"reviews":reviews,"users":userdata});
  });

users.get('/:user',(req, res)=>{
  var user_reviews = reviews.filter(user => user.user_name == req.params.user);
  res.render("userPage",{"user_reviews":user_reviews});
 });