var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  var vm = {
    layout: 'log.handlebars'
  };
  res.render('regist/regist', vm);
});

module.exports = router;