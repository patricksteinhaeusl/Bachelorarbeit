'use strict';

const RetailerService = require('../services/retailer');

function index(req, res) {
  res.render('retailer', { title: 'Hey', message: 'Hello there!' })
}

function change(req, res) {
  let orderId = req.params.orderId;
  RetailerService.change(orderId, (error, result) => {
    if(error) return res.json(error);
    res.json(result);
  });
}

module.exports = {
  index,
  change,
};
