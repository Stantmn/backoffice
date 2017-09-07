'use strict';
const db = require('../config/connection');
const account = require('../models/account');

function Customer() {
    this.list = function (query, res) {
        let count = 0;
        let where = '';
        if (query.search) {
            where = " where email like '%" + query.search + "%' or first_name like '%" + query.search + "%' or last_name like '%" + query.search + "%'";
        }
        db.one('select count(*) from customer' + where)
            .then(function (data) {
                count = data.count;
                db.any('select id, first_name as "firstName", last_name as "lastName", email, status from customer' +
                    where + ' order by ' + query.sort + ' ' + query.sortType + ' limit ' + query.limit + ' offset ' +
                    (query.page - 1) * query.limit)
                    .then(function (data) {
                        res.status(200)
                            .json({
                                count: count,
                                data: data,
                                message: 'Retrieved ALL'
                            });
                    })
                    .catch(function (err) {
                        console.log(err);
                        res.status(500).send(err);
                    });
            })
            .catch(function (err) {
                console.log(err);
                res.status(500).send(err);
            });
    };

    this.get = function (id, res) {
        db.one('select id, first_name as "firstName", last_name as "lastName", shipping_address as "shippingAddress", ' +
            'billing_address as "billingAddress", phone, email, status, file_grp as "fileGrp", shipping_different as ' +
            '"shippingDifferent" from customer ' +
            'where id = $1', id)
            .then(function (data) {
                res.status(200)
                    .json({
                        data: data,
                        message: 'Retrieved One'
                    });
            })
            .catch(function (err) {
                console.log(err);
                res.status(500).send(err);
            });
    };

    this.create = function (customer, res) {
        let userPassword = {};

        if (!customer.shippingAddress) {
            customer.shippingAddress = null;
            customer.shippingDifferent = false;
        } else {
            customer.shippingDifferent = true;
        }
        if (!customer.billingAddress) customer.billingAddress = null;
        if (!customer.phone) customer.phone = null;
        if (!customer.fileGrp) customer.fileGrp = null;

        db.one('insert into customer (first_name, last_name, shipping_address, billing_address, phone, email, ' +
            'status, file_grp, shipping_different)' + ' values (${firstName}, ${lastName}, ${shippingAddress}, ' +
            '${billingAddress}, ${phone}, ${email}, ${status}, ${fileGrp}), ${shippingDifferent} ' +
            'RETURNING id', customer)
            .then(function (data) {
                if (customer.password) {
                    userPassword = account.saltHashPassword(customer.password);
                    userPassword.id = data.id;
                    savePassword(userPassword);
                }

                res.status(201)
                    .json({
                        data: data,
                        message: 'Inserted one'
                    });
            })
            .catch(function (err) {
                console.log(err);
                res.status(500).send(err);
            });
    };

    this.update = function (customer, res) {
        let userPassword = {};

        if (!customer.shippingAddress) {
            customer.shippingAddress = null;
            customer.shippingDifferent = false;
        } else {
            customer.shippingDifferent = true;
        }
        if (!customer.billingAddress) customer.billingAddress = null;
        if (!customer.phone) customer.phone = null;
        if (!customer.paymentMethod) customer.paymentMethod = null;
        if (!customer.frequency) customer.frequency = null;

        db.none('update customer set first_name = ${firstName}, last_name = ${lastName}, ' +
            'shipping_address = ${shippingAddress}, billing_address = ${billingAddress}, phone = ${phone}, ' +
            'email = ${email}, status = ${status}, ' +
            'file_grp = ${fileGrp}, shipping_different = ${shippingDifferent} where id = ${id}', customer)
            .then(function () {
                if (customer.password) {
                    userPassword = account.saltHashPassword(customer.password);
                    userPassword.id = customer.id;
                    savePassword(userPassword);
                }

                res.status(204)
                    .json({
                        message: 'Updated one'
                    });
            })
            .catch(function (err) {
                console.log(err);
                res.status(500).send(err);
            });
    };

    let savePassword = function (userPassword) {
        db.none('update customer set password = ${hash}, salt = ${salt} where id = ${id}', userPassword)
            .then(function () {
                //TODO Email sending
            })
            .catch(function (err, next) {
                console.log(err);
                return next(err);
            });
    };

    this.delete = function (id, res) {
        db.none('delete from customer where id = $1', [id])
            .then(function () {
                res.status(204)
                    .json({
                        message: 'Deleted one'
                    });
            })
            .catch(function (err) {
                console.log(err);
                res.status(500).send(err);
            });
    };

}

module.exports = new Customer();
