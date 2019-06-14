var db = require('../fn/db');
// var config = require('../config/config');

exports.singlePage = news => {
    var sql = `select *
                from news N, account A, news_subcategory NS, sub_category S, category C
                where N.news_id = '${news}' and N.Writer_ID = A.account_id and NS.News_ID = N.news_id and S.id = NS.Subcategory_ID
                    and S.parentCategoryId = C.category_id`;
    return db.load(sql);
}

exports.LoadTag = news => {
    var sql = `select t.Tag_Name, t.Tag_ID
                from news N, tag T, news_tag NT
                where N.news_id = '${news}' and N.news_id = NT.News_ID and t.Tag_ID = NT.Tag_ID`;
    return db.load(sql);
}

exports.LoadRandSameCategory = news  => {
    var sql = `select N2.news_id, N2.Title, N2.Summary, N2.Date, S2.subcat_name, A.last_name, A.first_name, N2.Thumbnail_image
                from news N1, news_subcategory NS1, sub_category S1, category C1, news N2, news_subcategory NS2, sub_category S2, category C2, account A
                where N1.news_id = '${news}' and NS1.News_ID = N1.news_id and S1.id = NS1.Subcategory_ID
                    and S1.parentCategoryId = C1.category_id
                    and C1.category_id = C2.category_id and NS2.News_ID = N2.news_id and S2.id = NS2.Subcategory_ID
                    and S2.parentCategoryId = C2.category_id
                    and N2.Writer_ID = A.account_id
                order by RAND()
                limit 3`;
    return db.load(sql);
}

exports.LoadTopStories = () => {
    var sql = `select *
                from news
                order by Views DESC
                limit 10`;
    return db.load(sql);
}

exports.LoadRandStories = () => {
    var sql = `select *
                from news
                order by RAND()
                limit 1`;
    return db.load(sql);
}

