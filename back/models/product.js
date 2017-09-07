'use strict';
const db = require('../config/connection');

function Product() {
    this.list = function (query, res) {
        let count = 0;
        let where = '';
        if (query.search) {
            where = " where name like '%" + query.search + "%'";
        }
        db.one('select count(*) from product' + where)
            .then(function (data) {
                count = data.count;
                db.any('select id, name, cost, category, status from product' +
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
        db.one('select id, name, category, description, cost, status, file_grp as "fileGrp" from product where id = $1', id)
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

    this.create = function (product, res) {

        if (!product.category) product.category = 0;
        if (!product.cost) product.cost = null;
        if (!product.status) product.status = 0;
        if (!product.file_grp) product.file_grp = null;

        db.one('insert into product (name, category, description, cost, status, file_grp)' +
            ' values (${name}, ${category}, ${description}, ${cost}, ${status}, ${fileGrp}) RETURNING id', product)
            .then(function (data) {
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

    this.update = function (product, res) {
        let userPassword = {};

        if (!product.category) product.category = 0;
        if (!product.cost) product.cost = null;
        if (!product.status) product.status = 0;
        if (!product.file_grp) product.file_grp = null;

        db.none('update product set name = ${name}, description = ${description}, category = ${category}, ' +
            'cost = ${cost}, status = ${status}, file_grp = ${fileGrp} where id = ${id}', product)
            .then(function () {
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

    this.delete = function (id, res) {
        db.none('delete from product where id = $1', [id])
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

module.exports = new Product();
