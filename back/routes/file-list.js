'use strict';
const express = require('express');
const files = require('../models/file-list');

const router = express.Router();


router.get('/api/file/:fileGrp', function (req, res) {
    files.get(req.params.fileGrp, res);
});

router.post('/api/file', function (req, res) {
    files.create(req, res);
});

router.delete('/api/file/:filename', function (req, res) {
    files.delete(req.params.filename, res);
});

module.exports = router;
