'use strict';

const Faq = require('../models/faqQuestion').Faq;
const ResponseUtil = require('../utils/response');

function get(callback) {
    Faq.find({})
        .then((faq) => {
            if (!faq) return callback(ResponseUtil.createNotFoundResponse('No faqs found.'));
            const data = {'faq': faq};
            return callback(null, ResponseUtil.createSuccessResponse(data));
        }).catch((error) => {
            return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
        });
}

function getFaqBySearchValue(searchValueObj, callback) {
    let param = searchValueObj.searchValue;
    Faq.find({
            $where: "'"+ param +"'; /" + param + "/i.test(this.question) || /" + param + "/i.test(this.answer);"
        }).then((faq) => {
            if (!faq) return callback(ResponseUtil.createNotFoundResponse('No faqs found.'));
            const data = {'faq': faq};
            return callback(null, ResponseUtil.createSuccessResponse(data));
        }).catch((error) => {
            return callback(ResponseUtil.createErrorResponse(error, 'Could not process your input.'));
        });
}

module.exports = {
    get,
    getFaqBySearchValue
};
