'use strict';
const express = require('express');
const owner = require('../models/owner');
const account = require('../shared/account');

const router = express.Router();


router.get('/api/owner', function (req, res) {
    owner.list(req.query, res);
});

router.get('/api/owner/:id', function (req, res) {
    owner.get(req.params.id, res);
});

router.post('/api/owner', function (req, res) {
    owner.create(req.body, res);
});

router.put('/api/owner', function (req, res) {
    owner.update(req.body, res);
});

router.delete('/api/owner/:id', function (req, res) {
    owner.delete(req.params.id, res);
});

module.exports = router;
