'use strict';
const express = require('express');
const customer = require('../models/customer');
const account = require('../shared/account');

const router = express.Router();


router.get('/api/customer', function (req, res) {
    customer.list(req.query, res);
});

router.get('/api/customer/:id', function (req, res) {
    customer.get(req.params.id, res);
});

router.post('/api/customer', function (req, res) {
    customer.create(req.body, res);
});

router.put('/api/customer', function (req, res) {
    customer.update(req.body, res);
});

router.delete('/api/customer/:id', function (req, res) {
    customer.delete(req.params.id, res);
});

module.exports = router;
