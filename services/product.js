'use strict';

const Product = require('../models/product').Product;
const Rating = require('../models/rating').Rating;
const Question = require('../models/question').Question;
const ResponseUtil = require('../utils/response');

function get(callback) {
    // Find all products
    Product.find({})
        .then((products) => handleFindProducts(products))
        .catch((error) => {
            return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
        });
}

function getById(productId, callback) {
    // Find product by id and populate questions
    Product.findById(productId)
        .populate({
            path: 'questions._account',
            select: '_id username'
        }).exec((error, product) => {
            if (error) return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
            if (!product) return callback(ResponseUtil.createNotFoundResponse('No product found.'));
            let data = {'product': product};
            return callback(null, ResponseUtil.createSuccessResponse(data));
        });
}

function getByCategoryId(categoryId, callback) {
    // Find product by category id
    Product.find({'category._id': categoryId})
        .then((products) => handleFindProducts(products))
        .catch((error) => {
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
        .then((products) => handleFindProducts(products))
        .catch((error) => {
            return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
        });
}

function updateRatings(productObj, rating, callback) {
    let ratingObj = new Rating(rating);
    // Validate Rating
    ratingObj.validate((error) => {
        if (error) return callback(ResponseUtil.createValidationResponse(error.errors));
        // Update Existing Rating
        Product.findOneAndUpdate(
            {
                _id: productObj._id,
                'ratings._account': rating._account
            },
            {
                $set: {
                    'ratings.$.comment': rating.comment,
                    'ratings.$.value': rating.value
                }
            }, {
                new: true
            }).then((product) => {
                if (product) {
                    product.rating.value = calculateTotalRating(product.ratings);
                    product.save()
                        .then((updatedProduct) => {
                            if (!updatedProduct) return callback(ResponseUtil.createNotFoundResponse('Rating failed to save.'));
                            const data = {'product': updatedProduct};
                            return callback(null, ResponseUtil.createSuccessResponse(data, 'Rating updated successfully.'));
                        }).catch((error) => {
                            return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
                        });
                } else {
                    // Add new Rating
                    Product.findOneAndUpdate(
                        {
                            _id: productObj._id
                        }, {
                            $push: {ratings: rating}
                        }, {
                            new: true
                        }).then((product) => {
                            if (!product) return callback(ResponseUtil.createNotFoundResponse('Rating failed to save.'));
                            product.rating.value = calculateTotalRating(product.ratings);
                            product.save()
                                .then((updatedProduct) => {
                                    if (!updatedProduct) return callback(ResponseUtil.createNotFoundResponse('Rating failed to save.'));
                                    const data = {'product': updatedProduct};
                                    return callback(null, ResponseUtil.createSuccessResponse(data, 'Rating saved successfully.'));
                                }).catch((error) => {
                                    return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
                                });
                        }).catch((error) => {
                            return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
                        });
                }
            }).catch((error) => {
                return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
            });
    });
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
    questionObj.validate((error) => {
        if (error) return callback(ResponseUtil.createValidationResponse(error.errors));
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
        }).exec((error, product) => {
            if (error) return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
            if (!product) return callback(ResponseUtil.createNotFoundResponse('Question failed to save.'));
            const data = {'product': product};
            return callback(null, ResponseUtil.createSuccessResponse(data, 'Question saved successfully.'));
        });
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

function handleFindProducts(products, callback) {
    if (!products) return callback(ResponseUtil.createNotFoundResponse('No products found.'));
    let data = {'products': products};
    return callback(null, ResponseUtil.createSuccessResponse(data));
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
