var express = require('express');
const  {check}  = require('express-validator/check');
var db = require('../data/db.js')
var queries = require('../data/db-queries.js')
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var bcrypt = require('bcrypt');

 
var signUp= express.Router();
module.exports = signUp;
 
  
signUp.get("/",(req,res)=>{
    res.render("signUp",{"req":req,"errors":[]});
  });


signUp.post("/",urlencodedParser,check('username').custom(async function (value,req,res) {
     let user =  await queries.checkUser(value).catch(error=>{res.sendStatus(404); return;});
     if (user !== null) throw new Error('Username is taken')
     }),async (req,res)=>{
     req.checkBody("email","Please enter a valid email address").isEmail();
     req.checkBody('username',"Username must be at least 2 characters in length").isLength({ min: 2 })
     req.checkBody('password',"Password must be at least 5 characters in length").isLength({ min: 5 });
     var errors = req.validationErrors(); 
     if(errors == false) {
       const saltRounds = 10; 
       bcrypt.hash(req.body.password, saltRounds).then(async hash=>{
       var add = await queries.addUser(req.body.username,hash,req.body.email)})
       return res.redirect("login/success");
     }
      else return res.render("signUp",{"req":req,"errors":errors});
       
           
   });

 