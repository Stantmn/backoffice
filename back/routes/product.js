'use strict';
const express = require('express');
const product = require('../models/product');

const router = express.Router();


router.get('/api/product', function (req, res) {
    product.list(req.query, res);
});

router.get('/api/product/:id', function (req, res) {
    product.get(req.params.id, res);
});

router.post('/api/product', function (req, res) {
    product.create(req.body, res);
});

router.put('/api/product', function (req, res) {
    product.update(req.body, res);
});

router.delete('/api/product/:id', function (req, res) {
    product.delete(req.params.id, res);
});

module.exports = router;
