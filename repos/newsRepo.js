var db = require('../fn/db');
var config = require('../config/config')
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
                    N.Subcat_ID, S.subcat_name, S.parentCategoryId, C.category_id, C.cat_name
                from news N, account A, sub_category S, category C
                where N.news_id = '${news}' and N.Writer_ID = A.account_id and N.Subcat_ID = S.id
                    and S.parentCategoryId = C.category_id`;
    return db.load(sql);
}

// exports.LoadTag = news => {
//     var sql = `select t.Tag_Name, t.Tag_ID
//                 from news N, tag T, news_tag NT
//                 where N.news_id = '${news}' and N.news_id = NT.News_ID and t.Tag_ID = NT.Tag_ID`;
//     return db.load(sql);
// }

exports.LoadTag = news => {
    var sql = `select T.Tag_Name, T.Tag_ID
                from (SELECT
                            news_id, tag1 as Tag_ID
                        FROM
                            (SELECT news_id,Tag_ID,
                                SUBSTRING_INDEX(Tag_ID, ';', 1) AS tag1,
                                SUBSTRING_INDEX(SUBSTRING_INDEX(Tag_ID, ';', 2), ';', -1) AS tag2,
                                SUBSTRING_INDEX(SUBSTRING_INDEX(Tag_ID, ';', 3), ';', -1) AS tag3,
                                SUBSTRING_INDEX(SUBSTRING_INDEX(Tag_ID, ';', 4), ';', -1) AS tag4
                                FROM news 
                                WHERE news_id = '${news}') A
                        UNION ALL 
                        SELECT
                            news_id, tag2 as Tag_ID
                        FROM
                            (SELECT news_id,Tag_ID,
                                SUBSTRING_INDEX(Tag_ID, ';', 1) AS tag1,
                                SUBSTRING_INDEX(SUBSTRING_INDEX(Tag_ID, ';', 2), ';', -1) AS tag2,
                                SUBSTRING_INDEX(SUBSTRING_INDEX(Tag_ID, ';', 3), ';', -1) AS tag3,
                                SUBSTRING_INDEX(SUBSTRING_INDEX(Tag_ID, ';', 4), ';', -1) AS tag4
                                FROM news 
                                WHERE news_id = '${news}') B 
                        UNION ALL
                        SELECT
                            news_id, tag3 as Tag_ID
                        FROM
                            (SELECT news_id,Tag_ID,
                                SUBSTRING_INDEX(Tag_ID, ';', 1) AS tag1,
                                SUBSTRING_INDEX(SUBSTRING_INDEX(Tag_ID, ';', 2), ';', -1) AS tag2,
                                SUBSTRING_INDEX(SUBSTRING_INDEX(Tag_ID, ';', 3), ';', -1) AS tag3,
                                SUBSTRING_INDEX(SUBSTRING_INDEX(Tag_ID, ';', 4), ';', -1) AS tag4
                                FROM news 
                                WHERE news_id = '${news}') C
                            UNION ALL
                        SELECT
                            news_id, tag4 as Tag_ID
                        FROM
                            (SELECT news_id,Tag_ID,
                                SUBSTRING_INDEX(Tag_ID, ';', 1) AS tag1,
                                SUBSTRING_INDEX(SUBSTRING_INDEX(Tag_ID, ';', 2), ';', -1) AS tag2,
                                SUBSTRING_INDEX(SUBSTRING_INDEX(Tag_ID, ';', 3), ';', -1) AS tag3,
                                SUBSTRING_INDEX(SUBSTRING_INDEX(Tag_ID, ';', 4), ';', -1) AS tag4
                                FROM news 
                                WHERE news_id = '${news}') D
                    ) NT, tag T
                where t.Tag_ID = NT.Tag_ID`;
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

// exports.SearchSameCategory = categoryname => {
//     var sql = `select N.news_id, N.Title, N.Summary, DATE_FORMAT(N.Date, "%b %e, %Y") AS Date, S.subcat_name, A.last_name, A.first_name, A.nickname, N.Thumbnail_image, C.cat_name
//                 from news N, sub_category S, category C, account A
//                 where C.cat_name = '${categoryname}'
//                 and S.parentCategoryId = C.category_id
//                     and N.Subcat_ID = S.id                
//                     and N.Writer_ID = A.account_id
//                 order by N.Date DESC`;
//     return db.load(sql);
// }

exports.SearchSameSubcat = subcategoryname => {
    var sql = `select N.news_id, N.Title, N.Summary, DATE_FORMAT(N.Date, "%b %e, %Y") AS Date, S.subcat_name, A.last_name, A.first_name, A.nickname, N.Thumbnail_image
                from news N, sub_category S, account A
                where N.Subcat_ID = S.id
                    and N.Writer_ID = A.account_id
                    and S.subcat_name = '${subcategoryname}'
                order by N.Date DESC`;
    return db.load(sql);
}

// exports.SearchSameTag = tagname => {
//     var sql = `select N1.news_id, N1.Title, N1.Summary, DATE_FORMAT(N1.Date, "%b %e, %Y") AS Date, S1.subcat_name, A.last_name, A.first_name, A.nickname, N1.Thumbnail_image, T.Tag_Name
//                 from news N1, news_subcategory NS1, sub_category S1, category C1, account A, tag T, news_tag NT
//                 where N1.news_id = NS1.News_ID and NS1.Subcategory_ID = S1.id
//                     and S1.parentCategoryId = C1.category_id
//                     and N1.news_id = NT.News_ID and NT.Tag_ID = T.Tag_ID
//                     and N1.Writer_ID = A.account_id
//                     and T.Tag_Name = '${tagname}'
//                 order by order by N.Date DESC`;
//     return db.load(sql);
// }

exports.SearchSameTag = tagname => {
    var sql = `select N.news_id, N.Title, N.Summary, DATE_FORMAT(N.Date, "%b %e, %Y") AS Date, A.last_name, A.first_name, A.nickname, N.Thumbnail_image, T.Tag_Name
    from news N, account A, tag T, 
                            (SELECT N.news_id As NEWS_ID 
                                FROM news N,
                                        (SELECT news_id,Tag_ID,
                                        SUBSTRING_INDEX(Tag_ID, ';', 1) AS tag1,
                                        SUBSTRING_INDEX(SUBSTRING_INDEX(Tag_ID, ';', 2), ';', -1) AS tag2,
                                        SUBSTRING_INDEX(SUBSTRING_INDEX(Tag_ID, ';', 3), ';', -1) AS tag3,
                                        SUBSTRING_INDEX(SUBSTRING_INDEX(Tag_ID, ';', 4), ';', -1) AS tag4
                                        FROM news ) NT
                                    WHERE (NT.tag1 = (Select Tag_ID
                                    From tag
                                    Where Tag_Name = '${tagname}')
                                    or NT.tag2 =(Select Tag_ID
                                        From tag
                                        Where Tag_Name = '${tagname}')
                                    or NT.tag3 =(Select Tag_ID
                                        From tag
                                        Where Tag_Name = '${tagname}')
                                    or NT.tag3 =(Select Tag_ID
                                        From tag
                                        Where Tag_Name = '${tagname}')) 
                                    and N.news_id = NT.news_id) TN
    where N.news_id = TN.NEWS_ID 
          and N.Writer_ID = A.account_id
          and T.Tag_Name = '${tagname}'
    order by N.Date DESC`;
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

exports.SearchSameCategoryWithPagination = (categoryname, offset) => {
    var sql = `select N.news_id, N.Title, N.Summary, DATE_FORMAT(N.Date, "%b %e, %Y") AS Date, S.subcat_name, A.last_name, A.first_name, A.nickname, N.Thumbnail_image, C.cat_name
                from news N, sub_category S, category C, account A
                where C.cat_name = '${categoryname}'
                and S.parentCategoryId = C.category_id
                    and N.Subcat_ID = S.id                
                    and N.Writer_ID = A.account_id
                order by N.Date DESC
                limit ${config.Limit}
                offset ${offset}`;
    return db.load(sql);
}

exports.CountSameCategory = categoryname => {
    var sql = `select count(*) as total
                from (select *
                    from news N, sub_category S, category C, account A
                    where C.cat_name = '${categoryname}'
                    and S.parentCategoryId = C.category_id
                        and N.Subcat_ID = S.id                
                        and N.Writer_ID = A.account_id) A`;

                        
    return db.load(sql);
}

exports.LoadTop3StoriesLastWeek = () => {
    var sql = `select N.news_id, N.Title, N.Summary, N.Writer_ID, N.Views, N.Thumbnail_image, DATE_FORMAT(N.Date,"%W, %M %D, %Y") as Date, N.Content, N.Status, A.nickname, C.cat_name
                from news N, account A, sub_category S, category C
                where N.Writer_ID = A.account_id
                    and N.Subcat_ID = S.id
                    and S.parentCategoryId = C.category_id
                    and N.Date >= Date(NOW()) - INTERVAL 7 DAY
                order by Views DESC
                limit 3`;
    return db.load(sql);
}

exports.LoadAllLatestNews = () => {
    var sql = `select N.news_id, N.Title, N.Summary, N.Writer_ID, N.Views, N.Thumbnail_image, DATE_FORMAT(N.Date,"%W, %M %D, %Y") as Date, N.Content, N.Status, A.nickname, C.cat_name
                from news N, account A, sub_category S, category C
                where N.Writer_ID = A.account_id
                    and N.Subcat_ID = S.id
                    and S.parentCategoryId = C.category_id
                order by N.Date DESC`;
    return db.load(sql);
}

exports.Latest10InCategory = (category) => {
    var sql = `select N.news_id, N.Title, N.Summary, DATE_FORMAT(N.Date, "%b %e, %Y") AS Date, S.subcat_name, A.last_name, A.first_name, A.nickname, N.Thumbnail_image
                from news N, sub_category S, account A, category C
                where N.Subcat_ID = S.id
                    and S.parentCategoryId = C.category_id
                    and N.Writer_ID = A.account_id
                    and C.cat_name = '${category}'
                order by N.Date DESC
                limit 10`;
    return db.load(sql);
}

exports.LatestTopViewsInCategory = (category) => {
    var sql = `select N.news_id, N.Title, N.Summary, DATE_FORMAT(N.Date, "%b %e, %Y") AS Date, S.subcat_name, A.last_name, A.first_name, A.nickname, N.Thumbnail_image, S.subcat_name
                from news N, sub_category S, account A, category C
                where N.Subcat_ID = S.id
                    and S.parentCategoryId = C.category_id
                    and N.Writer_ID = A.account_id
                    and C.cat_name = '${category}'
                order by N.Views DESC
                limit 1`;
    return db.load(sql);
}

exports.checkNotPremium = proId => {
    var sql = `select case when (N.Premium = '0') 
                then 'true'
                else 'false'
                end as bool
                from news N 
                where N.news_id = '${proId}'`;
    return db.load(sql);
}

exports.SearchFTSPremiumFirst = searchphrase => {
    var sql = `select N.news_id, N.Title, N.Summary, DATE_FORMAT(N.Date, "%b %e, %Y") AS Date, A.last_name, A.first_name, A.nickname, N.Thumbnail_image
                from news N, account A
                where N.Writer_ID = A.account_id and match (Title, Content, Summary) AGAINST ('${searchphrase}' IN NATURAL LANGUAGE MODE)
                order by N.Premium DESC, N.Date DESC`;
    return db.load(sql);
}

exports.SearchSameCategoryWithPaginationPremiumFirst = (categoryname, offset) => {
    var sql = `select N.news_id, N.Title, N.Summary, DATE_FORMAT(N.Date, "%b %e, %Y") AS Date, S.subcat_name, A.last_name, A.first_name, A.nickname, N.Thumbnail_image, C.cat_name
                from news N, sub_category S, category C, account A
                where C.cat_name = '${categoryname}'
                and S.parentCategoryId = C.category_id
                    and N.Subcat_ID = S.id                
                    and N.Writer_ID = A.account_id
                order by N.Premium DESC, N.Date DESC
                limit ${config.Limit}
                offset ${offset}`;
    return db.load(sql);
}

exports.SearchSameSubcatPremiumFirst = subcategoryname => {
    var sql = `select N.news_id, N.Title, N.Summary, DATE_FORMAT(N.Date, "%b %e, %Y") AS Date, S.subcat_name, A.last_name, A.first_name, A.nickname, N.Thumbnail_image
                from news N, sub_category S, account A
                where N.Subcat_ID = S.id
                    and N.Writer_ID = A.account_id
                    and S.subcat_name = '${subcategoryname}'
                order by N.Premium DESC, N.Date DESC`;
    return db.load(sql);
}

exports.SearchSameTagPremiumFirst = tagname => {
    var sql = `select N.news_id, N.Title, N.Summary, DATE_FORMAT(N.Date, "%b %e, %Y") AS Date, A.last_name, A.first_name, A.nickname, N.Thumbnail_image, T.Tag_Name
    from news N, account A, tag T, 
                            (SELECT N.news_id As NEWS_ID 
                                FROM news N,
                                        (SELECT news_id,Tag_ID,
                                        SUBSTRING_INDEX(Tag_ID, ';', 1) AS tag1,
                                        SUBSTRING_INDEX(SUBSTRING_INDEX(Tag_ID, ';', 2), ';', -1) AS tag2,
                                        SUBSTRING_INDEX(SUBSTRING_INDEX(Tag_ID, ';', 3), ';', -1) AS tag3,
                                        SUBSTRING_INDEX(SUBSTRING_INDEX(Tag_ID, ';', 4), ';', -1) AS tag4
                                        FROM news ) NT
                                    WHERE (NT.tag1 = (Select Tag_ID
                                    From tag
                                    Where Tag_Name = '${tagname}')
                                    or NT.tag2 =(Select Tag_ID
                                        From tag
                                        Where Tag_Name = '${tagname}')
                                    or NT.tag3 =(Select Tag_ID
                                        From tag
                                        Where Tag_Name = '${tagname}')
                                    or NT.tag3 =(Select Tag_ID
                                        From tag
                                        Where Tag_Name = '${tagname}')) 
                                    and N.news_id = NT.news_id) TN
    where N.news_id = TN.NEWS_ID 
          and N.Writer_ID = A.account_id
          and T.Tag_Name = '${tagname}'
    order by N.Premium DESC, N.Date DESC`;
    return db.load(sql);
}

exports.LoadTagList = () => {
    var sql = `select *
                from tag`;
    return db.load(sql);
}

exports.LoadCategoryList = () => {
    var sql = `select distinct category_id, cat_name
                from category
                order by category_id ASC`;
    return db.load(sql);
}

exports.LoadSubCategoryList = () => {
    var sql = `select C.category_id, C.cat_name, S.id, S.parentCategoryId, S.subcat_name
                from category C, sub_category S
                where C.category_id = S.parentCategoryId
                order by S.id ASC`;
    return db.load(sql);
}

exports.LoadAllNews = () => {
    var sql = `select N.news_id, N.Title, N.Summary, N.Writer_ID, N.Views, N.Thumbnail_image, DATE_FORMAT(N.Date,"%W, %M %D, %Y") as Date, N.Content, N.Status, A.nickname, C.cat_name, N.Premium, S.subcat_name, B.nickname as Editor
                from news N, account A, sub_category S, category C, editor_category_managements EC, account B
                where N.Writer_ID = A.account_id
                    and N.Subcat_ID = S.id
                    and S.parentCategoryId = C.category_id
                    and C.category_id = EC.Category_ID
                    and EC.Editor_ID = B.account_id
                order by N.news_id`;
    return db.load(sql);
}

exports.LoadAllEditor = () => {
    var sql =`select *
                from account
                where account_type = 'editor'`;
    return db.load(sql);
}

exports.LoadAllWriter = () => {
    var sql =`select *
                from account
                where account_type = 'writer'`;
    return db.load(sql);
}

exports.LoadAllSubscriber = () => {
    var sql =`select *
                from account
                where account_type = 'subscriber'`;
    return db.load(sql);
}

exports.LoadAllNewsInEditorCategory = (id) => {
    var sql =`select distinct N.news_id, N.Title, N.Summary, N.Writer_ID, N.Views, N.Thumbnail_image, DATE_FORMAT(N.Date,"%W, %M %D, %Y") as Date, N.Content, N.Status, A.nickname as Writer, C.cat_name, S.subcat_name
                from news N, account E, account A, sub_category S, category C, editor_category_managements EC
                where N.Writer_ID = A.account_id
                    and N.Subcat_ID = S.id
                    and S.parentCategoryId = C.category_id
                    and C.category_id = EC.Category_ID
                    and EC.Editor_ID = '${id.id}'`;
    console.log(sql);
    
    return db.load(sql);
}