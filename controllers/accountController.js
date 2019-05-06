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
router.get('/writer/post', (req, res) => {
  var vm = {
    layout: 'log.handlebars'
  };
  res.render('log/writer', vm);
});
router.get('/my-profile', (req, res) => {
  var vm = {
    layout: 'log.handlebars'
  };
  res.render('log/my-profile', vm);
});
router.get('/admin', (req, res) => {
  var vm = {
    layout: 'log.handlebars'
  };
  res.render('log/admin', vm);
});
module.exports = router;