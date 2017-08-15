'use strict';
const db = require('../config/connection');
const account = require('../models/account');

function Owner() {
    this.list = function (query, res) {
        let count = 0;
        let where = '';
        if (query.search) {
            where = " where first_name like '%" + query.search + "%' or "+ "last_name like '%" + query.search + "%'";
        }
        db.one('select count(*) from owner' + where)
            .then(function (data) {
                count = data.count;
                db.any('select id, first_name as "firstName", last_name as "lastName", status from owner' + where +
                    ' order by ' + query.sort + ' ' + query.sortType + ' limit ' + query.limit + ' offset ' +
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
            'billing_address as "billingAddress", phone, email, payment_method as "paymentMethod", ' +
            'frequency, status, file_grp as "fileGrp" from owner where id = $1', id)
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

    this.create = function (owner, res) {
        let userPassword = {};

        if (!owner.shippingAddress) owner.shippingAddress = null;
        if (!owner.billingAddress) owner.billingAddress = null;
        if (!owner.phone) owner.phone = null;
        if (!owner.paymentMethod) owner.paymentMethod = null;
        if (!owner.frequency) owner.frequency = null;

        db.one('insert into owner (first_name, last_name, shipping_address, billing_address, phone, email, ' +
            'payment_method, frequency, status, file_grp)' + ' values (${firstName}, ${lastName}, ${shippingAddress}, ' +
            '${billingAddress}, ${phone}, ${email}, ${paymentMethod}, ${frequency}, ${status}, ${fileGrp}) ' +
            'RETURNING id', owner)
            .then(function (data) {
                if (owner.password) {
                    userPassword = account.saltHashPassword(owner.password);
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

    this.update = function (owner, res) {
        let userPassword = {};

        if (!owner.shippingAddress) owner.shippingAddress = null;
        if (!owner.billingAddress) owner.billingAddress = null;
        if (!owner.phone) owner.phone = null;
        if (!owner.paymentMethod) owner.paymentMethod = null;
        if (!owner.frequency) owner.frequency = null;

        db.none('update owner set first_name = ${firstName}, last_name = ${lastName}, ' +
            'shipping_address = ${shippingAddress}, billing_address = ${billingAddress}, phone = ${phone}, ' +
            'email = ${email}, payment_method = ${paymentMethod}, frequency = ${frequency}, status = ${status}, ' +
            'file_grp = ${fileGrp} where id = ${id}', owner)
            .then(function () {
                if (owner.password) {
                    userPassword = account.saltHashPassword(owner.password);
                    userPassword.id = owner.id;
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
        db.none('update owner set password = ${hash}, salt = ${salt} where id = ${id}', userPassword)
            .then(function () {
                //TODO Email sending
            })
            .catch(function (err, next) {
                console.log(err);
                return next(err);
            });
    };

    this.delete = function (id, res) {
        db.none('delete from owner where id = $1', [id])
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

module.exports = new Owner();
