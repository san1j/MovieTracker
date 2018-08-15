var express = require('express');
var rp = require('request-promise');
var reviews = require('../data/reviews.json');
var users = require('../data/users.json')
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });


var movies = express.Router();
module.exports = movies;
  
movies.get("/",(req,res)=>{
   rp("https://api.themoviedb.org/3/movie/popular?api_key="+process.env.API_KEY+"&language=en-US&page=1")
    .then(body => {
          var results = JSON.parse(body).results.slice(0,8);
          var popular = [];
          results.forEach(element=>{popular.push({"vote_count":element.vote_count,"vote_average":element.vote_average,"id":element.id,"title":element.title,"poster":"https://image.tmdb.org/t/p/w300/"+element.poster_path});});
          res.render("movies",{popular: popular, reviews:reviews,"users":users,"req":req});
  })
   .catch(error => {
      res.sendStatus(404); return;
  });
  });
 

movies.get("/:id",(req,res)=>{
     rp("https://api.themoviedb.org/3/movie/"+req.params.id+"?api_key="+process.env.API_KEY+"&language=en-US")
       .then(body => {
              var movieId = JSON.parse(body);
              var movieInfo = [];
              var movie_reviews =  reviews.filter(obj=> obj.movie_id == req.params.id);
              movieInfo.push({"title":movieId.title,"id":movieId.id,"overview":movieId.overview,"production_companies":movieId.production_companies[0].name,"production_countries":movieId.production_countries[0].name,"tagline":movieId.tagline,"runtime":movieId.runtime,"poster_path":"https://image.tmdb.org/t/p/w185/"+movieId.poster_path,"release_date":movieId.release_date,"vote_average":movieId.vote_average,"vote_count":movieId.vote_count});
              res.render("movieReview",{"movieInfo":movieInfo,"movie_reviews":movie_reviews,"req":req});
        })
       .catch(error => {
          res.sendStatus(404); return;
      });
   });