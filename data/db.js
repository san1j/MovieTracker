var MongoClient = require("mongodb").MongoClient;
var url = process.env.DB_URL;

 
  MongoClient.connect(url,{ useNewUrlParser: true })
  .then(client => module.exports.getdb = client.db('movie_tracker')) 
  .catch(error => console.log("couldn't connect"))
  
 
