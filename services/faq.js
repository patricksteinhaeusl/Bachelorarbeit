'use strict';

const Faq = require('../models/faqQuestion').Faq;
const ResponseUtil = require('../utils/response');

function get(callback) {
    // Get Faqs
    Faq.find({})
        .then((faq) => handleGetFaq(faq, callback))
        .catch((error) => {
            return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
        });
}

function getFaqBySearchValue(searchValueObj, callback) {
    let param = searchValueObj.searchValue;
    // Get Faqs by searchValue
    Faq.find({ $where: "'"+ param +"'; /" + param + "/i.test(this.question) || /" + param + "/i.test(this.answer);" })
        .then((faq) => handleGetFaq(faq, callback))
        .catch((error) => {
            return callback(ResponseUtil.createErrorResponse(error, 'Could not process your input.'));
        });
}

function handleGetFaq(faq, callback) {
    if (!faq || !faq.length) return callback(ResponseUtil.createNotFoundResponse('No faqs found.'));
    const data = {'faq': faq};
    return callback(null, ResponseUtil.createSuccessResponse(data));
}

module.exports = {
    get,
    getFaqBySearchValue
};
