var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  var vm = {
    layout: 'main.handlebars'
  };
  res.render('log/login', vm);
});

module.exports = router;