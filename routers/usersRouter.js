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
  user_reviews = user_reviews.splice(0,4);
  res.render("userPage",{"user_reviews":user_reviews});
 });

users.get('/:user/all',(req, res)=>{
  var user_diary =  reviews.filter(user => user.user_name == req.params.user);
  user_diary = user_diary.splice(0,1);
   res.render("diary",{"user_diary":user_diary});
 });


