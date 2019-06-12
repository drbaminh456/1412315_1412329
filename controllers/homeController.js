var express = require('express');
var router = express.Router();
var newsRepo = require('../repos/newsRepo');
var accountRepo = require('../repos/accountRepo');
var SHA256 = require('crypto-js/sha256');
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

  Promise.all([t1, t2]).then(([news, tag]) => {
    var vm = {
      tags: tag,
      newsS: news,
      layout: 'page.handlebars',
    };
    res.render('page/page', vm);
    console.log(vm.tags);
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
