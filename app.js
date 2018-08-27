require('dotenv').config();
var express = require('express');
var movies = require('./routers/movieRouter');
var login = require('./routers/loginRouter');
var signUp = require('./routers/signUpRouter');
var home = require('./routers/homeRouter');
var api = require('./routers/apiRouter');
var users = require('./routers/usersRouter');
var rp = require('request-promise');
var passport = require('passport')
var bodyParser = require('body-parser');
var validator = require('express-validator');
var db = require('./data/db.js')

var LocalStrategy = require('passport-local').Strategy;
var app = express();
require('./auth-init.js');

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.static('views'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());

app.use(require('express-session')({
    secret: 'keyboard cat', resave :false, saveUninitialized : false
        }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api",api)
app.use("/",home);
app.use("/movies",movies);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated())
    return next();
  else
    res.redirect('/login')
}
app.use('/users/:user/add/*', ensureAuthenticated);

app.use("/users",users);

app.use(login);
 
app.use("/signUp",signUp);

module.exports = app;

if(!module.parent){ 

var listener = app.listen(process.env.PORT || 3000, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

}
