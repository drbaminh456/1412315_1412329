var db = require('../fn/db');
// var config = require('../config/config');

exports.singlePage = news => {
    var sql = `select *
                from news N, account A, news_subcategory NS, sub_category S
                where N.news_id = '${news}' and N.Writer_ID = A.account_id and NS.News_ID = N.news_id and S.id = NS.Subcategory_ID`;
    return db.load(sql);
}

exports.LoadTag = news => {
    var sql = `select t.Tag_Name, t.Tag_ID
                from news N, tag T, news_tag NT
                where N.news_id = '${news}' and N.news_id = NT.News_ID and t.Tag_ID = NT.Tag_ID`;
    console.log(sql);
    return db.load(sql);
}