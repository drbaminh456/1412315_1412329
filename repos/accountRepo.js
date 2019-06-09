var db = require('../fn/db');

exports.add = acc => {
    var sql = `insert into account(email, password,	first_name,last_name, birthdate) values
    ('${acc.Email}', '${acc.Password}', '${acc.First_Name}', '${acc.Last_Name}', '${acc.Birthdate}', 'subscriber')`;
    return db.save(sql);
}

// exports.getMaxID = () => {
//     var sql = `select MAX(account_id) AS idmax from account`;
//     return db.load(sql);
// }