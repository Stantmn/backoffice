const user = require('../models/user');
const express = require('express');

const users = express.Router();

users.get('/api/user', function (req, res) {
    user.list(req.query, res);
});

users.get('/api/user/:id', function (req, res) {
    user.get(req.params.id, res);
});

users.post('/api/user', function (req, res) {
    user.create(req.body, res);
});

users.put('/api/user', function (req, res) {
    user.update(req.body, res);
});

users.delete('/api/user/:id', function (req, res) {
    user.delete(req.params.id, res);
});

module.exports = users;
