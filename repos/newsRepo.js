var db = require('../fn/db');
var config = require('../config/config');

exports.single = newsId => {
    var sql = `select * from news where id = ${newsId}`;
    return db.load(sql);
}