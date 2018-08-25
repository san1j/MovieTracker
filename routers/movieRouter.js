
var express = require('express');
var rp = require('request-promise');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var db = require('../data/db.js')
var queries = require('../data/db-queries.js')

 
var movies = express.Router();
module.exports = movies;

    
movies.get("/",queries.asyncMiddleware,(req,res)=>{
   rp("https://api.themoviedb.org/3/movie/popular?api_key="+process.env.API_KEY+"&language=en-US&page=1")
    .then(body => {
          var results = JSON.parse(body).results.slice(0,8);
          var popular = [];
          results.forEach(element=>{popular.push({"vote_count":element.vote_count,"vote_average":element.vote_average,"id":element.id,"title":element.title,"poster":"https://image.tmdb.org/t/p/w300/"+element.poster_path});});
          return res.render("movies",{popular: popular, reviews:res.locals.reviews,"users":res.locals.users,"req":req});
  })
   .catch(error => {
      res.sendStatus(404); return;
  });
  }); 

movies.post("/search",(req,res)=>{
       rp("https://api.themoviedb.org/3/search/movie?api_key=3ab182f50419114d78023d730edab003&query="+req.body.title+"&page=1")
        .then(body => {
            var search = JSON.parse(body).results.slice(0,10);
            var search_results = []
            search.forEach(movie=>search_results.push({"movie_id":movie.id,"poster_path":"https://image.tmdb.org/t/p/w92/"+movie.poster_path,"title":movie.title,"original_title":movie.original_title,"release_date":movie.release_date}))
            return res.render("searchMovie",{"req":req,"search_term":req.body.title,"search_results":search_results} )
          
       })
       .catch(error => {
          res.sendStatus(404); return;
      });
  
  });
 

movies.get("/:id",queries.reviewMiddleware,(req,res)=>{
     rp("https://api.themoviedb.org/3/movie/"+req.params.id+"?api_key="+process.env.API_KEY+"&language=en-US")
       .then(body => {
              var movieId = JSON.parse(body);
              var movieInfo = [];
               movieInfo.push({"title":movieId.title,"id":movieId.id,"overview":movieId.overview,"production_companies":movieId.production_companies[0].name,"production_countries":movieId.production_countries[0].name,"tagline":movieId.tagline,"runtime":movieId.runtime,"poster_path":"https://image.tmdb.org/t/p/w185/"+movieId.poster_path,"release_date":movieId.release_date,"vote_average":movieId.vote_average,"vote_count":movieId.vote_count});
              return res.render("movieReview",{"movieInfo":movieInfo,"movie_reviews":res.locals.movieIdReviews,"req":req});
        })
       .catch(error => {
          res.sendStatus(404); return;
      });
   });