var express = require('express');
var router = express.Router();
var newsRepo = require('../repos/newsRepo');
var accountRepo = require('../repos/accountRepo');
var SHA256 = require('crypto-js/sha256');

function formatDate(date) {
  var monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return monthNames[monthIndex] + ' ' + day + ', ' + year;
}
/* GET home page. */
router.get('/', (req, res) => {
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

router.get('/category', (req, res) => {
  var vm = {
    layout: 'page.handlebars'
  };
  res.render('page/category', vm);
});

router.get('/searchresult', (req, res) => {
  var vm = {
    layout: 'page.handlebars'
  };
  res.render('page/searchresult', vm);
});

// router.get('/:id', function (req, res, next) {
//   var t1 = newsRepo.singlePage(req.params.id);

//   Promise.all([t1]).then(([news]) => {
//     var vm = {
      
//       newsS: news,
//       layout: 'page.handlebars',
//     };
//     res.render('page/page', vm);
//     console.log(news[0].Date);
//   });
// });

router.get('/:id', function (req, res, next) {
  var t1 = newsRepo.singlePage(req.params.id);
  var t2 = newsRepo.LoadTag(req.params.id);
  var t3 = newsRepo.LoadRandSameCategory(req.params.id);
  var t4 = newsRepo.LoadRandSameCategory(req.params.id);
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
