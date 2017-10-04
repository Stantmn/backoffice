'use strict';
const express = require('express');
const order = require('../models/order');

const router = express.Router();

router.get('/api/order', function (req, res) {
    order.list(req.query, res);
});

router.get('/api/order/:id', function (req, res) {
    order.get(req.params.id, res);
});

router.put('/api/order', function (req, res) {
    order.update(req.body, res);
});

router.delete('/api/order/:id', function (req, res) {
    order.delete(req.params.id, res);
});

module.exports = router;
