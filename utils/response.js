'use strict';

const log = require('../utils/log');


let util = {
    createSuccessResponse: (data, message = null) => {
        return {statusCode: 200, data: data, message: message};
    },
    createNotFoundResponse: (message = null) => {
        return {statusCode: 404, data: null, message: message};
    },
    createValidationResponse: (validationError) => {
        let validations = [];

        Object.keys(validationError).forEach((key) => {
            validations.push(validationError[key].message);
        });

        return {statusCode: 405, data: null, message: null, validations: validations};
    },
    createErrorResponse: (error, message) => {
        log.writeError(error);
        const errorText = message ? message : error;
        return {statusCode: 500, data: null, message: errorText};
    }
};

module.exports = util;
