var db = require('../data/db.js')
let mocha = require('mocha');
var MongoClient = require("mongodb").MongoClient;
let chai = require('chai');
let spies = require('chai-spies')
let chaiPromise = require('chai-as-promised')
let chaiHttp = require('chai-http');
let expect = chai.expect;
let api = require('../routers/apiRouter.js')
let server = require('../app.js')

chai.use(chaiHttp);
chai.use(spies);
chai.use(chaiPromise);


describe('all routers dealing with movie diary entries', () => {
    
    describe('/api/users/:username/all GET', () => {
             it('should get a list of all movie diary entries for a single user', (done) => {
               chai.request(server)
                .get('/api/users/sample/all')
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res).to.be.json
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.equal(1);
                    expect(err).to.be.null;
                    expect(res.body[0].movies_watched_titles[0]).to.deep.include({ 
                       movie_title: 'Mission: Impossible - Fallout',
                       timestamp: '2018-08-08',
                       favorite: 'true' });
                    done();
                });
           });
      });
    
    
    describe('/api/users/:username/diary POST', () => {
             it('should post a new diary entry for a user if the user exists', (done) => {
               let newEntry = { "movie_title":"My movie",
                                "timestamp":"2018-09-07",
                                "favorite":"true" }
               
               chai.request(server)
                .post('/api/users/sample/diary')
                .send(newEntry)
                .type('form')
                .end((err, res) => {
                      expect(res).to.have.status(200)
                      expect(res.text).to.equal("Entry successfully added!")
                      expect(err).to.be.null
                      expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
                      done();
                });
           });
          
          it('should not post a new diary entry if user does not exist', (done) => {
              let newEntry = { "movie_title":"My movie",
                                "timestamp":"2018-09-07",
                                "favorite":"true" }
                 chai.request(server)
                .post('/api/users/nonexistinguser/diary')
                .send(newEntry)
                .type('form')
                .end((err, res) => {
                      expect(res).to.have.status(400)
                      expect(res.text).to.equal("looks like the username doesn't exist")
                      expect(err).to.be.null
                      expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
                      done();
                });
           });
      
          it('should not post a new diary entry if any of the fields is missing', (done) => {
               let newEntry = { "timestamp":"2018-09-07",
                                "favorite":"true" }
                                
                 chai.request(server)
                .post('/api/users/sample/diary')
                .send(newEntry)
                .type('form')
                .end((err, res) => {
                      expect(res).to.have.status(400)
                      expect(res.text).to.equal("Please provide a movie title, date watched and favorite (true or false)")
                      expect(err).to.be.null
                      expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
                      done();
                });
           });
          
           it('should not post a new diary entry if the date is not valid', (done) => {
               let newEntry = { "movie_title":"My movie",
                                "timestamp":"asdfasfd",
                                "favorite":"true" }
                 chai.request(server)
                .post('/api/users/sample/diary')
                .send(newEntry)
                .type('form')
                .end((err, res) => {
                      expect(res).to.have.status(400)
                      expect(res.text).to.equal("date must be valid")
                      done();
                });
           });
      
          it('should not post a new diary entry if favorite is not equal to either true or false', (done) => {
               let newEntry = { "movie_title":"My movie",
                                "timestamp":"2018-09-07",
                                "favorite":"asfdasf" }
                 chai.request(server)
                .post('/api/users/sample/diary')
                .send(newEntry)
                .type('form')
                .end((err, res) => {
                      expect(res).to.have.status(400)
                      expect(res.text).to.equal("favorite must either be true or false")
                      done();
                });
           });
      
      });
    
      
       describe('/users/:username/diary/:title PUT', () => {
             it('should post edit a diary entry for a user if the user exists', (done) => {
               let editedEntry = { "timestamp":"2019-09-09",
                                   "favorite":"false" }
                chai.request(server)
                .put('/api/users/sample/diary/My movie')
                .send(editedEntry)
                .type('form')
                .end((err, res) => {
                      expect(res).to.have.status(200)
                      expect(res.text).to.equal("The movie entry has been successfully updated")
                      expect(err).to.be.null
                      expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
                      done();
                });
           });
          
          it('should not edit a diary entry if user does not exist', (done) => {
              let editedEntry = { "timestamp":"2018-09-07",
                                  "favorite":"true" }
                 chai.request(server)
                .put('/api/users/nonexistinguser/diary/My movie')
                .send(editedEntry)
                .type('form')
                .end((err, res) => {
                      expect(res).to.have.status(400)
                      expect(res.text).to.equal("looks like the username doesn't exist")
                      expect(err).to.be.null
                      expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
                      done();
                });
           });
      
          
           it('should not edit a diary entry if the date is not valid', (done) => {
               let editedEntry = {  "timestamp":"asdfasfd",
                                    "favorite":"true" }
                 chai.request(server)
                .put('/api/users/sample/diary/My movie')
                .send(editedEntry)
                .type('form')
                .end((err, res) => {
                      expect(res).to.have.status(400)
                      expect(res.text).to.equal("date must be valid")
                      done();
                });
           });
      
          it('should not edit a diary entry if favorite is not equal to either true or false', (done) => {
               let newEntry = {  "timestamp":"2018-09-07",
                                "favorite":"asfdasf" }
                 chai.request(server)
                .put('/api/users/sample/diary/My movie')
                .send(newEntry)
                .type('form')
                .end((err, res) => {
                      expect(res).to.have.status(400)
                      expect(res.text).to.equal("favorite must either be true or false")
                      done();
                });
           });
      
      });
    
     describe('/users/:username/delete/:title DELETE', () => {
             it('should delete a movie entry if the user and title exists', (done) => {
               chai.request(server)
                .delete('/api/users/sample/delete/My movie')
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.text).to.equal("successfully deleted diary entry")
                    expect(err).to.be.null
                    expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
                    done();
                });
           });

           it('should not delete a user if the user or title does not exist', (done) => {
               chai.request(server)
                .delete('/api/users/sample/delete/nonexistingmovietitle')
                .end((err, res) => {
                    expect(res).to.have.status(400)
                    expect(res.text).to.equal("looks like the username or title doesn't exist")
                    expect(err).to.be.null
                    expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
                    done();
                });
           });
      });
    
  });