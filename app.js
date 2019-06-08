var express = require('express');
var exphbs = require('express-handlebars');
var express_handlebars_sections = require('express-handlebars-sections');
var path = require('path');
var bodyParser = require('body-parser');
var wnumb = require('wnumb');

var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

var app = express();
var homeController = require('./controllers/homeController');
var accountController = require('./controllers/accountController');
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

//---------- use session -----------

var sessionStore = new MySQLStore({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'newspaperdb',
  createDatabaseTable: true,
  schema: {
      tableName: 'sessions',
      columnNames: {
          session_id: 'session_id',
          expires: 'expires',
          data: 'data'
      }
  }
});
console.log(sessionStore);

app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}));

app.get('/', (req, res) => {
  res.redirect('/home');
});

// app.get('/page', (req, res) => {
//   res.render('/home');
// });

app.use('/page', homeController);
app.use('/home', homeController);
app.use('/account', accountController);
app.listen(3000, () => { });
