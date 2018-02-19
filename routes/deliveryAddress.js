'use strict';

const express = require('express');
const router = express.Router();
const deliveryAddressController = require('../controllers/deliveryAddress');

router.get('/account/:accountId', deliveryAddressController.getByAccountId);
router.get('/:deliveryAddressId', deliveryAddressController.get);
router.delete('/:deliveryAddressId', deliveryAddressController.remove);
router.put('/', deliveryAddressController.update);
router.post('/', deliveryAddressController.insert);

module.exports = router;
