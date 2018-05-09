'use strict';

const Faq = require('../models/faqQuestion').Faq;
const ResponseUtil = require('../utils/response');

function get(callback) {
    Faq.find({}, function (error, result) {
        if (error) return callback(ResponseUtil.createErrorResponse(error));
        if (!result) return callback(ResponseUtil.createNotFoundResponse());
        result = {'faq': result};
        return callback(null, ResponseUtil.createSuccessResponse(result));
    });
}

function getFaqBySearchValue(searchValueObj, callback) {
    Faq.find({
        $or: [
            {name: new RegExp(searchValueObj.searchValue, "i")},
            {'category.name': new RegExp(searchValueObj.searchValue, "i")}
        ]
    }, function (error, result) {
        if (error) return callback(ResponseUtil.createErrorResponse(error));
        if (!result) return callback(ResponseUtil.createNotFoundResponse());
        result = {'faq': result};
        return callback(null, ResponseUtil.createSuccessResponse(result));
    });
}

module.exports = {
    get,
    getFaqBySearchValue
};
