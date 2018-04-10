'use strict';

const RetailerService = require('../services/retailer');

function change(req, res) {
    let orderId = req.params.orderId;
    RetailerService.change(orderId, function (error, result) {
        if (error) return res.render('feedback', { feedback: error });
        return res.render('feedback', {feedback: result });
    });
}

module.exports = {
    change,
};
