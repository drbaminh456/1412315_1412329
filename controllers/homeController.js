var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  var vm = {
    layout: 'main.handlebars'
  };
  res.render('home/index', vm);
});

module.exports = router;