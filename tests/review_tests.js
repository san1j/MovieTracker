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

describe('all routers dealing with movie reviews', () => {
    
    describe('/api/users/:username/reviews/all GET', () => {
             it('should get a list of all movie reviews for a single user', (done) => {
               chai.request(server)
                .get('/api/users/sample/reviews/all')
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res).to.be.json
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.equal(1);
                    expect(err).to.be.null;
                    done();
                });
           });
      });
    
    
    describe('/users/:username/review/:movieId POST', () => {
             it('should post a new movie review for a user', (done) => {
               let newReview = { review_body: "this movie is fabulous" }
                 chai.request(server)
                .post('/api/users/newUser/review/493006')
                .send(newReview)
                .type('form')
                .end((err, res) => {
                      expect(res).to.have.status(200)
                      expect(res.text).to.equal("successfully added review")
                      expect(err).to.be.null
                      expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
                      done();
                });
           });
          
          it('should not post a new review if a review is not provided', (done) => {
               let newReview = { }
                 chai.request(server)
                .post('/api/users/newUser/review/493006')
                .send(newReview)
                .type('form')
                .end((err, res) => {
                      expect(res).to.have.status(400)
                      expect(res.text).to.equal("Please provide a movieID and review")
                      expect(err).to.be.null
                      expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
                      done();
                });
           });
      
          
      });
    
    
       describe('/users/:username/review/:id PUT', () => {
             it('should edit a movie review', (done) => {
                let editedReview = { review_body: "this movie review is edited" }
                chai.request(server)
                .put('/api/users/newUser/review/493006')
                .send(editedReview)
                .type('form')
                .end((err, res) => {
                      expect(res).to.have.status(200)
                      expect(res.text).to.equal("successfully updated review")
                      expect(err).to.be.null
                      expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
                      done();
                });
           });
          
              it('should not edit a movie review if the movie id does not exist', (done) => {
                 let editedReview = { review_body: "this movie review is edited" }
                 chai.request(server)
                .put('/api/users/newUser/review/12')
                .send(editedReview)
                .type('form')
                .end((err, res) => {
                      expect(res).to.have.status(404)
                      expect(res.text).to.equal("looks like the username or movieId doesn't exist")
                      expect(err).to.be.null
                      expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
                      done();
                });
           });
      
      });
    
     describe('/users/:username/review/:id DELETE', () => {
             it('should delete a review if user and movieID is valid', (done) => {
               chai.request(server)
                .delete('/api/users/newUser/review/493006')
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.text).to.equal("review deleted")
                    expect(err).to.be.null
                    expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
                    done();
                });
           });

           it('should not delete a review for a user if the user does not exist', (done) => {
               chai.request(server)
                .delete('/api/users/nonexistinguser/review/493006')
                .end((err, res) => {
                    expect(res).to.have.status(404)
                    expect(res.text).to.equal("looks like the user doesn't exist")
                    expect(err).to.be.null
                    expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
                    done();
                });
           });
      });
    
  });