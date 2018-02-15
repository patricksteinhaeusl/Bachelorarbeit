'use strict';

const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');

const DeliveryAddress = require('../models/deliveryAddress');

const should = chai.should();

chai.use(chaiHttp);

let deliveryAddress0 = {};
let deliveryAddress1 = {};

function getDeliveryAddress(callback) {
  DeliveryAddress.findOne({_account: "59e7ffc364b7f1faf7a3348e"})
    .lean()
    .exec(function (error, result) {
      deliveryAddress0 = result;
      DeliveryAddress.findOne({_account: "59e7ffc364b7f1faf7a3348f"})
        .lean()
        .exec(function (error, result) {
          deliveryAddress1 = result;
          callback();
        });
    });
}

describe('DeliveryAddress', function() {
  before(function (callback) {
    getDeliveryAddress(function () { callback(); });
  });

  describe('/GET /deliveryaddress/:deliveryAddressId', function() {
    it('it should GET a deliveryaddress by id', function(callback) {
      chai.request(app)
        .get('/deliveryAddress/' + deliveryAddress0._id)
        .end(function(error, res) {
          res.should.have.status(200);
          res.body.should.have.nested.property('data.deliveryAddress');
          res.body.data.deliveryAddress.should.be.a('object');
          callback();
        });
    });

    it('it should not GET a deliveryaddress by id', function(callback) {
      chai.request(app)
        .get('/deliveryaddress/1')
        .end(function(error, res) {
          res.should.have.status(400);
          res.body.should.not.have.nested.property('data.deliveryAddress');
          res.body.should.be.a('object');
          callback();
        });
    });

    it('it should not GET an deliveryaddress by id', function(callback) {
      chai.request(app)
        .get('/deliveryaddress/59e7ffc364b7f1faf7a3356f')
        .end(function(error, res) {
          res.should.have.status(404);
          res.body.should.not.have.nested.property('data.deliveryAddress');
          res.body.should.be.a('object');
          callback();
        });
    });
  });

  describe('/PUT /deliveryAddress/', function() {
    it('it should UPDATE an deliveryaddress', function(callback) {
      deliveryAddress1.number = '2020-2020-2020-2020';
      chai.request(app)
        .put('/deliveryAddress/')
        .send({ deliveryAddress : deliveryAddress1 })
        .end(function(error, res) {
          res.should.have.status(200);
          res.body.should.have.nested.property('data.deliveryAddress');
          res.body.data.deliveryAddress.should.be.a('object');
          callback();
        });
    });
  });

  describe('/POST /deliveryAddress/', function() {
    it('it should INSERT a deliveryaddress', function(callback) {
      let newDeliveryAddress = new DeliveryAddress({
        street: 'The Street 10000',
        zip: 50000,
        city: 'Vaduz',
        country: "Liechtenstein",
        _account: deliveryAddress0._account
      });

      chai.request(app)
        .post('/deliveryAddress/')
        .send({ deliveryAddress : newDeliveryAddress })
        .end(function(error, res) {
          res.should.have.status(200);
          res.body.should.have.nested.property('data.deliveryAddress');
          res.body.data.deliveryAddress.should.be.a('object');
          callback();
        });
    });
  });

  describe('/DELETE /deliveryAddress/:deliveryAddressId', function() {
    it('it should DELETE a deliveryaddress by id', function(callback) {
      chai.request(app)
        .delete('/deliveryAddress/' + deliveryAddress1._id)
        .end(function(error, res) {
          res.should.have.status(200);
          res.body.should.not.have.nested.property('data.deliveryAddress');
          res.body.should.be.a('object');
          callback();
        });
    });
  });
});