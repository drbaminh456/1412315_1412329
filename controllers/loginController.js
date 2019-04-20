var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  var vm = {
    layout: 'noleftmenu.handlebars'
  };
  res.render('log/login', vm);
});

module.exports = router;