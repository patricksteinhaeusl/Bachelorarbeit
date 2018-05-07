'use strict';

const Product = require('../models/product').Product;
const Rating = require('../models/rating').Rating;
const Question = require('../models/question').Question;
const ResponseUtil = require('../utils/response');

function get(callback) {
    Product.find({}, function (error, result) {
        if (error) return callback(ResponseUtil.createErrorResponse(error));
        if (!result) return callback(ResponseUtil.createNotFoundResponse());
        result = {'products': result};
        return callback(null, ResponseUtil.createSuccessResponse(result));
    });
}

function getById(productId, callback) {
    Product.findById(productId, function (error, result) {
        if (error) return callback(ResponseUtil.createErrorResponse(error));
        if (!result) return callback(ResponseUtil.createNotFoundResponse());
        result = {'product': result};
        return callback(null, ResponseUtil.createSuccessResponse(result));
    });
}

function getTopRated(callback) {
    Product.find({}, function (error, result) {
        if (error) return callback(ResponseUtil.createErrorResponse(error));
        if (!result) return callback(ResponseUtil.createNotFoundResponse());
        result = {'products': result};
        return callback(null, ResponseUtil.createSuccessResponse(result));
    });
}

function getLatest(callback) {
    Product.find({}, function (error, result) {
        if (error) return callback(ResponseUtil.createErrorResponse(error));
        if (!result) return callback(ResponseUtil.createNotFoundResponse());
        result = {'products': result};
        return callback(null, ResponseUtil.createSuccessResponse(result));
    });
}


function getByCategoryId(categoryId, callback) {
    Product.find({'category._id': categoryId}, function (error, result) {
        if (error) return callback(ResponseUtil.createErrorResponse(error));
        if (!result) return callback(ResponseUtil.createNotFoundResponse());
        result = {'products': result};
        return callback(null, ResponseUtil.createSuccessResponse(result));
    });
}

function getBySearchValue(searchValueObj, callback) {
    Product.find({
        $or: [
            {name: new RegExp(searchValueObj.searchValue, "i")},
            {'category.name': new RegExp(searchValueObj.searchValue, "i")}
        ]
    }, function (error, result) {
        if (error) return callback(ResponseUtil.createErrorResponse(error));
        if (!result) return callback(ResponseUtil.createNotFoundResponse());
        result = {'products': result};
        return callback(null, ResponseUtil.createSuccessResponse(result));
    });
}

function updateRatings(product, rating, callback) {
    let ratingObj = new Rating(rating);
    ratingObj.validate(function (error) {
        if (error) return callback(ResponseUtil.createValidationResponse(error.errors));
            Product.findOneAndUpdate(
                {_id: product._id, 'ratings._account': rating._account},
                {$set: {'ratings.$.comment': rating.comment, 'ratings.$.value': rating.value}},
                {new: true},
                function (error, result) {
                    if (error) return callback(ResponseUtil.createErrorResponse(error));
                    if (result) {
                        result.rating.value = calculateTotalRating(result.ratings);
                        result.save(function(error, result) {
                            result = {'product': result};
                            return callback(null, ResponseUtil.createSuccessResponse(result, 'Rating updated successfully.'));
                        });
                    } else {
                        Product.findOneAndUpdate(
                            {_id: product._id},
                            {$push: {ratings: rating}},
                            {new: true},
                            function (error, result) {
                                if (error) return callback(ResponseUtil.createErrorResponse(error));
                                if (!result) return callback(ResponseUtil.createNotFoundResponse());
                                result.rating.value = calculateTotalRating(result.ratings);
                                result.save(function(error, result) {
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
        }], function (error, result) {
            if (error) return callback(ResponseUtil.createErrorResponse(error));
            if (!result) return callback(ResponseUtil.createNotFoundResponse());
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
    questionObj.validate(function (error) {
        if (error) return callback(ResponseUtil.createValidationResponse(error.errors));
        Product.findOneAndUpdate(
            {_id: productId},
            {$push: {questions: questionObj}},
            {new: true},
            function (error, result) {
                if (error) return callback(ResponseUtil.createErrorResponse(error));
                if (!result) return callback(ResponseUtil.createNotFoundResponse());
                result = {'product': result};
                return callback(null, ResponseUtil.createSuccessResponse(result, 'Question saved successfully.'));
            });
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
