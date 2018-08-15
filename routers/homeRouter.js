var express = require('express');
var rp = require('request-promise');
var reviews = require('../data/reviews.json')
var userdata = require('../data/users.json')


var home = express.Router();
module.exports = home;

home.get('/', (req, res)=>{
  rp("https://api.themoviedb.org/3/movie/now_playing?api_key="+process.env.API_KEY+"&page=1")
    .then(body => {
          var results = JSON.parse(body).results.slice(0,6);
          var nowPlaying = [];
          var fullURL = req.protocol + '://' + req.get('host') +req.url;
          results.forEach(element=>{nowPlaying.push({"vote_count":element.vote_count,"vote_average":element.vote_average,"id":element.id,"title":element.title,"poster":"https://image.tmdb.org/t/p/w185/"+element.poster_path});});
          res.render("index",{"nowPlaying": nowPlaying, "reviews":reviews,"url":fullURL,"users":userdata,"req":req});
    })
   .catch(error => {
      res.sendStatus(404); return;
  });
});

