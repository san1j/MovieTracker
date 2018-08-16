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

users.post('/:user/diary',urlencodedParser,(req, res)=>{
 reviews[0].movies_watched_titles.unshift({"movie_title":req.body.title,"timestamp":req.body.date,"favorite":req.body.favorite});
  //movie_watched count++//add to recently watched no duplciates in db for movie Id //add bcrypt
 reviews[0].movies_watched++;
 res.redirect("/users/"+req.params.user+"/all")
});

users.post('/:user/add/:id',urlencodedParser,(req, res)=>{
var poster_path = req.body.poster_path.replace("185","92");
 res.render("addDiary",{"req":req,"poster_path":poster_path,"title":req.body.title})
});

users.post('/:user/review/:id',urlencodedParser,(req, res)=>{
var poster_path = req.body.poster_path.replace("185","92");
  //make sure to also get he user_id"
var currentDate = new Date()
var fullDate =currentDate.getMonth() + 1+"/"+currentDate.getDate()+"/"+currentDate.getFullYear();
  reviews.push({"user_name":req.params.user,
    "movie_id":req.body.movie_id,
    "movie_poster" : poster_path,
    "movie_title": req.body.title,
    "review_body":req.body.review});
 res.send(reviews)
});

users.post('/:user/favorite/:id',urlencodedParser,(req, res)=>{
  var user =  reviews.filter(user => user.user_name == req.params.user);
  var poster_path = req.body.poster_path.replace("185","92")
  if(user.length !== 0 ) user[0].favorites.unshift(poster_path); user[0].favorites.pop();
  res.redirect("/movies/"+req.params.id)
 });