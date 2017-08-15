'use strict';
const express = require('express');
const owner = require('../models/file-list');

const router = express.Router();


router.get('/api/file/:fileGrp', function (req, res) {
    owner.get(req.params.fileGrp, res);
});

router.post('/api/file', function (req, res) {
    owner.create(req, res);
});

router.delete('/api/file/:filename', function (req, res) {
    owner.delete(req.params.filename, res);
});

module.exports = router;
