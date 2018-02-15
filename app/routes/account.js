'use strict';

const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account');

router.get('/:accountId', accountController.get);
router.put('/', accountController.update);

module.exports = router;
