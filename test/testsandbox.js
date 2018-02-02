
const chai = require('chai');
const chaiHttp = require('chai-http');

// this lets us use *expect* style syntax in our tests
// so we can do things like `expect(1 + 1).to.equal(2);`
// http://chaijs.com/api/bdd/
const expect = chai.expect;

// This let's us make HTTP requests
// in our tests.
// see: https://github.com/chaijs/chai-http

chai.use(chaiHttp);

const  add = (num1,num2) => {
  return num1+num2;
};


describe('Add function (this is our test test)', function() {

  before(function() {
    console.log('The tests have begun!');

  })


  after(function() {
    console.log('The tests have ended!');


  })

  it('Should return 10 when 5 and 5 are added',function () {
    const answer = add(5,5);
    expect(answer).to.equal(10);
  })

})