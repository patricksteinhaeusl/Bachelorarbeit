'use strict';

const DeliveryAddressService = require('../services/deliveryAddress');

function get(req, res) {
    let deliveryAddressId = req.params.deliveryAddressId;
    let accountId = req.params.accountId;
    DeliveryAddressService.get(deliveryAddressId, accountId, (error, result) => {
        if (error) return res.status(error.statusCode).json(error);
        return res.status(result.statusCode).json(result);
    });
}

function getByAccountId(req, res) {
    let accountId = req.params.accountId;
    DeliveryAddressService.getByAccountId(accountId, (error, result) => {
        if (error) return res.status(error.statusCode).json(error);
        return res.status(result.statusCode).json(result);
    });
}

function update(req, res) {
    let deliveryAddress = req.body.deliveryAddress;
    DeliveryAddressService.update(deliveryAddress, (error, result) => {
        if (error) return res.status(error.statusCode).json(error);
        return res.status(result.statusCode).json(result);
    });
}

function insert(req, res) {
    let deliveryAddress = req.body.deliveryAddress;
    DeliveryAddressService.insert(deliveryAddress, (error, result) => {
        if (error) return res.status(error.statusCode).json(error);
        return res.status(result.statusCode).json(result);
    });
}

function remove(req, res) {
    let deliveryAddressId = req.params.deliveryAddressId;
    DeliveryAddressService.remove(deliveryAddressId, (error, result) => {
        if (error) return res.status(error.statusCode).json(error);
        return res.status(result.statusCode).json(result);
    });
}

module.exports = {
    get,
    getByAccountId,
    update,
    insert,
    remove
};
