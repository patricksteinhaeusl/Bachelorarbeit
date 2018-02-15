'use strict';

const express = require('express');
const router = express.Router();
const creditCardController = require('../controllers/creditCard');

router.get('/account/:accountId', creditCardController.getByAccountId);
router.get('/:creditCardNumber', creditCardController.getByNumber);
router.delete('/:creditCardId', creditCardController.remove);
router.get('/', creditCardController.getAll);
router.put('/', creditCardController.update);
router.post('/', creditCardController.insert);

module.exports = router;
