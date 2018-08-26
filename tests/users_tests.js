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
 
before(async function() {
  let startDB = await db.startdb(); 
});

after(()=> chai.request(server).close())
 
  
  describe('all routers for user CRUD operations', () => {
   
    describe('/api/users/:username/add POST', () => {
      
              it('should add a new user', (done) => {

                 let newUser = { "username":"sample1",
                                "password":"samplepassword",
                                "email":"samp@le.com" }

                 chai.request(server)
                  .post('/api/users/sample1/add')
                  .send(newUser)
                  .type('form')
                  .end((err, res) => {
                      expect(res).to.have.status(200)
                      expect(res.text).to.equal("User successfully added!")
                      expect(err).to.be.null
                      expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
                      done();
                  });
             });
      
              it('should not add a new user if a field is missing', (done) => {

                 let newUser = {"username":"sample1"}

                 chai.request(server)
                  .post('/api/users/sample1/add')
                  .send(newUser)
                  .type('form')
                  .end((err, res) => {
                      expect(res).to.have.status(400)
                      expect(res.text).to.equal("Please provide a username, password and email")
                      expect(err).to.be.null
                      expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
                      done();
                  });
             });
        });


      describe('/api/users GET', () => {
           it('should get all the users', (done) => {
             chai.request(server)
              .get('/api/users')
              .end((err, res) => {
                  expect(res).to.have.status(200)
                  expect(res).to.be.json
                  expect(res.body).to.be.an('array');
                  done();
              });
         });
    });

      describe('/api/users/:username GET', () => {
             it('should get a single user', (done) => {
               chai.request(server)
                .get('/api/users/sample')
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res).to.be.json
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.equal(1);
                    expect(err).to.be.null;
                    expect(res.body).to.deep.include({"_id":"5b79d6abe7179a69ea61558f",username: "sample", "movies_watched": 332, "review_count": 28});
                    done();
                });
           });
      });

      describe('/api/users/:username DELETE', () => {
             it('should delete a user if the user exists', (done) => {
               chai.request(server)
                .delete('/api/users/sample1')
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.text).to.equal("user deleted")
                    expect(err).to.be.null
                    expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
                    done();
                });
           });

           it('should not delete a user if the user does not exist', (done) => {
               chai.request(server)
                .delete('/api/users/sample1')
                .end((err, res) => {
                    expect(res).to.have.status(400)
                    expect(res.text).to.equal("looks like the user to delete doesn't exist")
                    expect(err).to.be.null
                    expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
                    done();
                });
           });
      });
  });
      
  

 