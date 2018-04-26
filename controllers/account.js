'use strict';

const AccountService = require('../services/account');

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

function insertOrUpdateProfile(req, res) {
    let accountId = req.body.accountId;
    let profile = req.body.profile;
    AccountService.insertOrUpdateProfile(accountId, profile, (error, result) => {
        if (error) return res.json(error);
        return res.json(result);
    });
}

function getProfileByAccountId(req, res) {
    let accountId = req.params.accountId;
    AccountService.getProfileByAccountId(accountId, (error, result) => {
        if (error) return res.json(error);
        return res.json(result);
    });
}

module.exports = {
    get,
    update,
    insertOrUpdateProfile,
    getProfileByAccountId
};
