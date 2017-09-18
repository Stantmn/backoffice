'use strict';
const db = require('../config/connection');

function Order() {
    this.list = function (query, res) {
        let count = 0;
        let where = '';
        if (query.search) {
            where = " where c.first_name like '%" + query.search + "%' or c.last_name like '%" + query.search + "%' ";
        }
        db.one('select count(*) from orders o join customer c on o.customer_id = c.id ' + where)
            .then(function (data) {
                count = data.count;
                db.any('select o.id, o.customer_id as "customerId", c.first_name||\' \'||c.last_name as "customerName", ' +
                    'o.date, sum(i.price*i.count) as total, sum(i.count) as "itemCount", o.delivery_type as "deliveryType", ' +
                    'o.status from orders o ' +
                    'join customer c on o.customer_id = c.id ' +
                    'join item i on o.id = i.order_id ' +
                    where +
                    ' group by 1,2,3,4,7,8 ' +
                    'order by ' + query.sort + ' ' + query.sortType + ' limit ' + query.limit + ' offset ' +
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

    this.delete = function (id, res) {
        db.none('delete from item where order_id = $1', [id])
            .then(function () {
                db.none('delete from orders where id = $1', [id])
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
            })
            .catch(function (err) {
                console.log(err);
                res.status(500).send(err);
            });
    };

}

module.exports = new Order();
