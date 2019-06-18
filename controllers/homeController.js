var express = require('express');
var router = express.Router();
var newsRepo = require('../repos/newsRepo');
var accountRepo = require('../repos/accountRepo');
var SHA256 = require('crypto-js/sha256');
var config = require('../config/config')

function formatDate(date) {

  var monthNames = [
    "01", "02", "03",
    "06", "05", "06", "07",
    "08", "09", "10",
    "11", "12"
  ];
  if (date != null) {

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();


  } else {
    var day = '';
    var monthIndex = '';
    var year = '';
    return null;
  }

  return monthNames[monthIndex] + ' ' + day + ', ' + year;
}
//#region Sample Code
// router.get('/news-search/bytag/:tag', (req, res) => {
//   var newstags = req.params.tag;
//   var t1 = newsRepo.SearchSameTag(newstags);
//   var t2 = newsRepo.LoadTopStories();
//   Promise.all([t1, t2]).then(([news, topSto]) => {
//     var vm = {
//       newsS: news,
//       topStoS: topSto,
//       layout: 'page.handlebars',
//     };
//     res.render('page/tag', vm);
//   })

// });
//#endregion

/* GET home page. */
// router.get('/', (req, res) => {
//   var vm = {
//     layout: 'main.handlebars'
//   };
//   res.render('home/home', vm);
// });

router.get('/', (req, res) => {
  var t1 = newsRepo.LoadRandStories();
  var t2 = newsRepo.LoadTopStories();
  var t3 = newsRepo.LoadTop3StoriesLastWeek();
  var t4 = newsRepo.LoadAllLatestNews();
  var ta = newsRepo.Latest10InCategory('Kinh doanh');//-----> can't figure out how to get this phrase from tab content, so this is how we'll go
  var tb = newsRepo.Latest10InCategory('Thế giới');
  var tc = newsRepo.Latest10InCategory('Văn hóa - Xã hội');
  var td = newsRepo.Latest10InCategory('Đời sống');
  var te = newsRepo.Latest10InCategory('Thể thao');
  var tf = newsRepo.Latest10InCategory('Giáo dục');
  var ta1 = newsRepo.LatestTopViewsInCategory('Kinh doanh');
  var tb1 = newsRepo.LatestTopViewsInCategory('Thế giới');
  var tc1 = newsRepo.LatestTopViewsInCategory('Văn hóa - Xã hội');
  var td1 = newsRepo.LatestTopViewsInCategory('Đời sống');
  var te1 = newsRepo.LatestTopViewsInCategory('Thể thao');
  var tf1 = newsRepo.LatestTopViewsInCategory('Giáo dục');

  Promise.all([t1, t2, t3, t4, ta, tb, tc, td, te, tf, ta1, tb1, tc1, td1, te1, tf1]).then(([ranSto, topSto, top3, allLatest, kinhDoanh2, theGioi2, VHXH2, doiSong2, theThao2, giaoDuc2, kinhDoanh1, theGioi1, VHXH1, doiSong1, theThao1, giaoDuc1]) => {
    var vm = {
      ranStoS: ranSto,
      topStoS: topSto,
      top3S: top3,
      allLatestS: allLatest,
      kinhDoanh2S: kinhDoanh2,
      theGioi2S: theGioi2,
      VHXH2S: VHXH2,
      doiSong2S: doiSong2,
      theThao2S: theThao2,
      giaoDuc2S: giaoDuc2,
      kinhDoanh1S: kinhDoanh1,
      theGioi1S: theGioi1,
      VHXH1S: VHXH1,
      doiSong1S: doiSong1,
      theThao1S: theThao1,
      giaoDuc1S: giaoDuc1,
      layout: 'main.handlebars'
    };

    res.render('home/home', vm);
  })

});


router.get('/logout', (req, res) => {
  if (req.session.isLogged == true) {
    req.session.isLogged == false;
    req.session.destroy();
  }
  var vm = {
    layout: 'main.handlebars'
  };
  res.render('home/home', vm);
});

/* GET single page. */
router.get('/page', (req, res) => {
  var vm = {
    layout: 'page.handlebars'
  };
  res.render('page/page', vm);
});

// router.get('/:category', (req, res) => {
//   var newscategory = req.params.category;
//   var t1 = newsRepo.SearchSameCategory(newscategory);
//   Promise.all([t1]).then(([news]) => {
//     var vm = {
//       newS: news,
//       layout: 'page.handlebars'
//     };
//     res.render('page/category', vm);
//     console.log(vm);

//   })

// });

router.get('/category', (req, res) => {
  var vm = {
    layout: 'page.handlebars'
  };
  res.render('page/category', vm);

});


router.get('/news-search/bytag/:tag', (req, res) => {
  if (req.session.isLogged == true) {
    var newstags = req.params.tag;
    var t1 = newsRepo.SearchSameTagPremiumFirst(newstags);
    var t2 = newsRepo.LoadTopStories();
    var t3 = newsRepo.LoadRandStories();
    Promise.all([t1, t2, t3]).then(([news, topSto, ranSto]) => {
      var vm = {
        tag: req.params.tag,
        newsS: news,
        topStoS: topSto,
        ranStoS: ranSto,
        layout: 'page.handlebars',
      };
      res.render('page/tag', vm);
    })
  } else {
    var newstags = req.params.tag;
    var t1 = newsRepo.SearchSameTag(newstags);
    var t2 = newsRepo.LoadTopStories();
    var t3 = newsRepo.LoadRandStories();
    Promise.all([t1, t2, t3]).then(([news, topSto, ranSto]) => {
      var vm = {
        tag: req.params.tag,
        newsS: news,
        topStoS: topSto,
        ranStoS: ranSto,
        layout: 'page.handlebars',
      };
      res.render('page/tag', vm);
    })
  }
});

router.get('/news-search/bysubcat/:subcat', (req, res) => {
  if (req.session.isLogged == true) {
    var subcat = req.params.subcat;
    var t1 = newsRepo.SearchSameSubcatPremiumFirst(subcat);
    var t2 = newsRepo.LoadTopStories();
    var t3 = newsRepo.LoadRandStories();
    Promise.all([t1, t2, t3]).then(([news, topSto, ranSto]) => {
      var vm = {
        subcat: req.params.subcat,
        newsS: news,
        topStoS: topSto,
        ranStoS: ranSto,
        layout: 'page.handlebars',
      };
      res.render('page/subcat', vm);
    })
  } else {
    var subcat = req.params.subcat;
    var t1 = newsRepo.SearchSameSubcat(subcat);
    var t2 = newsRepo.LoadTopStories();
    var t3 = newsRepo.LoadRandStories();
    Promise.all([t1, t2, t3]).then(([news, topSto, ranSto]) => {
      var vm = {
        subcat: req.params.subcat,
        newsS: news,
        topStoS: topSto,
        ranStoS: ranSto,
        layout: 'page.handlebars',
      };
      res.render('page/subcat', vm);
    })
  }
});

// router.get('/news-search/bycat/:category', (req, res) => {
//   var category = req.params.category;
//   var t1 = newsRepo.SearchSameCategory(category);
//   var t2 = newsRepo.LoadTopStories();
//   var t3 = newsRepo.LoadRandStories();
//   Promise.all([t1, t2, t3]).then(([news, topSto, ranSto]) => {
//     var vm = {
//       category: req.params.category,
//       newsS: news,
//       topStoS: topSto,
//       ranStoS: ranSto,
//       layout: 'page.handlebars',
//     };
//     res.render('page/category', vm);
//   })

// });

router.get('/news-search/bycat/:category', (req, res) => {
  if (req.sessionID.isLogged == true) {
    var category = req.params.category;
    var page = req.query.page;
    if (!page) {
      page = 1;
    }
    if (page <= 1)
      var pageb = 1;
    else
      var pageb = page - 1;
    var pagea = +page + 1;
    var offset = (page - 1) * config.Limit;

    var t1 = newsRepo.SearchSameCategoryWithPaginationPremiumFirst(category, offset);
    var t2 = newsRepo.LoadTopStories();
    var t3 = newsRepo.LoadRandStories();
    var t4 = newsRepo.CountSameCategory(category);

    Promise.all([t1, t2, t3, t4]).then(([news, topSto, ranSto, countRows]) => {
      var total = countRows[0].total;
      var nPages = total / config.Limit;
      if (total % config.Limit > 0) {
        nPages++;
      }
      if (page === total)
        pagea = total;
      var numbers = [];
      for (i = 1; i <= nPages; i++) {
        numbers.push({
          value: i,
          isCurPage: i === +page
        });
      }
      var vm = {
        category: req.params.category,
        newsS: news,
        topStoS: topSto,
        ranStoS: ranSto,
        page_numbers: numbers,
        pageb: pageb,
        pagea: pagea,
        layout: 'page.handlebars',
      };
      res.render('page/category', vm);
    })
  } else {
    var category = req.params.category;
    var page = req.query.page;
    if (!page) {
      page = 1;
    }
    var vm = {
      category: req.params.category,
      newsS: news,
      topStoS: topSto,
      ranStoS: ranSto,
      page_numbers: numbers,
      pageb: pageb,
      pagea: pagea,
      layout: 'page.handlebars',
    };
    res.render('page/category', vm);
  }
});

router.post('/searchresult', (req, res) => {
  var Searchphrase = req.body.search;
  var t1 = newsRepo.SearchFTS(Searchphrase);
  var t2 = newsRepo.LoadTopStories();
  var t3 = newsRepo.LoadRandStories();
  var t4 = newsRepo.CountSearchResult(Searchphrase);
  Promise.all([t1, t2, t3, t4]).then(([news, topSto, ranSto]) => {
    var vm = {
      Phrase: Searchphrase,
      newsS: news,
      result: news.length === 0 ? false : true,
      topStoS: topSto,
      ranStoS: ranSto,
      layout: 'page.handlebars'
    };
    res.render('page/searchresult', vm);
  })

});

router.get('/:id', function (req, res, next) {
  //-----> check login here
  if (req.session.isLogged == true) {
    var account_id = req.session.idAccount;
    var newsid = req.params.id;
    newsRepo.single(newsid).then(rows => {

      newsRepo.updateView(newsid, rows[0].Views + 1);

      var t1 = newsRepo.singlePage(newsid);
      var t2 = newsRepo.LoadTag(rows[0].news_id);
      var t3 = newsRepo.LoadRandSameCategory(rows[0].news_id);
      var t4 = newsRepo.LoadRandSameCategory(rows[0].news_id);
      var t5 = newsRepo.LoadTopStories();
      var t6 = newsRepo.LoadRandStories();
      var t7 = accountRepo.IsExpired(account_id);
      var t8 = newsRepo.checkNotPremium(newsid);

      Promise.all([t1, t2, t3, t4, t5, t6, t7, t8]).then(([news, tag, sameCat, AsameCat, topSto, ranSto, expire, Notpre]) => {
        var vm = {
          tagS: tag,
          newsS: news,
          sameCats: sameCat,
          AsameCats: AsameCat,
          topStoS: topSto,
          ranStoS: ranSto,
          Notexpired: JSON.parse(expire[0].bool),
          NotPRE: JSON.parse(Notpre[0].bool),
          layout: 'page.handlebars',
        };
        res.render('page/page', vm);
      });
    });
  } else //------>> if wasn't login
  {
    var newsid = req.params.id;
    newsRepo.single(newsid).then(rows => {

      newsRepo.updateView(newsid, rows[0].Views + 1);

      var t1 = newsRepo.singlePage(newsid);
      var t2 = newsRepo.LoadTag(rows[0].news_id);
      var t3 = newsRepo.LoadRandSameCategory(rows[0].news_id);
      var t4 = newsRepo.LoadRandSameCategory(rows[0].news_id);
      var t5 = newsRepo.LoadTopStories();
      var t6 = newsRepo.LoadRandStories();
      var t8 = newsRepo.checkNotPremium(newsid);

      Promise.all([t1, t2, t3, t4, t5, t6, t8]).then(([news, tag, sameCat, AsameCat, topSto, ranSto, notPre]) => {
        var vm = {
          tagS: tag,
          newsS: news,
          sameCats: sameCat,
          AsameCats: AsameCat,
          topStoS: topSto,
          ranStoS: ranSto,
          Notpremium: JSON.parse(notPre[0].bool),
          layout: 'page.handlebars',
        };
        res.render('page/normalpage', vm);
      });
    });
  }
});

router.post('/searchresult', (req, res) => {
  if (req.session.isLogged == true) {
    var Searchphrase = req.body.search;
    var t1 = newsRepo.SearchFTSPremiumFirst(Searchphrase);
    var t2 = newsRepo.LoadTopStories();
    var t3 = newsRepo.LoadRandStories();
    var t4 = newsRepo.CountSearchResult(Searchphrase);
    Promise.all([t1, t2, t3, t4]).then(([news, topSto, ranSto]) => {
      var vm = {
        Phrase: Searchphrase,
        newsS: news,
        //result: t4 == `Promise { [ RowDataPacket { 'Count(news_id)': 0 } ] }` ? false : true,
        result: news.length === 0 ? false : true,
        topStoS: topSto,
        ranStoS: ranSto,
        layout: 'page.handlebars'
      };
      res.render('page/searchresult', vm);
    })
  } else {
    var Searchphrase = req.body.search;
    var t1 = newsRepo.SearchFTS(Searchphrase);
    var t2 = newsRepo.LoadTopStories();
    var t3 = newsRepo.LoadRandStories();
    var t4 = newsRepo.CountSearchResult(Searchphrase);
    Promise.all([t1, t2, t3, t4]).then(([news, topSto, ranSto]) => {
      var vm = {
        Phrase: Searchphrase,
        newsS: news,
        //result: t4 == `Promise { [ RowDataPacket { 'Count(news_id)': 0 } ] }` ? false : true,
        result: news.length === 0 ? false : true,
        topStoS: topSto,
        ranStoS: ranSto,
        layout: 'page.handlebars'
      };
      res.render('page/searchresult', vm);
    })
  }
});

router.get('/:id', function (req, res, next) {
  //-----> check login here
  if (req.session.isLogged == true) {
    var account_id = req.session.idAccount;
    var newsid = req.params.id;
    newsRepo.single(newsid).then(rows => {

      newsRepo.updateView(newsid, rows[0].Views + 1);

      var t1 = newsRepo.singlePage(newsid);
      var t2 = newsRepo.LoadTag(rows[0].news_id);
      var t3 = newsRepo.LoadRandSameCategory(rows[0].news_id);
      var t4 = newsRepo.LoadRandSameCategory(rows[0].news_id);
      var t5 = newsRepo.LoadTopStories();
      var t6 = newsRepo.LoadRandStories();
      var t7 = accountRepo.IsExpired(account_id);
      var t8 = newsRepo.checkNotPremium(newsid);

      Promise.all([t1, t2, t3, t4, t5, t6, t7, t8]).then(([news, tag, sameCat, AsameCat, topSto, ranSto, expire, Notpre]) => {
        var vm = {
          tagS: tag,
          newsS: news,
          sameCats: sameCat,
          AsameCats: AsameCat,
          topStoS: topSto,
          ranStoS: ranSto,
          Notexpired: JSON.parse(expire[0].bool),
          NotPRE: JSON.parse(Notpre[0].bool),
          layout: 'page.handlebars',
        };
        res.render('page/page', vm);
      });
    });
  } else //------>> if wasn't login
  {
    var newsid = req.params.id;
    newsRepo.single(newsid).then(rows => {

      newsRepo.updateView(newsid, rows[0].Views + 1);

      var t1 = newsRepo.singlePage(newsid);
      var t2 = newsRepo.LoadTag(rows[0].news_id);
      var t3 = newsRepo.LoadRandSameCategory(rows[0].news_id);
      var t4 = newsRepo.LoadRandSameCategory(rows[0].news_id);
      var t5 = newsRepo.LoadTopStories();
      var t6 = newsRepo.LoadRandStories();
      var t8 = newsRepo.checkNotPremium(newsid);

      Promise.all([t1, t2, t3, t4, t5, t6, t8]).then(([news, tag, sameCat, AsameCat, topSto, ranSto, notPre]) => {
        var vm = {
          tagS: tag,
          newsS: news,
          sameCats: sameCat,
          AsameCats: AsameCat,
          topStoS: topSto,
          ranStoS: ranSto,
          Notpremium: JSON.parse(notPre[0].bool),
          layout: 'page.handlebars',
        };
        res.render('page/normalpage', vm);
      });
    });
  }
});

router.post('/', (req, res) => {
  var user = {
    Email: req.body.email,
    Password: SHA256(req.body.rawPWD).toString()
  };

  accountRepo.login(user).then(rows => {
    if (rows.length > 0) {
      if (rows[0].account_type === 'administrator') {

        var vm = {
          isAdmin: true,
          layout: 'log.handlebars'
        }
        req.session.isLogged = true;
        req.session.email = rows[0].email;
        req.session.idAccount = rows[0].account_id;
        req.session.firstname = rows[0].first_name;
        req.session.lastname = rows[0].last_name;
        req.session.birthDate = formatDate(rows[0].birthdate);
        req.session.role = rows[0].account_type;

        var t1 = newsRepo.LoadAllEditor();
        var t2 = newsRepo.LoadAllWriter();
        var t3 = newsRepo.LoadAllSubscriber();
        var t4 = newsRepo.LoadTagList();
        var t5 = newsRepo.LoadCategoryList();
        var t6 = newsRepo.LoadSubCategoryList();
        var t7 = newsRepo.LoadAllNews();
        Promise.all([t1, t2, t3, t4, t5, t6, t7]).then(([editor, writer, subscriber, tag, category, subcat, news]) => {
          //vm.news = newS;
          var vm = {
            name: req.body.email,
            EditorS: editor,
            WriterS: writer,
            SubscriberS: subscriber,
            TagS: tag,
            CatS: category,
            SubcatS: subcat,
            newsS: news,
            layout: 'log.handlebars'
          }
          res.render('log/admin', vm);
        });

        //res.render('log/admin', vm);
      } else if (rows[0].account_type === 'subscriber') {
        var vm = {
          name: req.body.email,
          layout: 'main.handlebars'
        }
        req.session.isLogged = true;
        req.session.email = rows[0].email;
        req.session.idAccount = rows[0].account_id;
        req.session.firstname = rows[0].first_name;
        req.session.lastname = rows[0].last_name;
        req.session.birthDate = formatDate(rows[0].birthdate);
        req.session.role = rows[0].account_type;
        res.render('home/home', vm);
      } else if (rows[0].account_type === 'writer') {
        req.session.isLogged = true;
        req.session.email = rows[0].email;
        req.session.idAccount = rows[0].account_id;
        req.session.firstname = rows[0].first_name;
        req.session.lastname = rows[0].last_name;
        req.session.birthDate = formatDate(rows[0].birthdate);
        req.session.role = rows[0].account_type;
        req.session.nickname = rows[0].nickname;
        var tempObj = {
          id: req.session.idAccount
        }
        var t1 = accountRepo.loadNews(tempObj);

        Promise.all([t1]).then(([newS]) => {
          //vm.news = newS;
          var vm = {
            name: req.body.email,
            news: newS,
            layout: 'log.handlebars'
          }
          res.render('log/writer', vm);
        });
      } else if (rows[0].account_type === 'editor') {
        req.session.isLogged = true;
        req.session.email = rows[0].email;
        req.session.idAccount = rows[0].account_id;
        req.session.firstname = rows[0].first_name;
        req.session.lastname = rows[0].last_name;
        req.session.birthDate = formatDate(rows[0].birthdate);
        req.session.role = rows[0].account_type;
        req.session.nickname = rows[0].nickname;
        var tempObj = {
          id: req.session.idAccount
        }
        var t1 = newsRepo.LoadAllNewsInEditorCategory(tempObj);

        Promise.all([t1]).then(([newS]) => {
          //vm.news = newS;
          var vm = {
            name: req.body.email,
            news: newS,
            layout: 'log.handlebars'
          }

          res.render('log/editor', vm);
        });
      }

    } else {
      var vm = {
        showError: true,
        errorMsg: 'Login failed',
        layout: 'log.handlebars'
      };
      res.render('log/login', vm);
    }
  });
});

router.get('/manage/Tag', (req, res) => {
  var t1 = newsRepo.LoadTagList();
  Promise.all([t1]).then(([tag]) => {
    var vm = {
      tagS: tag,
      layout: 'page.handlebars'
    };
    res.render('page/category', vm);
  })
});

module.exports = router;
