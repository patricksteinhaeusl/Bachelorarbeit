'use strict';

const AccountService = require('../services/account');
const mime = require('mime');
const GlobalConfig = require('../configs/index');
const fs = require('fs');
const ResponseUtil = require('../utils/response');

function get(req, res) {
    let accountId = req.params.accountId;
    AccountService.get(accountId, (error, result) => {
        if (error) return res.json(error);
        return res.json(result);
    });
}

function update(req, res) {
    let account = req.body.account;
    AccountService.update(account, (error, result) => {
        if (error) return res.json(error);
        return res.json(result);
    });
}

function upload(req, res) {
    let accountId = req.body.accountId;
    let profileFile = req.file;
    let profile = profileFile.buffer.toString().replace(/<script.*>/g, '&ltscript&gt').replace(/<\/script>/g, '&lt/script&gt');
    let fileName = accountId + '.' + mime.getExtension(profileFile.mimetype);
    let filePath = GlobalConfig.accountProfile.directory + fileName;

    fs.writeFile(filePath, profile, function(error) {
        if(error) {
            return res.status(500).json(ResponseUtil.createErrorResponse('Upload failed'));
        }
        AccountService.upload(accountId, profile, (error, result) => {
            if (error) return res.json(error);
            return res.json(result);
        });
    });
}

module.exports = {
    get,
    update,
    upload
};
