var express = require('express');
var rp = require('request-promise');
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var db = require('../data/db.js')
var queries = require('../data/db-queries.js')

 
var users= express.Router();
module.exports = users;

users.get("/", queries.asyncMiddleware,(req,res)=>{
    res.render("users",{"reviews":res.locals.reviews,"users":res.locals.users,"req":req});
  });

users.get('/:user',async (req, res)=>{
  var user_reviews = await queries.userReviews(req.params.user).catch(error=>{res.sendStatus(404); return;});
  res.render("userPage",{"user_reviews":user_reviews[0],"users":user_reviews[1],"req":req});
 });

users.get('/:user/all',async (req, res)=>{
  var user_diary = await queries.userDiary(req.params.user).catch(error=>{res.sendStatus(404); return;});
  res.render("diary",{"user_diary":user_diary ,"req":req});
 });

users.get('/:user/reviews/all',async (req, res)=>{
   var user_review =  await queries.userReviewsAll(req.params.user).catch(error=>{res.sendStatus(404); return;})
   res.render("addReview",{"req":req,"user_reviews":user_review});
  });

users.post('/:user/diary',urlencodedParser,async (req, res)=>{
  if(req.body.favorite == null) req.body.favorite = "false";
  var movies_watched = await queries.moviesWatched(req.params.user,req.body.title,req.body.date,req.body.favorite,req.body.poster_path).catch(error=>{res.sendStatus(404); return;});
  res.redirect("/users/"+req.params.user+"/all")
});

users.post('/:user/delete',urlencodedParser,async (req, res)=>{
  var deleteDiaryEntry = await queries.deleteDiary(req.params.user,req.body.title,req.body.timestamp,req.body.favorite).catch(error=>{res.sendStatus(404); return;})
  res.redirect("/users/"+req.params.user+"/all")
});

users.post('/:user/reviews/delete',urlencodedParser,async (req, res)=>{
  var deleteReviewEntry = await queries.deleteReview(req.params.user,req.body.movie_id,req.body.movie_title,req.body.review_body).catch(error=>{res.sendStatus(404); return;})
  res.redirect("/users/"+req.params.user+"/reviews/all")
});

users.post('/:user/add/:id',urlencodedParser,(req, res)=>{
  var poster_path = req.body.poster_path.replace("185","92");
  res.render("addDiary",{"req":req,"poster_path":poster_path,"title":req.body.title})
});

users.post('/:user/review/',urlencodedParser,async (req, res)=>{
  var poster_path = req.body.poster_path.replace("185","92");
  var currentDate = new Date();
  var fullDate = currentDate.getFullYear()+"-"+(currentDate.getMonth()+1)+"-"+currentDate.getDate();
  var addUserReview = await queries.addReview(req.params.user,req.body.movie_id,poster_path,req.body.title,req.body.review,fullDate).catch(error=>{res.sendStatus(404); return;})
  res.redirect("/users/"+req.params.user+"/reviews/all");
});

users.post('/:user/favorite/:id',urlencodedParser,async (req, res)=>{
  var poster_path = req.body.poster_path.replace("185","92")
  var userFavorite = await queries.addFavorite(req.params.user,poster_path);
  let recommendations = await rp("https://api.themoviedb.org/3/movie/"+req.params.id+"/similar?api_key="+process.env.API_KEY+"&page=1").catch(error=>{res.sendStatus(404); return;})
  let movie_rec = JSON.parse(recommendations).results.slice(0,1);
  let movie = {"movie_id":movie_rec[0].id,"poster_path":"https://image.tmdb.org/t/p/w92/"+movie_rec[0].poster_path}
  var userRecommendation = await queries.addRecommendations(req.params.user,movie);
  res.redirect("/movies/"+req.params.id)
 });
 