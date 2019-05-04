var express = require('express');
var exphbs = require('express-handlebars');
var express_handlebars_sections = require('express-handlebars-sections');
var path = require('path');
var bodyParser = require('body-parser');
var wnumb = require('wnumb');

var app = express();
var homeController = require('./controllers/homeController');
var accountController = require('./controllers/accountController');
var registController = require('./controllers/registController');
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: 'views/_layouts/',
  helpers: {
    section: express_handlebars_sections(),
    number_format: n => {
      var nf = wnumb({
        thousand: ','
      });
      return nf.to(n);
    }
  }
}));

app.set('view engine', 'hbs');
app.use(express.static(path.resolve(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/', (req, res) => {
  res.redirect('/home');
  // res.render('home');
});

// app.get('/page', (req, res) => {
//   res.render('/home');
// });

app.use('/regist',registController);
app.use('/page', homeController);
app.use('/home', homeController);
app.use('/account', accountController);
app.listen(3000, () => { });
