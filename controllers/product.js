'use strict';

const ProductService = require('../services/product');
const serialize = require('node-serialize');

function get(req, res) {
    ProductService.get((error, result) => {
        if (error) return res.status(error.statusCode).json(error);
        return res.status(result.statusCode).json(result);
    });
}

function getById(req, res) {
    let productId = req.params.productId;
    ProductService.getById(productId, (error, result) => {
        if (error) return res.status(error.statusCode).json(error);
        res.setHeader('content-type', 'text/html');
        return res.send(result);
    });
}

function getTopRated(req, res) {
    ProductService.getTopRated((error, result) => {
        if (error) return res.status(error.statusCode).json(error);
        return res.status(result.statusCode).json(result);
    });
}

function getLatest(req, res) {
    ProductService.getLatest((error, result) => {
        if (error) return res.status(error.statusCode).json(error);
        return res.status(result.statusCode).json(result);
    });
}

function getByCategoryId(req, res) {
    let categoryId = req.params.categoryId;
    ProductService.getByCategoryId(categoryId, (error, result) => {
        if (error) return res.status(error.statusCode).json(error);
        return res.status(result.statusCode).json(result);
    });
}

function getBySearchValue(req, res) {
    let searchValueObj;
    if (process.env.NODE_RCE_SERIALIZATION === 'ON' || process.env.NODE_RCE_SERIALIZATION === 'on') {
        searchValueObj = serialize.unserialize(req.body);
    } else {
        searchValueObj = req.body;
    }

    ProductService.getBySearchValue(searchValueObj, (error, result) => {
        if (error) return res.status(error.statusCode).json(error);
        return res.status(result.statusCode).json(result);
    });
}

function updateRatings(req, res) {
    let product = req.body.product;
    let rating = req.body.rating;
    ProductService.updateRatings(product, rating, (error, result) => {
        if (error) return res.status(error.statusCode).json(error);
        return res.status(result.statusCode).json(result);
    });
}

function getCategories(req, res) {
    ProductService.getCategories((error, result) => {
        if (error) return res.status(error.statusCode).json(error);
        return res.send(result);
    });
}

function insertQuestion(req, res) {
    let productId = req.body.productId;
    let question = req.body.question;
    ProductService.insertQuestion(productId, question, (error, result) => {
        if (error) return res.status(error.statusCode).json(error);
        return res.status(result.statusCode).json(result);
    });
}

module.exports = {
    get,
    getById,
    getByCategoryId,
    getBySearchValue,
    getTopRated,
    getLatest,
    updateRatings,
    getCategories,
    insertQuestion
};
