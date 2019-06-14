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
  var account = {
    Email: req.body.email,
    Password: SHA256(req.body.password).toString(),
    First_Name: req.body.firstName,
    Last_Name: req.body.lastName,
    Birthdate: req.body.birthDate
  };
  accountRepo.add(account);
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
    email: (req.session.idAccount != '' || req.session.idAccount != NULL) ? req.session.email : 'Please login to show',
    name: (req.session.idAccount != '' || req.session.idAccount != NULL) ? req.session.name : 'Please login to show',
    birthDate: (req.session.idAccount != '' || req.session.idAccount != NULL) ? req.session.birthDate : 'Please login to show',
    accountType: (req.session.idAccount != '' || req.session.idAccount != NULL) ? req.session.role : 'Please login to show',
    isWriter: req.session.accoutnType == 'writer' ? true : false,
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