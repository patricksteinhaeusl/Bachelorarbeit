'use strict';

const Faq = require('../models/faqQuestion').Faq;
const ResponseUtil = require('../utils/response');

function get(callback) {
    Faq.find({}, null, {
            sort: {_id: 1}
        }).then((faq) => {
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
            return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
        });
}

module.exports = {
    get,
    getFaqBySearchValue
};
