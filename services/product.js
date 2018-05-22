'use strict';

const Product = require('../models/product').Product;
const Rating = require('../models/rating').Rating;
const Question = require('../models/question').Question;
const ResponseUtil = require('../utils/response');

function get(callback) {
    Product.find({}, (error, result) => handleFindProducts(error, result, callback));
}

function getById(productId, callback) {
    Product.findById(productId).populate({
        path: 'questions._account',
        select: '_id username'
    }).exec((error, result) => {
        if (error) return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
        if (!result) return callback(ResponseUtil.createNotFoundResponse('No product found.'));
        result = {'product': result};
        return callback(null, ResponseUtil.createSuccessResponse(result));
    });
}

function getTopRated(callback) {
    Product.find({}, (error, result) => handleFindProducts(error, result, callback));
}

function getLatest(callback) {
    Product.find({}, (error, result) => handleFindProducts(error, result, callback));
}

function getByCategoryId(categoryId, callback) {
    Product.find({'category._id': categoryId}, (error, result) => handleFindProducts(error, result, callback));
}

function getBySearchValue(searchValueObj, callback) {
    Product.find({
        $or: [
            {name: new RegExp(searchValueObj.searchValue, "i")},
            {'category.name': new RegExp(searchValueObj.searchValue, "i")}
        ]
    }, (error, result) => handleFindProducts(error, result, callback));
}

function updateRatings(product, rating, callback) {
    let ratingObj = new Rating(rating);
    ratingObj.validate((error) => {
        if (error) return callback(ResponseUtil.createValidationResponse(error.errors));
            Product.findOneAndUpdate(
                {_id: product._id, 'ratings._account': rating._account},
                {$set: {'ratings.$.comment': rating.comment, 'ratings.$.value': rating.value}},
                {new: true},
                (error, result) => {
                    if (error) return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
                    if (result) {
                        result.rating.value = calculateTotalRating(result.ratings);
                        result.save((error, result) => {
                            if (error) return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
                            result = {'product': result};
                            return callback(null, ResponseUtil.createSuccessResponse(result, 'Rating updated successfully.'));
                        });
                    } else {
                        Product.findOneAndUpdate(
                            {_id: product._id},
                            {$push: {ratings: rating}},
                            {new: true},
                            (error, result) => {
                                if (error) return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
                                if (!result) return callback(ResponseUtil.createNotFoundResponse('Rating failed to save.'));
                                result.rating.value = calculateTotalRating(result.ratings);
                                result.save((error, result) => {
                                    if (error) return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
                                    result = {'product': result};
                                    return callback(null, ResponseUtil.createSuccessResponse(result, 'Rating saved successfully.'));
                                });
                            });
                    }
            });
    });
}

function getCategories(callback) {
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
        }], (error, result) => {
            if (error) return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
            if (!result) return callback(ResponseUtil.createNotFoundResponse('No categories found.'));
            result = {'categories': result};
            return callback(null, ResponseUtil.createSuccessResponse(result));
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

function insertQuestion(productId, question, callback) {
    let questionObj = new Question(question);
    questionObj.validate((error) => {
        if (error) return callback(ResponseUtil.createValidationResponse(error.errors));
        Product.findOneAndUpdate(
            {_id: productId},
            {$push: {questions: questionObj}},
            {new: true})
        .populate({
            path: 'questions._account',
            select: '_id username'
        }).exec((error, result) => {
            if (error) return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
            if (!result) return callback(ResponseUtil.createNotFoundResponse('Question failed to save.'));
            result = {'product': result};
            return callback(null, ResponseUtil.createSuccessResponse(result, 'Question saved successfully.'));
        });
    });
}

function handleFindProducts(error, result, callback) {
    if (error) return callback(ResponseUtil.createErrorResponse(error, 'Something went wrong.'));
    if (!result) return callback(ResponseUtil.createNotFoundResponse('No products found.'));
    result = {'products': result};
    return callback(null, ResponseUtil.createSuccessResponse(result));
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
