'use strict';
const db = require('../config/connection');
const multer = require("multer");
const fs = require('fs');

function FileList() {

    this.get = function (fileGrp, res) {
        db.any('select filename from attach where group_id = $1', fileGrp)
            .then(function (data) {
                res.status(200)
                    .json({
                        status: '200',
                        data: data,
                        message: 'Retrieved All'
                    });
            })
            .catch(function (err) {
                console.log(err);
                res.status(500).send(err);
            });
    };

    this.create = function (req, res) {
        let fileList = [];
        let storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, '../upload/files');
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + '-' + file.originalname);
            }
        });
        let upload = multer({storage: storage}).array('files');

        upload(req, res, function (err) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {

                db.one("select nextval('attach_group_id_seq')")
                    .then(function (data) {
                        let groupId = data.nextval;
                        let grp = null;
                        if(req.body.fileGrp){
                            groupId = req.body.fileGrp;
                        }
                        for (let i = 0; i < req.files.length; i++) {
                            let filename = req.files[i].filename;

                            db.none('insert into attach (group_id, filename, type) values ($1, $2, $3)',
                                [groupId, filename, req.body.type, grp])
                                .catch(function (err) {
                                    console.log(err);
                                    res.status(500).send(err);
                                });
                            fileList[i] = filename;
                        }
                        res.status(200)
                            .json({
                                status: '201',
                                data: {
                                    groupId: groupId,
                                    fileList: fileList
                                },
                                message: 'Inserted ' + fileList.length + ' file(s)'
                            });
                    })
                    .catch(function (err) {
                        console.log(err);
                        res.status(500).send(err);
                    });
            }
        });
    };

    this.delete = function (filename, res) {

        fs.exists('../upload/files/' + filename, function (exists) {
            if (exists) {
                fs.unlinkSync('../upload/files/' + filename);
            } else {
                console.log('File not found.');
            }
        });

        db.none('delete from attach where filename = $1', filename)
            .then(function () {
                res.status(200)
                    .json({
                        status: '204',
                        message: 'Deleted one'
                    });
            })
            .catch(function (err) {
                console.log(err);
                res.status(500).send(err);
            });
    };

}

module.exports = new FileList();
