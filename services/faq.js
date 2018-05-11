'use strict';

const Faq = require('../models/faqQuestion').Faq;
const ResponseUtil = require('../utils/response');

function get(callback) {
    Faq.find({}, null, {sort: {_id: 1}}, function (error, result) {
        if (error) return callback(ResponseUtil.createErrorResponse(error));
        if (!result) return callback(ResponseUtil.createNotFoundResponse());
        result = {'faq': result};
        return callback(null, ResponseUtil.createSuccessResponse(result));
    });
}

function getFaqBySearchValue(searchValueObj, callback) {
    let param = searchValueObj.searchValue;
    Faq.find({
        $where: "'"+ param +"'; /" + param + "/i.test(this.question) || /" + param + "/i.test(this.answer);"
    }, null, {sort: {_id: 1}}, function (error, result) {
        if (error) return callback(ResponseUtil.createErrorResponse("Could not process your input."));
        if (!result) return callback(ResponseUtil.createNotFoundResponse());
        result = {'faq': result};
        return callback(null, ResponseUtil.createSuccessResponse(result));
    });
}

module.exports = {
    get,
    getFaqBySearchValue
};
