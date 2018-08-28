var express = require('express');
var rp = require('request-promise');
var db = require('../data/db.js')
var queries = require('../data/db-queries.js')


var home = express.Router(); 
module.exports = home;

 home.get('/', queries.asyncMiddleware,(req, res)=>{
           rp("https://api.themoviedb.org/3/movie/now_playing?api_key="+process.env.API_KEY+"&page=1") 
                 .then(body=>{
                        var results = JSON.parse(body).results.slice(0,5);
                        var nowPlaying = [];
                        var fullURL = req.protocol + '://' + req.get('host') +req.url;
                        results.forEach(element=>{nowPlaying.push({"vote_count":element.vote_count,"vote_average":element.vote_average,"id":element.id,"title":element.title,"poster":"https://image.tmdb.org/t/p/w185/"+element.poster_path});});
                        return res.render("index",{"nowPlaying": nowPlaying, "reviews":res.locals.reviews,"url":fullURL,"users":res.locals.users,"req":req});
                  }) 
                 .catch(error=>{res.sendStatus(404); return;})
 });

 home.get('/About', queries.asyncMiddleware,(req, res)=>{
           res.render("about",{"req":req})
 });

 
 