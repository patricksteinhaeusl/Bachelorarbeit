'use strict';

const CreditCardService = require('../services/creditCard');

function getByNumber(req, res) {
    let creditCardNumber = req.params.creditCardNumber;
    CreditCardService.getByNumber(creditCardNumber, (error, result) => {
        if (error) return res.status(error.statusCode).json(error);
        return res.status(result.statusCode).json(result);
    });
}

function getAll(req, res) {
    CreditCardService.getAll((error, result) => {
        if (error) return res.status(error.statusCode).json(error);
        return res.status(result.statusCode).json(result);
    });
}

function getByAccountId(req, res) {
    let accountId = req.params.accountId;
    CreditCardService.getByAccountId(accountId, (error, result) => {
        if (error) return res.status(error.statusCode).json(error);
        return res.status(result.statusCode).json(result);
    });
}

function update(req, res) {
    let creditCard = req.body.creditCard;
    CreditCardService.update(creditCard, (error, result) => {
        if (error) return res.status(error.statusCode).json(error);
        return res.status(result.statusCode).json(result);
    });
}

function insert(req, res) {
    let creditCard = req.body.creditCard;
    CreditCardService.insert(creditCard, (error, result) => {
        if (error) return res.status(error.statusCode).json(error);
        return res.status(result.statusCode).json(result);
    });
}

function remove(req, res) {
    let creditCardId = req.params.creditCardId;
    CreditCardService.remove(creditCardId, (error, result) => {
        if (error) return res.status(error.statusCode).json(error);
        return res.status(result.statusCode).json(result);
    });
}

module.exports = {
    getByNumber,
    getAll,
    getByAccountId,
    update,
    insert,
    remove
};
