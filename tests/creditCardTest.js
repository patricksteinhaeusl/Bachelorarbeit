'use strict';

const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');

const CreditCard = require('../models/creditCard');

const should = chai.should();

chai.use(chaiHttp);

let creditCard0 = {};
let creditCard1 = {};

function getCreditCard(callback) {
  CreditCard.findOne({_account: "59e7ffc364b7f1faf7a3348e"})
    .lean()
    .exec(function (error, result) {
      creditCard0 = result;
      CreditCard.findOne({_account: "59e7ffc364b7f1faf7a3348f"})
        .lean()
        .exec(function (error, result) {
          creditCard1 = result;
          callback();
        });
  });
}

describe('CreditCard', function() {
  before(function (callback) {
    getCreditCard(function () { callback(); });
  });

  describe('/GET /creditcard/:creditCardId', function() {
    it('it should GET a creditcard by id', function(callback) {
      chai.request(app)
        .get('/creditCard/' + creditCard0._id)
        .end(function(error, res) {
          res.should.have.status(200);
          res.body.should.have.nested.property('data.creditCard');
          res.body.data.creditCard.should.be.a('object');
          callback();
        });
    });

    it('it should not GET a creditcard by id', function(callback) {
      chai.request(app)
        .get('/creditcard/1')
        .end(function(error, res) {
          res.should.have.status(400);
          res.body.should.not.have.nested.property('data.creditCard');
          res.body.should.be.a('object');
          callback();
        });
    });

    it('it should not GET an creditcard by id', function(callback) {
      chai.request(app)
        .get('/creditcard/59e7ffc364b7f1faf7a3356f')
        .end(function(error, res) {
          res.should.have.status(404);
          res.body.should.not.have.nested.property('data.creditCard');
          res.body.should.be.a('object');
          callback();
        });
    });
  });

  describe('/PUT /creditCard/', function() {
    it('it should UPDATE an creditcard', function(callback) {
      creditCard1.number = '2020-2020-2020-2020';
      chai.request(app)
        .put('/creditCard/')
        .send({ creditCard : creditCard1 })
        .end(function(error, res) {
          res.should.have.status(200);
          res.body.should.have.nested.property('data.creditCard');
          res.body.data.creditCard.should.be.a('object');
          callback();
        });
    });
  });

  describe('/POST /creditCard/', function() {
    it('it should INSERT a creditcard', function(callback) {
      let newCreditCard = new CreditCard({
        number: '1010-1010-1010-1010',
        _account: creditCard0._account
      });

      chai.request(app)
        .post('/creditCard/')
        .send({ creditCard : newCreditCard })
        .end(function(error, res) {
          res.should.have.status(200);
          res.body.should.have.nested.property('data.creditCard');
          res.body.data.creditCard.should.be.a('object');
          callback();
        });
    });
  });

  describe('/DELETE /creditCard/:creditCardId', function() {
    it('it should DELETE a creditcard by id', function(callback) {
      chai.request(app)
        .delete('/creditCard/' + creditCard1._id)
        .end(function(error, res) {
          res.should.have.status(200);
          res.body.should.not.have.nested.property('data.creditCard');
          res.body.should.be.a('object');
          callback();
        });
    });
  });
});
