var db = require('./db.js')

module.exports.asyncMiddleware= async function asyncMiddleware (req,res,next)  {
  let dbObj = db.getdb;
  res.locals.users = await dbObj.collection("users").find({}).sort( {review_count: -1 } ).limit(10).toArray().catch(error=>{res.sendStatus(404); return;});
  res.locals.reviews= await dbObj.collection("reviews").find({}).sort( {_id: -1 } ).limit(5).toArray().catch(error=>{res.sendStatus(404); return;});
  next();
}

module.exports.reviewMiddleware = async (req,res,next) => {
  let dbObj = db.getdb;
  let movieReviews = await dbObj.collection("reviews").find({"movie_id":req.params.id}).sort( {"_id": -1 } ).limit(6).toArray().catch(error=>{res.sendStatus(404); return;});
  res.locals.movieIdReviews = movieReviews;
  next();
}

module.exports.checkUser = async function checkUser(username,res) {
  let dbObj = db.getdb;
  return  await dbObj.collection("users").findOne({"username":username}).catch(error=>{res.sendStatus(404); return;});
  }

module.exports.addUser = async function addUser(username,password,email,res) {
  let dbObj = db.getdb;
  let addedUser = await dbObj.collection("users").insertOne({"username":username,"password":password,"email":email, "movies_watched":0,"review_count":0,"movies_watched_titles":[],"favorites":[],
   "recently_watched":[]}).catch(error=>{res.sendStatus(404); return;});
  }

module.exports.userReviews  = async function userReviews(username,res) {
  let dbObj = db.getdb;
  return  [await dbObj.collection("reviews").find({"user_name":username}).sort({"_id":-1}).limit(4).toArray(),await dbObj.collection("users").findOne({"username":username})];
  }

 module.exports.userDiary  = async function userDiary(username,res) {
  let dbObj = db.getdb;
  return  await dbObj.collection("users").findOne({"username":username}).catch(error=>{res.sendStatus(404); return;});
  }
 
 module.exports.userReviewsAll = async function userReviewsAll(username,res) {
  let dbObj = db.getdb;
  return  await dbObj.collection("reviews").find({"user_name":username}).sort({"_id":-1}).limit(6).toArray().catch(error=>{res.sendStatus(404); return;});
  }
 
 module.exports.addReview = async function addReview(user_name,movie_id,movie_poster,movie_title,review_body,timestamp,res) {
  let dbObj = db.getdb;
  let userRev = await dbObj.collection("users").findOneAndUpdate({"username":user_name },{$inc: { "review_count" : 1 }} )
  return await dbObj.collection("reviews").insertOne({"user_name":user_name,"movie_id":movie_id,"movie_poster":movie_poster,"movie_title":movie_title,"review_body":review_body, "timestamp":timestamp}).catch(error=>{res.sendStatus(404); return;});
  }

 
 module.exports.moviesWatched = async function moviesWatched(username,movie_title,timestamp,favorite,poster,res) {
  let dbObj = db.getdb;
  return await dbObj.collection("users").findOneAndUpdate({"username":username },{$addToSet: {"movies_watched_titles":  { $each:[{"movie_title":movie_title,"timestamp":timestamp,"favorite":favorite}] } },$inc: { "movies_watched" : 1 },$push: {"recently_watched": { $each:[poster],$slice: -4}} }).catch(error=>{res.sendStatus(404); return;})
 }
 
 
 module.exports.addFavorite = async function addFavorite(username,poster,res) {
  let dbObj = db.getdb;
  return await dbObj.collection("users").findOneAndUpdate({"username":username },{$push: {"favorites": { $each:[poster],$slice: -4}} }).catch(error=>{res.sendStatus(404); return;});
 }
 
  module.exports.addRecommendations = async function addRecommendations(username,movie,res) {
  let dbObj = db.getdb;
  return await dbObj.collection("users").findOneAndUpdate({"username":username },{$push: {"recommendations": { $each:[{movie_id:movie.movie_id,"poster_path":movie.poster_path}],$slice: -4}} }).catch(error=>{res.sendStatus(404); return;});
 }
 
 module.exports.deleteDiary = async function deleteDiary(username,title,timestamp,favorite,res) {
  let dbObj = db.getdb;
  return await dbObj.collection("users").findOneAndUpdate({"username":username},{ $pull: { movies_watched_titles: { movie_title:title, timestamp:timestamp, favorite:favorite }}}).catch(error=>{res.sendStatus(404); return;});
 }
 
  module.exports.deleteReview = async function deleteReview(username,movie_id,movie_title,review_body,res) {
  let dbObj = db.getdb;
  return await dbObj.collection("reviews").deleteOne({"user_name":username,"movie_id":movie_id,"movie_title":movie_title,"review_body":review_body}).catch(error=>{res.sendStatus(404); return;});
 }
 
 