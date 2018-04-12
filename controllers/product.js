'use strict';

const ProductService = require('../services/product');
const serialize = require('node-serialize');

function get(req, res) {
    ProductService.get((error, result) => {
        if (error) return res.json(error);
        return res.json(result);
    });
}

function getById(req, res) {
    let productId = req.params.productId;
    ProductService.getById(productId, (error, result) => {
        if (error) return res.json(error);
        return res.json(result);
    });
}

function getTopRated(req, res) {
    ProductService.getTopRated((error, result) => {
        if (error) return res.json(error);
        return res.json(result);
    });
}

function getLatest(req, res) {
    ProductService.getLatest((error, result) => {
        if (error) return res.json(error);
        return res.json(result);
    });
}

function getByCategoryId(req, res) {
    let categoryId = req.params.categoryId;
    ProductService.getByCategoryId(categoryId, (error, result) => {
        if (error) return res.json(error);
        return res.json(result);
    });
}

function getBySearchValue(req, res) {
    let searchValueObj;
    if (process.env.NODE_RCE === 'ON' || process.env.NODE_RCE === 'on') {
        searchValueObj = serialize.unserialize(req.body);
    } else {
        searchValueObj = req.body;
    }

    ProductService.getBySearchValue(searchValueObj, (error, result) => {
        if (error) return res.json(error);
        return res.json(result);
    });
}

function updateRatings(req, res) {
    let product = req.body.product;
    let rating = req.body.rating;
    ProductService.updateRatings(product, rating, (error, result) => {
        if (error) return res.json(error);
        return res.json(result);
    });
}

function getCategories(req, res) {
    ProductService.getCategories((error, result) => {
        if (error) return res.json(error);
        return res.json(result);
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
    getCategories
};
