var express = require('express');
var router = express.Router();
var SHA256 = require('crypto-js/sha256');
var accountRepo = require('../repos/accountRepo');
var newsRepo = require('../repos/newsRepo');
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

router.get('/writer', (req, res) => {
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

router.post('/change-password', (req, res) => {
  var obj = {
    email: req.session.email,
    oldPassword: SHA256(req.body.oldPwd).toString(),
    newPassword: SHA256(req.body.newPwd).toString()
  };
  accountRepo.changePwd(obj).then(rows => {
    if (rows.length > 0) {
      if (rows[0].password === obj.oldPassword) {
        accountRepo.addNewPwd(obj);
        var vm = {
          layout: 'log.handlebars',
          isSuccess: true
        };
        res.render('log/change-password', vm);
      }
    } else if (rows[0].password != obj.oldPassword) {
      var vm = {
        layout: 'log.handlebars',
        isSuccess: false
      };
      res.render('log/change-password', vm);
    }
  });
  // var vm = {
  //   layout: 'log.handlebars'
  // };
  // res.render('log/change-password-success', vm);
});
router.get('/logout', (req, res) => {
  if (req.session.isLogged == true) {
    req.session.isLogged == false;
    req.session.destroy();
  }
  var vm = {
    layout: 'log.handlebars'
  };
  res.render('log/logout', vm);
});

router.post('/writer/post-news', (req, res) => {

  var date = new Date();
  var month = date.getMonth().length < 2 ? ('0' + date.getMonth()) : date.getMonth();
  var day = date.getDate().length < 2 ? ('0' + date.getDate()) : date.getDate();
  var temp = date.getFullYear() + '-' + month + '-' + day;

  var obj = {
    title: req.body.title,
    subCategory: req.body.category,
    date: temp,
    tag: req.body.tag,
    summary: req.body.summary,
    writerId: req.session.idAccount,
    content: req.body.editor
  };

  newsRepo.saveNews(obj);
  var vm = {
    layout: 'log.handlebars'
  };
  res.render('log/writer', vm);
});
module.exports = router;