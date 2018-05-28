'use strict';

const AccountService = require('../services/account');
const mime = require('mime');
const GlobalConfig = require('../configs/index');
const fs = require('fs');
const multer = require('multer');
const ResponseUtil = require('../utils/response');

const storage = multer.memoryStorage();

const Upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        if (file.mimetype !== 'text/html') {
            return callback('Only html files are allowed!');
        }
        return callback(null, true);
    }}).single('profile');

function getAll(req, res) {
    AccountService.getAll((error, result) => {
        if (error) return res.status(error.statusCode).json(error);
        return res.status(result.statusCode).json(result);
    });
}

function get(req, res) {
    let accountId = req.params.accountId;
    AccountService.get(accountId, (error, result) => {
        if (error) return res.status(error.statusCode).json(error);
        return res.status(result.statusCode).json(result);
    });
}

function update(req, res) {
    let account = req.body.account;
    AccountService.update(account, (error, result) => {
        if (error) return res.status(error.statusCode).json(error);
        return res.status(result.statusCode).json(result);
    });
}

function upload(req, res) {
    let accountId = req.body.accountId;
    let profileFile = req.file;
    let profile = profileFile.buffer.toString().replace(/<script.*>/g, '&ltscript&gt').replace(/<\/script>/g, '&lt/script&gt');
    let fileName = accountId + '.' + mime.getExtension(profileFile.mimetype);
    let filePath = GlobalConfig.accountProfile.directory + fileName;

    fs.writeFile(filePath, profile, (error) => {
        if(error) {
            return res.status(500).json(ResponseUtil.createErrorResponse('Upload failed'));
        }
        AccountService.upload(accountId, profile, (error, result) => {
            if (error) return res.status(error.statusCode).json(error);
            return res.status(result.statusCode).json(result);
        });
    });
}

function uploadFile(req, res, callback) {
    Upload(req, res, (error) => {
        if(error) {
            const errorResponse = ResponseUtil.createErrorResponse(error);
            return res.status(errorResponse.statusCode).json(errorResponse);
        }
        return callback();
    });
}

module.exports = {
    get,
    getAll,
    update,
    upload,
    uploadFile
};
