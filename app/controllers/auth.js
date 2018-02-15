'use strict';

const AuthService = require('../services/auth');

function login(req, res) {
  let username = req.body.username;
  let password = req.body.password;

  AuthService.login(username, password, (error, result) => {
    if(error) return res.json(error);
    res.json(result);
  });
}

function register(req, res) {
  let account = req.body;
  AuthService.register(account, (error, result) => {
    if(error) return res.json(error);
    res.json(result);
  });
}

module.exports = {
  login,
  register
};