var express = require('express');
var router = express.Router();
var SHA256 = require('crypto-js/sha256');
var accountRepo = require('../repos/accountRepo');

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

router.post('/register-success', (req, res) => {
  // var account = {
  //   Email: req.body.Email,
  //   Password: SHA256(req.body.password).toString()
  // };

  // accountRepo.getMaxID().then(rows => {
    console.log('xxxxxxxxxxxx');
    
    var account = {
      Email: req.body.Email,
      Password: SHA256(req.body.password).toString(),
      First_Name: req.body.firstName,
      Last_Name: req.body.lastName,
      Birthdate: req.body.birthDate
    };
    accountRepo.add(account);
    // req.session.idAccount = customer.Account_ID;
  // });
  var vm = {
    layout: 'log.handlebars'
  };
  res.render('register/register-success', vm);
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