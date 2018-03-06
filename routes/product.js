'use strict';

const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');


router.get('/category', productController.getCategories);
router.get('/category/:categoryId', productController.getByCategoryId);
router.get('/searchValue/:searchValue', productController.getBySearchValue);
router.get('/toprated', productController.getTopRated);
router.get('/latest', productController.getLatest);
router.post('/rating', productController.updateRatings);
router.get('/', productController.get);
router.get('/:productId', productController.getById);

module.exports = router;
