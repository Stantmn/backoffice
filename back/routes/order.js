'use strict';
const express = require('express');
const order = require('../models/order');

const router = express.Router();

router.get('/api/order', function (req, res) {
    order.list(req.query, res);
});

router.delete('/api/order/:id', function (req, res) {
    order.delete(req.params.id, res);
});

module.exports = router;
