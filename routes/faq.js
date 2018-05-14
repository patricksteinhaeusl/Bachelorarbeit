'use strict';

const express = require('express');
const router = express.Router();
const FaqController = require('../controllers/faq');

router.get('/', FaqController.get);
router.post('/searchValue/', FaqController.getFaqBySearchValue);

module.exports = router;
