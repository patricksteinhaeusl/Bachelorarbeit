'use strict';

const DeliveryAddressService = require('../services/deliveryAddress');

function get(req, res) {
  let deliveryAddressId = req.params.deliveryAddressId;
  DeliveryAddressService.get(deliveryAddressId, (error, result) => {
    if(error) return res.json(error);
    res.json(result);
  });
}

function getByAccountId(req, res) {
  let accountId = req.params.accountId;
  DeliveryAddressService.getByAccountId(accountId, (error, result) => {
    if(error) return res.json(error);
    res.json(result);
  });
}

function update(req, res) {
  let deliveryAddress = req.body.deliveryAddress;
  DeliveryAddressService.update(deliveryAddress, (error, result) => {
    if(error) return res.json(error);
    res.json(result);
  });
}

function insert(req, res) {
  let deliveryAddress = req.body.deliveryAddress;
  DeliveryAddressService.insert(deliveryAddress, (error, result) => {
    if(error) return res.json(error);
    res.json(result);
  });
}

function remove(req, res) {
  let deliveryAddressId = req.params.deliveryAddressId;
  DeliveryAddressService.remove(deliveryAddressId, (error, result) => {
    if(error) return res.json(error);
    res.json(result);
  });
}

module.exports = {
  get,
  getByAccountId,
  update,
  insert,
  remove
};
