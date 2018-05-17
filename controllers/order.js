'use strict';

const OrderService = require('../services/order');

function get(req, res) {
    let orderId = req.params.orderId;
    OrderService.get(orderId, (error, result) => {
        if (error) return res.json(error);
        return res.json(result);
    });
}

function getByAccountId(req, res) {
    let accountId = req.params.accountId;
    OrderService.getByAccountId(accountId, (error, result) => {
        if (error) return res.json(error);
        return res.json(result);
    });
}

function getTempByAccountId(req, res) {
    let accountId = req.params.accountId;
    OrderService.getTempByAccountId(accountId, (error, result) => {
        if (error) return res.json(error);
        return res.json(result);
    });
}

function createTemp(req, res) {
    let items = req.body.items;
    let totalPrice = req.body.totalPrice;
    let account = req.body.account;
    OrderService.createTemp(items, totalPrice, account, (error, result) => {
        if (error) return res.json(error);
        return res.json(result);
    });
}

function updateTemp(req, res) {
    let order = req.body.order;
    OrderService.updateTemp(order, (error, result) => {
        if (error) return res.json(error);
        return res.json(result);
    });
}

function insert(req, res) {
    let order = req.body.order;
    OrderService.insert(order, (error, result) => {
        if (error) return res.json(error);
        return res.json(result);
    });
}

function remove(req, res) {
    let orderId = req.params.orderId;
    OrderService.insert(orderId, (error, result) => {
        if (error) return res.json(error);
        return res.json(result);
    });
}

function getFromTo(req, res) {
    OrderService.getFromTo(req.params.from, req.params.range, (error, result) => {
        if (error) return res.json(error);
        return res.json(result);
    });
}

module.exports = {
    get,
    getByAccountId,
    getTempByAccountId,
    createTemp,
    updateTemp,
    insert,
    remove,
    getFromTo
};
