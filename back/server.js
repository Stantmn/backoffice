'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const customer = require('./routes/customer');
const product = require('./routes/product');
const order = require('./routes/order');
const user = require('./routes/user');
const login = require('./routes/login');
const fileList = require('./routes/file-list');
const account = require('./models/account');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', login);

app.use(function (req, res, next) {
    let token;

    if (req.get('Authorization')) {
        token = req.get('Authorization').split(' ')[1];
        account.validateToken(token)
            .then(function (result) {
                if (result) {
                    next();
                } else {
                    res.status(403).send("You do not have rights to visit this page");
                }
            });
    }
});

//routes
app.use('/', user);
app.use('/', customer);
app.use('/', product);
app.use('/', order);
app.use('/', fileList);

app.use('*', function (req, res) {
    res.send('<h>Bad route, please try another URL</h>');
});

//Start server
const server = app.listen(8000, function () {
    console.log('Server listening on port ' + server.address().port);
});