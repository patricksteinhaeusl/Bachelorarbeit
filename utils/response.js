'use strict';

let util = {
    createSuccessResponse: function (data, message = null) {
        return {statusCode: 200, data: data, message: message};
    },
    createNotFoundResponse: function (message = null) {
        return {statusCode: 404, data: null, message: message};
    },
    createValidationResponse: function (validationError) {
        let validations = [];

        Object.keys(validationError).forEach(function (key) {
            validations.push(validationError[key].message);
        });

        return {statusCode: 405, data: null, message: null, validations: validations};
    },
    createErrorResponse: function (message) {
        return {statusCode: 500, data: null, message: message};
    }
};

module.exports = util;
