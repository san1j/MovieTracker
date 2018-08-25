var MongoClient = require("mongodb").MongoClient;
if (process.env.NODE_ENV == 'test') {var url = process.env.DB_URI_TEST; var dbname='movie_tracker_test'}
else {var url = process.env.DB_URI; var dbname='movie_tracker'}

 
  MongoClient.connect(url,{ useNewUrlParser: true })
  .then(client => module.exports.getdb = client.db(dbname)) 
  .catch(error => console.log("couldn't connect"))
  
 
     