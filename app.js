
var express = require('express');
var movies = require('./routers/movieRouter');
var login = require('./routers/loginRouter');
var signUp = require('./routers/signUpRouter');
var home = require('./routers/homeRouter');
var users = require('./routers/usersRouter');




var rp = require('request-promise');
var app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.static('views'));


app.use("/",home);
app.use("/movies",movies);
app.use("/users",users);

app.use("/login",login);
//auth with passport else resend to login
app.use("/signUp",signUp);

var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

