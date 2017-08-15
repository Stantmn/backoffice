const express = require('express');
const account = require('../models/account');


const logins = express.Router();

logins.post('/api/login', function (req, res) {
    account.checkLogin(req.body, res);
});

logins.get('/api/login', function (req, res) {
    let token = req.get('Authorization').split(' ')[1];
    account.validateToken(token)
        .then(function (data) {
            res.status(200)
                .json({
                    status: '200',
                    data: data,
                    message: 'Validation result'
                });
        })
        .catch(function (err) {
            console.log(err);
            return next(err);
        });

});

module.exports = logins;
