var MongoClient = require("mongodb").MongoClient;
require('dotenv').config();

if (process.env.NODE_ENV == 'test') {
var url = process.env.DB_URI_TEST;
var dbname='movie_tracker_test'

module.exports.startdb =  (async ()=>{
    var client = await MongoClient.connect(url,{ useNewUrlParser: true }).catch(error=>console.log("couldn't connect"))
    module.exports.getdb = client.db(dbname)
    return client.db(dbname)
   });
}


else {
    var url = process.env.DB_URI; var dbname='movie_tracker';
  MongoClient.connect(url,{ useNewUrlParser: true })
  .then(client => module.exports.getdb = client.db(dbname)) 
  .catch(error => console.log("couldn't connect"))
}


     
     
