var express = require('express');
var router = express.Router();
var newsRepo = require('../repos/newsRepo');

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

router.get('/page/:id', function(req, res, next) {
  var sql = `SELECT * FROM news WHERE id = ${req.params.id}`;


  console.log(`searching id with value = ${req.params.id}`);

  var t1 = newsRepo.singlePage(req.params.id);

  Promise.all([t1]).then(([news]) => {

      var vm = {
          newsS: news,
          layout: 'page.handlebars',
      };
      console.log(vm);
      
      res.render('page/page', vm);

  });
});

module.exports = router;
