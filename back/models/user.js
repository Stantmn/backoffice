'use strict';
const db = require('../config/connection');
const account = require('../models/account');

function User() {
    this.list = function (query, res) {
        let count = 0;
        let where = '';
        if (query.search) {
            where = " where email like '%" + query.search + "%' or first_name like '%" + query.search + "%' or "+
                "last_name like '%" + query.search + "%'";
        }
        db.one('select count(*) from users' + where)
            .then(function (data) {
                count = data.count;
                db.any('select id, first_name as "firstName", last_name as "lastName", email, role from users' + where +
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
        db.one('select id, first_name as "firstName", last_name as "lastName", email, role from users where id = $1', id)
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

    this.create = function (user, res) {
        let userPassword = {};
        if (!user.role) user.role = 0;

        db.one('insert into users (first_name, last_name, email, role)' +
            ' values (${firstName}, ${lastName}, ${email}, ${role}) RETURNING id', user)
            .then(function (data) {
                account.createToken(data.id);
                if (user.password) {
                    userPassword = account.saltHashPassword(user.password);
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

    this.update = function (user, res) {
        let userPassword = {};
        db.none('update users set first_name = ${firstName}, last_name = ${lastName}, ' +
            'email = ${email}, role = ${role} where id = ${id}', user)
            .then(function () {
                if (user.password) {
                    userPassword = account.saltHashPassword(user.password);
                    userPassword.id = user.id;
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
        db.none('update users set password = ${hash}, salt = ${salt} where id = ${id}', userPassword)
            .then(function () {
                //TODO Email sending
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    this.delete = function (id, res) {
        db.none('delete from users where id = $1', [id])
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

module.exports = new User();
