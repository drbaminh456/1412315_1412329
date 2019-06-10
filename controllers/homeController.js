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

// router.get('/page/:news_id', (req, res) => {
//   var news_id = req.params.news_id;
//   newsRepo.single(news_id).then(rows => {
//     newsRepo.updateView(news_id, +rows[0].View_Number + 1);
//       var t1 = newsRepo.getbyKind(rows[0].Kind_ID);
//       var t2 = newsRepo.samePublisher(rows[0].Publisher);
//       Promise.all([t1, t2]).then(([bkind, bpublisher]) => {
//           if (req.session.isLogged == true) {
//               var vm = {
//                   book: rows[0],
//                   bkinds: bkind,
//                   bpublishers: bpublisher,
//                   layout: 'page.handlebars'
//               }
//           } else {
//               var vm = {
//                   book: rows[0],
//                   bkinds: bkind,
//                   bpublishers: bpublisher,
//                   layout: 'page.handlebars'
//               }
//           }
//           res.render('page/news_id', vm);
//       });
//   });
// });

router.get('/page/:id', function(req, res, next) {
  var sql = `SELECT * FROM news WHERE id = ${req.params.id}`;
  // var query = db.query(sql, function (err, result) {
  //     if(err) throw err;
  //     console.log('searching id with value = "${req.params.id}"');
  //     // var model = {result: result}
  //     var vm = {
  //       layout: 'log.handlebars'
  //     };
  //     // res.render('page/page', { title: 'News', model });
  //     res.render('page/page', vm);
  // });

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

  // newsRepo.singlePage(req.params.id).then(rows => {
  //     if (req.session.isLogged == true) {
  //         var vm = {
  //             layout: 'cus.handlebars'
  //         }
  //     } else {
  //         var vm = {
  //             // books: rows,
  //             layout: 'main.handlebars'
  //         }
  //     }
  //     console.log(`rendering id with value = ${req.params.id}`);
  //     res.render('page/page', vm);
  // });


  // var vm = {
  //   layout: 'page.handlebars'
  // };
  // res.render('page/page', vm);
});

module.exports = router;
