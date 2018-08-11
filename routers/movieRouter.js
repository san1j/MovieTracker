var express = require('express');
var rp = require('request-promise');
var reviews = require('../data/reviews.json')

var movies = express.Router();
module.exports = movies;
  
movies.get("/",(req,res)=>{
   rp("https://api.themoviedb.org/3/movie/popular?api_key="+process.env.API_KEY+"&language=en-US&page=1")
    .then(body => {
          var results = JSON.parse(body).results.slice(0,8);
          var popular = [];
          results.forEach(element=>{popular.push({"vote_count":element.vote_count,"vote_average":element.vote_average,"poster":"https://image.tmdb.org/t/p/w300/"+element.poster_path});});
          res.render("movies",{popular: popular, reviews:reviews});
  })
   .catch(error => {
      res.sendStatus(404); return;
  });
  });
 
