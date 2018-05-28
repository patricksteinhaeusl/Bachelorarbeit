'use strict';

const RetailerService = require('../services/retailer');

function applyDiscount(req, res) {
    if(req.user && req.user.isRetailer) {
        let orderId = req.params.orderId;
        RetailerService.applyDiscount(orderId, (error, result) => {
            if (error) return res.render('feedback', { feedback: error });
            return res.render('feedback', {feedback: result });
        });
    } else {
        return res.render('feedback', { feedback: { statusCode: 500, data: null, message: 'User is not authenticated for this operation!'} });
    }
}

module.exports = {
    applyDiscount,
};
