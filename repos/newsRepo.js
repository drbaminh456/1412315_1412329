var db = require('../fn/db');
// var config = require('../config/config');

// exports.singlePage = news => {
//     var sql = `select *
//                 from news N, account A, news_subcategory NS, sub_category S, category C
//                 where N.news_id = '${news}' and N.Writer_ID = A.account_id and NS.News_ID = N.news_id and S.id = NS.Subcategory_ID
//                     and S.parentCategoryId = C.category_id`;
//     return db.load(sql);
// }

exports.single = proId => {
    var sql = `select * from news where news_id = ${proId}`;
    return db.load(sql);
}

exports.singlePage = news => {
    var sql = `select N.news_id, N.Title, N.Summary, N.Writer_ID, N.Views, N.Thumbnail_image, DATE_FORMAT(N.Date,"%W, %M %D, %Y") as Date, N.Content, N.Status, A.first_name, A.last_name, A.account_id, A.nickname, 
                    NS.Subcategory_ID, S.subcat_name, S.parentCategoryId, C.category_id, C.cat_name
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

exports.LoadRandSameCategory = news => {
    var sql = `select N2.news_id, N2.Title, N2.Summary, DATE_FORMAT(N2.Date, "%b %e, %Y") AS Date, S2.subcat_name, A.last_name, A.first_name, A.nickname, N2.Thumbnail_image
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
    var sql = `select N.news_id, N.Title, N.Summary, N.Writer_ID, N.Views, N.Thumbnail_image, DATE_FORMAT(N.Date,"%W, %M %D, %Y") as Date, N.Content, N.Status
                from news N
                order by Views DESC
                limit 10`;
    return db.load(sql);
}

exports.LoadRandStories = () => {
    var sql = `select N.news_id, N.Title, N.Summary, N.Writer_ID, N.Views, N.Thumbnail_image, DATE_FORMAT(N.Date,"%W, %M %D, %Y") as Date, N.Content, N.Status
                from news N
                order by RAND()
                limit 1`;
    return db.load(sql);
}

exports.updateView = (id, view) => {
    var sql = `update news set Views = '${view}'
    where news_id = '${id}'`;
    return db.save(sql);
}

exports.SearchSameCategory = categoryname => {
    var sql = `select N1.news_id, N1.Title, N1.Summary, DATE_FORMAT(N1.Date, "%b %e, %Y") AS Date, S1.subcat_name, A.last_name, A.first_name, A.nickname, N1.Thumbnail_image
                from news N1, news_subcategory NS1, sub_category S1, category C1, account A
                where N1.news_id = NS1.News_ID and NS1.Subcategory_ID = S1.id
                    and S1.parentCategoryId = C1.category_id
                    and C1.cat_name = '${categoryname}'
                    and N1.Writer_ID = A.account_id
                order by RAND()
                limit 3`;
    return db.load(sql);
}

exports.SearchSameTag = tagname => {
    var sql = `select N1.news_id, N1.Title, N1.Summary, DATE_FORMAT(N1.Date, "%b %e, %Y") AS Date, S1.subcat_name, A.last_name, A.first_name, A.nickname, N1.Thumbnail_image, T.Tag_Name
                from news N1, news_subcategory NS1, sub_category S1, category C1, account A, tag T, news_tag NT
                where N1.news_id = NS1.News_ID and NS1.Subcategory_ID = S1.id
                    and S1.parentCategoryId = C1.category_id
                    and N1.news_id = NT.News_ID and NT.Tag_ID = T.Tag_ID
                    and N1.Writer_ID = A.account_id
                    and T.Tag_Name = '${tagname}'
                order by RAND()
                limit 3`;
    return db.load(sql);
}

exports.LoadCategoryList = () => {
    var sql = `select category_id, cat_name
                from category
                order by category_id ASC
                limit 6`;
    return db.load(sql);
}

exports.LoadSubCategoryList = () => {
    var sql = `select distinct C.category_id, C.cat_name, S.id, S.parentCategoryId, S.subcat_name
                from category C, sub_category S
                where C.category_id = S.parentCategoryId
                order by C.category_id ASC`;
    return db.load(sql);
}

exports.SearchFTS = searchphrase => {
    var sql = `select N.news_id, N.Title, N.Summary, DATE_FORMAT(N.Date, "%b %e, %Y") AS Date, A.last_name, A.first_name, A.nickname, N.Thumbnail_image
                from news N, account A
                where N.Writer_ID = A.account_id and match (Title, Content, Summary) AGAINST ('${searchphrase}' IN NATURAL LANGUAGE MODE)
                order by N.Date DESC`;
    return db.load(sql);
}

exports.CountSearchResult = searchphrase => {
    var sql = `select Count(news_id)
                        from news
                        where match (Title, Content, Summary) AGAINST ('${searchphrase}' IN NATURAL LANGUAGE MODE)`;
    return db.load(sql);
}

exports.saveNews = obj => {
    var sql = `insert IGNORE  into news(Title, Summary,	Content, Writer_ID, Date, Status, Premium) values
    ('${obj.title}', '${obj.summary}', '${obj.content}', '${obj.date}', '${obj.writerId}', 'Not yet approved', '0')`;
    return db.save(sql);
}
