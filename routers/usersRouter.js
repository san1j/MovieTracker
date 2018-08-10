var express = require('express');
var reviews = require('../data/reviews.json')
var userdata = require('../data/users.json')

var users= express.Router();
module.exports = users;

users.get("/",(req,res)=>{
    res.render("users",{"reviews":reviews,"users":userdata});
  });