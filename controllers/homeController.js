var express = require('express');
var router = express.Router();
var newsRepo = require('../repos/newsRepo');
var accountRepo = require('../repos/accountRepo');
var SHA256 = require('crypto-js/sha256');
var config = require('../config/config')

function formatDate(date) {
  var monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
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
router.get('/', (req, res) => {
  var vm = {
    layout: 'main.handlebars'
  };
  res.render('home/home', vm);
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

});

router.get('/news-search/bysubcat/:subcat', (req, res) => {
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

  var t1 = newsRepo.SearchSameCategoryWithPagination(category, offset);
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
      //result: t4 == `Promise { [ RowDataPacket { 'Count(news_id)': 0 } ] }` ? false : true,
      result: news.length === 0 ? false : true,
      topStoS: topSto,
      ranStoS: ranSto,
      layout: 'page.handlebars'
    };
    res.render('page/searchresult', vm);
  })

});

router.get('/:id', function (req, res, next) {
  var newsid = req.params.id;
  newsRepo.single(newsid).then(rows => {

    newsRepo.updateView(newsid, rows[0].Views + 1);

    var t1 = newsRepo.singlePage(newsid);
    var t2 = newsRepo.LoadTag(rows[0].news_id);
    var t3 = newsRepo.LoadRandSameCategory(rows[0].news_id);
    var t4 = newsRepo.LoadRandSameCategory(rows[0].news_id);
    var t5 = newsRepo.LoadTopStories();
    var t6 = newsRepo.LoadRandStories();

    Promise.all([t1, t2, t3, t4, t5, t6]).then(([news, tag, sameCat, AsameCat, topSto, ranSto]) => {
      var vm = {
        tagS: tag,
        newsS: news,
        sameCats: sameCat,
        AsameCats: AsameCat,
        topStoS: topSto,
        ranStoS: ranSto,
        layout: 'page.handlebars',
      };

      res.render('page/page', vm);
    });
  });

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
        req.session.name = rows[0].first_name + ' ' + rows[0].last_name;
        req.session.birthDate = formatDate(rows[0].birthdate);
        req.session.role = rows[0].account_type;
        res.render('log/admin', vm);
      } else if (rows[0].account_type === 'subscriber') {
        var vm = {
          name: req.body.email,
          layout: 'main.handlebars'
        }
        req.session.isLogged = true;
        req.session.email = rows[0].email;
        req.session.idAccount = rows[0].account_id;
        req.session.name = rows[0].first_name + ' ' + rows[0].last_name;
        req.session.birthDate = formatDate(rows[0].birthdate);
        req.session.role = rows[0].account_type;
        res.render('home/home', vm);
      } else if (rows[0].account_type === 'writer') {
        var vm = {
          name: req.body.email,
          layout: 'log.handlebars'
        }
        req.session.isLogged = true;
        req.session.email = rows[0].email;
        req.session.idAccount = rows[0].account_id;
        req.session.name = rows[0].first_name + ' ' + rows[0].last_name;
        req.session.birthDate = formatDate(rows[0].birthdate);
        req.session.role = rows[0].account_type;
        req.session.nickname = rows[0].nickname;
        res.render('log/writer', vm);
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

module.exports = router;
