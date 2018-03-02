'use strict';

const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');

const Account = require('../models/account');

const should = chai.should();

chai.use(chaiHttp);

let account0 = {};
let account1 = {};

function getAccounts(callback) {
    Account.findOne({_id: "59e7ffc364b7f1faf7a3348e"})
        .lean()
        .exec(function (error, result) {
            account0 = result;
            Account.findById({_id: '59e7ffc364b7f1faf7a3348f'})
                .lean()
                .exec(function (error, result) {
                    account1 = result;
                    callback();
                });
        });
}

describe('Account', function () {
    before(function (callback) {
        getAccounts(function () {
            callback();
        });
    });

    describe('/GET /account/:accountId', function () {
        it('it should GET an account by id', function (callback) {
            chai.request(app)
                .get('/account/' + account0._id)
                .end(function (error, res) {
                    res.should.have.status(200);
                    res.body.should.have.nested.property('data.account');
                    res.body.data.account.should.be.a('object');
                    callback();
                });
        });

        it('it should not GET an account by id', function (callback) {
            chai.request(app)
                .get('/account/1')
                .end(function (error, res) {
                    res.should.have.status(400);
                    res.body.should.not.have.nested.property('data.account');
                    res.body.should.be.a('object');
                    callback();
                });
        });

        it('it should not GET an account by id', function (callback) {
            chai.request(app)
                .get('/account/59e7ffc364b7f1faf7a3356f')
                .end(function (error, res) {
                    res.should.have.status(404);
                    res.body.should.not.have.nested.property('data.account');
                    res.body.should.be.a('object');
                    callback();
                });
        });
    });

    describe('/PUT /account/', function () {
        it('it should UPDATE an account', function (callback) {
            account1.firstname = 'ChangedFirstname';
            account1.lastname = 'ChangedLastname';
            chai.request(app)
                .put('/account/')
                .send({account: account1})
                .end(function (error, res) {
                    res.should.have.status(200);
                    res.body.should.have.nested.property('data.account');
                    res.body.data.account.should.be.a('object');
                    callback();
                });
        });
    });

    describe('/POST /account/', function () {
        it('it should INSERT an account', function (callback) {
            let newAccount = new Account({
                username: 'customerNew',
                password: '234234',
                firstname: 'Hans',
                lastname: 'Muster',
                email: 'customerNew@gmail.com'
            });

            chai.request(app)
                .post('/account/')
                .send({account: newAccount})
                .end(function (error, res) {
                    res.should.have.status(200);
                    res.body.should.have.nested.property('data.account');
                    res.body.data.account.should.be.a('object');
                    callback();
                });
        });
    });
});
