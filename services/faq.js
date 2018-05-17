'use strict';

const Faq = require('../models/faqQuestion').Faq;
const ResponseUtil = require('../utils/response');

function get(callback) {
    Faq.find({}, null, {sort: {_id: 1}}, function (error, result) {
        if (error) return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
        if (!result) return callback(ResponseUtil.createNotFoundResponse('No faqs found.'));
        result = {'faq': result};
        return callback(null, ResponseUtil.createSuccessResponse(result, 'Faqs found.'));
    });
}

function getFaqBySearchValue(searchValueObj, callback) {
    let param = searchValueObj.searchValue;
    Faq.find({
        $where: "'"+ param +"'; /" + param + "/i.test(this.question) || /" + param + "/i.test(this.answer);"
    }, null, {sort: {_id: 1}}, function (error, result) {
        if (error) return callback(ResponseUtil.createErrorResponse('Something went wrong.'));
        if (!result) return callback(ResponseUtil.createNotFoundResponse('No faqs found.'));
        result = {'faq': result};
        return callback(null, ResponseUtil.createSuccessResponse(result, 'Faqs found.'));
    });
}

module.exports = {
    get,
    getFaqBySearchValue
};
