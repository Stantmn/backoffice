const db = require('../config/connection');
const crypto = require('crypto');

function AccountModel() {

    this.checkLogin = function (credentials, res) {

        db.one('select id as "userId", password, salt, token, first_name||\' \'||last_name as name from users where email = $1', credentials.email)
            .then(function (data) {

                let hash = sha512(credentials.password, data.salt);

                if (hash === data.password) {
                    let response = {
                        name: data.name,
                        token: null
                    };
                    if (data.token) {
                        response.token = data.token;
                        refreshToken(data.userId);
                        res.status(200)
                            .json({
                                status: '200',
                                data: response,
                                message: 'Success'
                            });
                    } else {
                        response.token = newToken(data.userId);
                        res.status(200)
                            .json({
                                status: '200',
                                data: response,
                                message: 'Success'
                            });
                    }
                } else {
                    res.status(403)
                        .json({
                            status: '403',
                            message: 'Authorization error'
                        });
                }

            })
            .catch(function (err) {
                console.log(err);
                if (typeof err.received !== 'undefined' && +err.received === 0) {
                    res.status(404)
                        .json({
                            status: '404',
                            message: 'User not exist'
                        });
                } else {
                    console.log(err);
                    res.status(500).send(err);
                }
            });
    };

    let newToken = function (userId) {
        let token = crypto.randomBytes(64).toString('hex');
        db.none("update users set token = $1, expired = current_timestamp + (30 ||' minutes')::interval where id = $2", [token, userId])
            .then(function () {
                //TODO write to log
            })
            .catch(function (err, next) {
                console.log(err);
                return next(err);
            });
        return token;
    };

    let refreshToken = function (userId) {
        db.none("update users set expired = current_timestamp + (30 ||' minutes')::interval where id = $1", [userId])
            .catch(function (err, next) {
                console.log(err);
                return next(err);
            });
    };

    this.createToken = function (userId) {
        return newToken(userId);
    };

    this.checkToken = function (token) {
        return db.one('select id as "userId", first_name||\' \'||last_name as name, expired from users where token = $1', token);
    };

    this.validateToken = function (token) {
        return this.checkToken(token)
            .then(function (data) {
                if (new Date(data.expired) < Date.now()) {
                    refreshToken(data.userId);
                }
                return true;
            })
            .catch(function (err) {
                console.log(err);
                return false;
            });

    };

    let genRandomString = function (length) {
        return crypto.randomBytes(Math.ceil(length / 2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0, length);
        /** return required number of characters */
    };

    let sha512 = function (password, salt) {
        let hash = crypto.createHmac('sha512', salt);
        /** Hashing algorithm sha512 */
        hash.update(password);
        return hash.digest('hex');
    };

    this.saltHashPassword = function (password) {
        let salt = genRandomString(16);
        /** Gives us salt of length 16 */
        let hash = sha512(password, salt);
        return {
            password: password,
            salt: salt,
            hash: hash
        };
    };

}

module.exports = new AccountModel();
