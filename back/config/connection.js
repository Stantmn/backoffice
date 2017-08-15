const pgp = require('pg-promise')();

const cn = {
    host: 'localhost',
    port: 5432,
    database: 'shop',
    user: 'postgres',
    password: 'postgres'
};

const db = pgp(cn);

db.connect()
    .then(function () {
        console.log("DB connect OK");
    })
    .catch(function (error) {
        console.log(error);
    });

module.exports = db;