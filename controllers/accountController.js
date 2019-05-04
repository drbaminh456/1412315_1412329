var express = require('express');
var router = express.Router();

router.get('/login', (req, res) => {
  var vm = {
    layout: 'log.handlebars'
  };
  res.render('log/login', vm);
});
router.get('/register', (req, res) => {
  var vm = {
    layout: 'log.handlebars'
  };
  res.render('register/register', vm);
});
module.exports = router;