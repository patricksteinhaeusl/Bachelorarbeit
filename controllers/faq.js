'use strict';

const FaqService = require('../services/faq');

function get(req, res) {
    FaqService.get((error, result) => {
        if (error) return res.status(error.statusCode).json(error);
        return res.status(result.statusCode).json(result);
    });
}

function getFaqBySearchValue(req, res) {
    let searchValueObj = req.body;
    FaqService.getFaqBySearchValue(searchValueObj, (error, result) => {
        if (error) return res.status(error.statusCode).json(error);
        return res.status(result.statusCode).json(result);
    });
}

module.exports = {
    get,
    getFaqBySearchValue
};
