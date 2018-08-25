var express = require('express');
var db = require('../data/db.js')
var bodyParser = require('body-parser');
var rp = require('request-promise');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var queries = require('../data/db-queries.js')

var api = express.Router(); 
module.exports = api;

// ****** CRUD operations for users**********
 //get all users
api.get("/users",async (req,res)=>{
  let users = await db.getdb.collection("users").find({}).project({ username: 1, movies_watched: 1,review_count:1 }).toArray();
  res.json(users)
})
//get user by username
api.get("/users/:username",async (req,res)=>{
  let user = await db.getdb.collection("users").find({"username":req.params.username}).project({ username: 1, movies_watched: 1,review_count:1 }).toArray();
  res.json(user)
})
//add a new user
api.post("/users/:username/add",urlencodedParser,async (req,res)=>{
  if(!req.body.username || ! req.body.password || ! req.body.email) return res.send("Please provide a username, password and email")
  let addUser = await db.getdb.collection("users").insertOne({"username":req.body.username,"password":req.body.password,"email":req.body.email, "movies_watched":0,"review_count":0,"movies_watched_titles":[],"favorites":[],
   "recently_watched":[]})
  res.send("User successfully added!")
})
//delete a user
api.delete("/users/:username",async (req,res)=>{
  let deleteUser = await db.getdb.collection("users").deleteOne({"username":req.params.username});
  res.send("user deleted")
})




// ************ CRUD operations for diary entries ****************

//get all diary entries for a user
api.get("/users/:username/all",async (req,res)=>{
  let allEntries = await db.getdb.collection("users").find({"username":req.params.username}).project({movies_watched_titles: 1 }).toArray();
  res.json(allEntries)
})
//post a new diary entry
api.post("/users/:username/diary",urlencodedParser,async (req,res)=>{
  if(!req.body.movie_title || ! req.body.timestamp || ! req.body.favorite) return res.send("Please provide a movie title, date watched and favorite(true or false)")
  if(req.body.timestamp && isNaN(Date.parse(req.body.timestamp))) return res.send("date must be valid")
  if(req.body.favorite && req.body.favorite == 'true' || req.body.favorite == 'false' ) { 
   let addDiary = await db.getdb.collection("users").findOneAndUpdate({"username":req.params.username},{$addToSet: {"movies_watched_titles":  { $each:[{"movie_title":req.body.movie_title,"timestamp":req.body.timestamp,"favorite":req.body.favorite}] } }})
   if(addDiary.lastErrorObject.updatedExisting == false) return res.send("looks like the username doesn't exist");
   return res.send("Entry successfully added!")
  }
   res.send("favorite must either be true or false")
})
//edit a diary entry
api.put("/users/:username/diary/:title",urlencodedParser,async (req,res)=>{
  if (!req.params.title) return res.send("Title must be provided") 
  if(req.body.timestamp && isNaN(Date.parse(req.body.timestamp))) return res.send("date must be valid")
   if(req.body.favorite && req.body.favorite == 'true' || req.body.favorite == 'false' ) { 
     let editDiary =  await db.getdb.collection("users").findOneAndUpdate({"username":req.params.username,"movies_watched_titles.movie_title":new RegExp(req.params.title,'i','s')},{$set: {"movies_watched_titles.$.movie_title":req.params.title,"movies_watched_titles.$.timestamp":req.body.timestamp,"movies_watched_titles.$.favorite":req.body.favorite }});
     return res.json("success")
     }
    res.send("favorite must either be true or false")
})
//delete a diary entry
api.delete("/users/:username/delete/:title",async (req,res)=>{
  let deleteDiary =  await db.getdb.collection("users").findOneAndUpdate({"username":req.params.username,"movies_watched_titles.movie_title":new RegExp(req.params.title,'i','s')},{$pull: { movies_watched_titles: { movie_title:new RegExp(req.params.title,'i','s')}}})
  if(deleteDiary.lastErrorObject.updatedExisting == false) return res.send("looks like the username or title doesn't exist");
  res.send("successfully deleted diary entry")
})




// ****************** CRUD operations for movie reviews ***************

//get all reviews by a user
api.get("/users/:username/reviews/all",async (req,res)=>{
  let allReviews = await db.getdb.collection("reviews").find({"user_name":req.params.username}).toArray();
  res.json(allReviews)
})

//add a new review for a movie
api.post("/users/:username/review/:movieId", (req,res)=>{
  if(!req.params.movieId || !req.body.review_body|| Number.isInteger(req.params.movieId) == false) return res.send("Please provide a movieID and review")
  let currentDate = new Date();
  let date = currentDate.getFullYear()+"-"+(currentDate.getMonth()+1)+"-"+currentDate.getDate();
  rp("https://api.themoviedb.org/3/movie/"+req.params.movieId+"?api_key="+process.env.API_KEY)
    .then(async (body) => {let addReview = await db.getdb.collection("reviews").insertOne({"user_name":req.params.username,"movie_id":req.params.movieId,"movie_poster":"https://image.tmdb.org/t/p/w92/"+body.poster_path,"movie_title":body.title,"review_body":req.body.review_body, "timestamp":date})
                          return res.send("successfully added review")
                          })
    .catch(error=> res.send("something went wrong"))
})

//edit a movie review
api.put("/users/:username/review/:id",async (req,res)=>{
    if(!req.params.id || !req.body.review_body) return res.send("Please provide a movieID and a new review")
    let editReview = await db.getdb.collection("reviews").findOneAndUpdate({"user_name":req.params.username,"movie_id":req.params.id},{$set:{review_body:req.body.review_body}})
    if(editReview.lastErrorObject.updatedExisting == false) return res.send("looks like the username or movieId doesn't exist");
    res.send("successfully updated review")
})

//delete a movie review
api.delete("/users/:username/review/:id",async (req,res)=>{
    if(!req.params.id) return res.send("Please provide a movieID")
    let deleteReview = await db.getdb.collection("reviews").deleteOne({user_name:req.params.username,movie_id:req.params.id});
    res.send("review deleted")
})



 