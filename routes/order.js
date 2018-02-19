'use strict';

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');

router.post('/create', orderController.create);
router.get('/account/:accountId', orderController.getByAccountId);
router.put('/', orderController.update);
router.post('/', orderController.insert);
router.delete('/:orderId', orderController.remove);
router.get('/:orderId', orderController.get);

module.exports = router;
