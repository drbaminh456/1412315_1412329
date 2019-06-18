var db = require('../fn/db');

exports.add = acc => {
    var sql = `insert into account(email, password,	first_name, last_name, birthdate, account_type) values
    ('${acc.Email}', '${acc.Password}', '${acc.First_Name}', '${acc.Last_Name}', '${acc.Birthdate}', 'subscriber')`;
    return db.save(sql);
}
exports.login = user => {
    var sql = `select * from account where email = '${user.Email}' and password = '${user.Password}'`;
    return db.load(sql);
}
exports.changePwd = user => {
    var sql = `select password from account where email = '${user.email}'`;
    return db.load(sql);
}
exports.addNewPwd = obj => {
    var sql = `UPDATE account set password = '${obj.newPassword}' where email = '${obj.email}'`;
    return db.save(sql);
}
exports.changeInformation = obj => {
    var sql = `UPDATE IGNORE account SET first_name  = '${obj.firstname}', last_name = '${obj.lastname}', birthdate = '${obj.birthdate}'  where account_id = '${obj.id}'`;
    return db.save(sql);
}
exports.loadAll = obj => {
    var sql = `select * from account where account_id = '${obj.id}'`;
    console.log(obj);
    
    return db.load(sql);
}

exports.IsExpired = (id) => {
    var sql = `select case when (A.expired_date >= Date(NOW()))
            then 'true'
            else 'false'
            end as bool
            from account A 
            where A.account_id = '${id}'`;
    return db.load(sql);
}