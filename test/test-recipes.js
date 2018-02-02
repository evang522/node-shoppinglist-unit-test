'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

// this lets us use *expect* style syntax in our tests
// so we can do things like `expect(1 + 1).to.equal(2);`
// http://chaijs.com/api/bdd/
const expect = chai.expect;

// This let's us make HTTP requests
// in our tests.
// see: https://github.com/chaijs/chai-http
chai.use(chaiHttp);

describe('Recipe-router-Tests', function() {
  before(function () {
    return runServer();
  });

  after(function() {
    return closeServer();
  });


  it('should return a list of recipes in JSON on calling `/recipes`', function () {
    return chai.request(app)
      .get('/recipes')
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.at.least(1);
      });
  });

  it('Should add an item on Post', function () {
    const newItem = {name:'coffee', ingredients:['beans', 'liquid', 'love']};
    return chai.request(app)
      .post('/recipes')
      .send(newItem)
      .then(function (res) {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.include.keys('id', 'name', 'ingredients');
      });
  });

  //delete

  it('Should remove an item on DELETE', function() {
    return chai.request(app)
      .get('/recipes/')
      .then(function(res) {
        return chai.request(app)
          .delete(`/recipes/${res.body[0].id}`);
      })
      .then(function(res) {
        expect(res).to.have.status(204);
      });
  });

  //put

  it('Should update an recipe on PUT', function() {
    const updateData = {name: 'Luke', ingredients: ['Force', 'lightsaber'] }
    return chai.request(app)
      .get('/recipes/')
      .then(function(res) {
        updateData.id = res.body[0].id;
        return chai.request(app)
          .put(`/recipes/${updateData.id}`)
          .send(updateData);
      })
      .then(function(res) {
        expect(res).to.have.status(204);
      }); 
  });







});