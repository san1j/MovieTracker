var express = require('express');
var reviews = require('../data/reviews.json')
var userdata = require('../data/users.json')
var rp = require('request-promise');
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var users= express.Router();
module.exports = users;

users.get("/",(req,res)=>{
    res.render("users",{"reviews":reviews,"users":userdata,"req":req});
  });

users.get('/:user',(req, res)=>{
  var user_reviews = reviews.filter(user => user.user_name == req.params.user);
  user_reviews = user_reviews.splice(0,4);
  res.render("userPage",{"user_reviews":user_reviews,"req":req});
 });

users.get('/:user/all',(req, res)=>{
  var user_diary =  reviews.filter(user => user.user_name == req.params.user);
  user_diary = user_diary.splice(0,1);
  //or use a set
   res.render("diary",{"user_diary":user_diary,"favorites":"dont foget to avoid dup" ,"recently_viewed":"dont fr" ,"req":req});
 });

users.get('/:user/add/:id',(req, res)=>{
 res.render("addDiary",{"req":req})
  });

users.post('/:user/favorite/:id',urlencodedParser,(req, res)=>{
  var user =  reviews.filter(user => user.user_name == req.params.user);
  var poster_path = req.body.poster_path.replace("185","92")
  if(user.length !== 0 ) user[0].favorites.unshift(poster_path); user[0].favorites.pop();
  res.redirect("/movies/"+req.params.id)
 });