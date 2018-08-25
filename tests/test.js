var db = require('../data/db.js')
let mocha = require('mocha');
var MongoClient = require("mongodb").MongoClient;
let chai = require('chai');
let spies = require('chai-spies')
let chaiPromise = require('chai-as-promised')
let chaiHttp = require('chai-http');
let expect = chai.expect;
let home = require('../routers/homeRouter.js')
let login = require('../routers/loginRouter.js')
let api = require('../routers/apiRouter.js')

let server = require('../app.js')

chai.use(chaiHttp);
chai.use(spies);
chai.use(chaiPromise);
 
beforeEach(function() {
  console.log('');
});

 describe('home router', () => {

    describe('/ GET', () => {
      after(()=> chai.request(server).close())
       it('it should GET index.ejs', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                 expect(res).to.have.status(200)
                 expect(res).to.be.an('object')
                 expect(res.body.length).to.be.an('undefined')
                 expect(err).to.be.null;
                 expect(res.text).to.include("index")
                 done();
            });
       });
  });
  
});


describe('signUp router', () => {
    describe('/ POST', () => {
      after(()=> chai.request(server).close())
         it('should redirect the user to login after signup', (done) => {
           var userCredentials = {
            email: 'sponge@bob.com', 
            username : 'spongebob',
            password: 'garyTheSnail'
          }
          chai.request(server)
            .post('/signUp')
            .type('form')
            .send(userCredentials)
            .end((err, res) => {
               expect(res).to.have.status(200)
               expect(res).to.redirect;
               expect(res.req.path).to.equal('/login/success');
               done();
            });
       });
  });
  
});


describe('api router', () => {
    describe('/ POST', () => {
      after(()=> chai.request(server).close())
         it('should redirect the user to login after signup', (done) => {
           var userCredentials = {
            email: 'sponge@bob.com', 
            username : 'spongebob',
            password: 'garyTheSnail'
          }
          chai.request(server)
            .post('/signUp')
            .type('form')
            .send(userCredentials)
            .end((err, res) => {
               expect(res).to.have.status(200)
               expect(res).to.redirect;
               expect(res.req.path).to.equal('/login/success');
               done();
            });
       });
  });
  
});

//returns an array // res is an object // status 200 //array shouldnt be empty