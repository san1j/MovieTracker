var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
//var users = require('./data/users.json')
var db = require('./data/db.js');
var bcrypt = require('bcrypt');

async function getUser (username) {
  let dbObj = db.getdb;
  return await dbObj.collection("users").findOne({"username":username});
 }

passport.use(new LocalStrategy({passReqToCallback: true},
  async function(req,username, password, done) {
     var user  = await getUser(username);
     if(!user) return done(null,false);
     bcrypt.compare(password, user.password).then(result=>{
        if (result == true) return done(null, user);
        else return done(null, false)})
     }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
