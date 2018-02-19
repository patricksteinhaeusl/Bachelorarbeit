'use strict';

const OrderService = require('../services/order');

function get(req, res) {
  let orderId = req.params.orderId;
  OrderService.get(orderId, (error, result) => {
    if(error) return res.json(error);
    res.json(result);
  });
}

function getByAccountId(req, res) {
  let accountId = req.params.accountId;
  OrderService.getByAccountId(accountId, (error, result) => {
    if(error) return res.json(error);
    res.json(result);
  });
}

function update(req, res) {
  let order = req.body.order;
  OrderService.update(order, (error, result) => {
    if(error) return res.json(error);
    res.json(result);
  });
}

function insert(req, res) {
  let order = req.body.order;
  OrderService.insert(order, (error, result) => {
    if(error) return res.json(error);
    res.json(result);
  });
}

function create(req, res) {
  OrderService.create((error, result) => {
    if(error) return res.json(error);
    res.json(result);
  });
}

function remove(req, res) {
  let orderId = req.params.orderId;
  OrderService.insert(orderId, (error, result) => {
    if(error) return res.json(error);
    res.json(result);
  });
}

module.exports = {
  get,
  getByAccountId,
  update,
  insert,
  create,
  remove
};