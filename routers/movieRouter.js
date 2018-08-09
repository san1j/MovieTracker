var express = require('express');

var movies = express.Router();
module.exports = movies;
  
movies.get("/",(req,res)=>{
    res.send("hello");
  });
 
 