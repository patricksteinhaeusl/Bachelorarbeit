'use strict';

const GlobalConfig = require('../configs/index');
const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.AssertionError;

chai.use(chaiHttp);

describe('Database', function() {
  describe('Connect to database', function() {
    it('it should connect to database', function(callback) {
      mongoose.connect(GlobalConfig.mongo.connectionString(), { useMongoClient: true }, function(error) {
        assert(error !== null, 'Failed to create data!');
        return callback();
      });
    });
  });
});
