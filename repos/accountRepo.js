var db = require('../fn/db');

exports.add = acc => {
    var sql = `insert into account(email, password,	first_name,last_name, birthdate, account_type) values
    ('${acc.Email}', '${acc.Password}', '${acc.First_Name}', '${acc.Last_Name}', '${acc.Birthdate}', 'subscriber')`;
    return db.save(sql);
}
exports.login = user => {
    var sql = `select * from account where email = '${user.Email}' and password = '${user.Password}'`;
    return db.load(sql);
}