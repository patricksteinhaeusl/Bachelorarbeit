'use strict';

const Product = require('../models/product').Product;
const Rating = require('../models/rating').Rating;
const Question = require('../models/question').Question;
const ResponseUtil = require('../utils/response');

function get(callback) {
    // Find all products
    Product.find({})
        .then((products) => {
            if (!products) return callback(ResponseUtil.createNotFoundResponse('No products found.'));
            let data = {'products': products};
            return callback(null, ResponseUtil.createSuccessResponse(data));
        }).catch((error) => {
            return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
        });
}

function getById(productId, callback) {
    // Find product by id and populate questions
    Product.findById(productId)
        .populate({
            path: 'questions._account',
            select: '_id username'
        }).exec((product) => {
            if (!product) return callback(ResponseUtil.createNotFoundResponse('No product found.'));
            let data = {'product': product};
            return callback(null, ResponseUtil.createSuccessResponse(data));
        }).catch((error) => {
            return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
        });
}

function getByCategoryId(categoryId, callback) {
    // Find product by category id
    Product.find({'category._id': categoryId})
        .then((products) => {
            if (!products) return callback(ResponseUtil.createNotFoundResponse('No products found.'));
            let data = {'products': products};
            return callback(null, ResponseUtil.createSuccessResponse(data));
        }).catch((error) => {
            return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
        });
}

function getBySearchValue(searchValueObj, callback) {
    // Find product by search value
    Product.find({
            $or: [
                {name: new RegExp(searchValueObj.searchValue, "i")},
                {'category.name': new RegExp(searchValueObj.searchValue, "i")}
            ]
        }).then((products) => {
            if (!products) return callback(ResponseUtil.createNotFoundResponse('No products found.'));
            let data = {'products': products};
            return callback(null, ResponseUtil.createSuccessResponse(data));
        }).catch((error) => {
            return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
        });
}

function updateRatings(product, rating, callback) {
    let ratingObj = new Rating(rating);

    // Validate rating
    let validationError = ratingObj.validateSync();
    if (validationError) return callback(ResponseUtil.createValidationResponse(validationError));

    // Update Existing Rating
    Product.findOneAndUpdate({
            _id: product._id,
            'ratings._account': rating._account
        }, {
        $set: {
            'ratings.$': ratingObj }
        }, {
            new: true
        }).then((product) => {
            // Update total rating
            if(product) {
                product.rating.value = calculateTotalRating(product.ratings);
            }
            return product;
        }).then((product) => {
            // Add new Rating
            if(!product) {
                Product.findOneAndUpdate({
                        _id: product._id
                    }, {
                        $push: {ratings: rating}
                    }, {
                        new: true
                    }).then((newProduct) => {
                        newProduct.rating.value = calculateTotalRating(newProduct.ratings);
                    }).catch((error) => {
                        return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
                    });
            }
}

function getCategories(callback) {
    // Find all categories
    Product.aggregate(
        [{
            $group: {
                _id: '$category._id',
                name: {$first: '$category.name'}
            }
        }, {
            $sort: {
                'name': 1
            }
        }]).then((categories) => {
            if (!categories) return callback(ResponseUtil.createNotFoundResponse('No categories found.'));
            let data = {'categories': categories};
            return callback(null, ResponseUtil.createSuccessResponse(data));
        }).catch((error) => {
            return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
        });
}

function insertQuestion(productId, question, callback) {
    let questionObj = new Question(question);

    // Validate question
    const validationError = questionObj.validateSync();
    if (validationError) return callback(ResponseUtil.createValidationResponse(validationError));

    // Find product and update question and populate account
    Product.findOneAndUpdate({
            _id: productId
        }, {
            $push: {questions: questionObj}
        }, {
            new: true
        }).populate({
            path: 'questions._account',
            select: '_id username'
        }).exec((product) => {
            if (!product) return callback(ResponseUtil.createNotFoundResponse('Question failed to save.'));
            const data = {'product': product};
            return callback(null, ResponseUtil.createSuccessResponse(data, 'Question saved successfully.'));
        }).catch((error) => {
            return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
        });
}

function calculateTotalRating(ratings) {
    if (ratings.length !== 0) {
        let value = 0;
        for (let rating of ratings) {
            value += rating.value;
        }
        return value / ratings.length;
    } else {
        return 0;
    }
}

module.exports = {
    get,
    getById,
    getByCategoryId,
    getBySearchValue,
    updateRatings,
    getCategories,
    insertQuestion
};
