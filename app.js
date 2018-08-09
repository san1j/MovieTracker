
var express = require('express');
var request = require('request');
var users = require('./data/users.json')
var reviews = require('./data/reviews.json')
var movies = require('./routers/movieRouter');
var login = require('./routers/loginRouter');

var rp = require('request-promise');
var app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.static('views'));


app.get('/', (req, res)=>{
  rp("https://api.themoviedb.org/3/movie/now_playing?api_key="+process.env.API_KEY+"&page=1")
    .then(body => {
          var obj = JSON.parse(body);
          var ten = obj.results.slice(0,6);
          return ten;
  })
    .then(ten => {
          var nowPlaying = [];
          ten.forEach(element=>{nowPlaying.push({"vote_count":element.vote_count,"vote_average":element.vote_average,"poster":"https://image.tmdb.org/t/p/w185/"+element.poster_path});});
          return nowPlaying;
  })
   .then(nowPlaying => {
    res.render("index",{nowPlaying: nowPlaying, reviews:reviews});
    //res.send(nowPlaying);
  })
   .catch(error => {
      res.sendStatus(404); return;
  });
   
});

app.use("/movies",movies);
app.use("/login",login);
//auth with passport else resend to login

var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

