'use strict';

const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');
const GlobalConfig = require('../configs/index');
const jwt = require('express-jwt');

router.get('/category', productController.getCategories);
router.get('/category/:categoryId', productController.getByCategoryId);
router.post('/searchValue/', productController.getBySearchValue);
router.get('/toprated', productController.getTopRated);
router.get('/latest', productController.getLatest);
router.post('/rating', jwt(GlobalConfig.auth.validateOptions), productController.updateRatings);
router.get('/', productController.get);
router.post('/questions', productController.insertQuestion);
router.get('/:productId', productController.getById);

module.exports = router;
