'use strict';

const Account = require('../models/account');
const DeliveryAddress = require('../models/deliveryAddress').DeliveryAddress;
const ResponseUtil = require('../utils/response');

function get(deliveryAddressId, callback) {
  if(!deliveryAddressId) return callback(ResponseUtil.createNotFoundResponse());
  DeliveryAddress.findById(deliveryAddressId, function(error, result) {
    if(error) return callback(ResponseUtil.createErrorResponse(error));
    if(!result) return callback(ResponseUtil.createNotFoundResponse());
    result = { 'deliveryAddress' : result};
    return callback(null, ResponseUtil.createSuccessResponse(result));
  });
}

function getByAccountId(accountId, callback) {
  if(!accountId) return callback(ResponseUtil.createNotFoundResponse());
  DeliveryAddress.find({ '_account' : accountId }, function(error, result) {
    if(error) return callback(ResponseUtil.createErrorResponse(error));
    if(!result) return callback(ResponseUtil.createNotFoundResponse());
    result = { 'deliveryAddresses' : result};
    return callback(null, ResponseUtil.createSuccessResponse(result));
  });
}

function update(deliveryAddress, callback) {
  let deliveryAddressObj = new DeliveryAddress(deliveryAddress);
  DeliveryAddress.findByIdAndUpdate(deliveryAddressObj._id, deliveryAddressObj, { new: true, runValidators: true },function(error, result) {
    if(error) {
      if(error.errors) {
        return callback(ResponseUtil.createValidationResponse(error.errors));
      }
      return callback(ResponseUtil.createErrorResponse(error));
    }
    if(!result) return callback(ResponseUtil.createNotFoundResponse('Delivery address failed to update.'));
    result = { 'deliveryAddress' : result};
    return callback(null, ResponseUtil.createSuccessResponse(result, 'Delivery address successfully updated.'));
  });
}

function insert(deliveryAddress, callback) {
  let deliveryAddressObj = new DeliveryAddress(deliveryAddress);
  deliveryAddressObj.save(function(error, result) {
    if(error) {
      if(error.errors) {
        return callback(ResponseUtil.createValidationResponse(error.errors));
      }
      return callback(ResponseUtil.createErrorResponse(error));
    }
    if(!result) return callback(ResponseUtil.createNotFoundResponse('Delivery address failed to create.'));
    result = { 'deliveryAddress' : result};
    return callback(null, ResponseUtil.createSuccessResponse(result, 'Delivery address successfully created.'));
  });
}

function insertByAccount(account, deliveryAddress, callback) {
  let accountObj = new Account(account);
  let deliveryAddressObj = new DeliveryAddress(deliveryAddress);
  Account.findById(accountObj._id, function(error, result) {
    if(error) return callback(ResponseUtil.createErrorResponse(error));
    if(!result) return callback(ResponseUtil.createNotFoundResponse());
    deliveryAddressObj.owner = result._id;
    deliveryAddressObj.save(function(error, result) {
      if(error) return callback(ResponseUtil.createErrorResponse(error));
      if(!result) return callback(ResponseUtil.createNotFoundResponse());
      result = { 'deliveryAddress' : result};
      return callback(null, ResponseUtil.createSuccessResponse(result));
    });
  });
}

function remove(deliveryAddressId, callback) {
  if(!deliveryAddressId) return callback(ResponseUtil.createNotFoundResponse());
  DeliveryAddress.findByIdAndRemove(deliveryAddressId, function(error) {
    if(error) return callback(ResponseUtil.createErrorResponse(error));
    return callback(null, ResponseUtil.createSuccessResponse({}));
  });
}

module.exports = {
  get,
  getByAccountId,
  update,
  insert,
  insertByAccount,
  remove
};