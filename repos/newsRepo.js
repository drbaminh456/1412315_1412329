var db = require('../fn/db');
// var config = require('../config/config');

exports.singlePage = news => {
    var sql = `select * from news where id = '${news}'`;
    console.log(sql);
    return db.load(sql);
}