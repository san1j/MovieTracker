var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var users= require('./data/users.json')

 

passport.use(new LocalStrategy(
  {passReqToCallback: true},
  function(req,username, password, done) {
     var user  = users.filter(obj=> obj.name == username);
        if (!user || user.length==0||user[0].password !== password) {
         return done(null, false);
      }
      return done(null, user);
   }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});