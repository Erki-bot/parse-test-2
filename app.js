var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const ParseServer = require('parse-server').ParseServer;
const ParseDashboard = require('parse-dashboard');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const Parse = require('parse/node');
var app = express();
//App config
const masterKey = 'erki-master';
const appId = 'erki';
const jsKey = 'erki-jsKey';
const serverUrl = 'http://localhost:3000/api';
const databaseURI = 'mongodb://localhost:27017/test'
const serverConfig = {
  databaseURI : databaseURI,
  appId : appId,
  cloud : './routes/index.js',
  javascriptKey : jsKey,
  masterKey : masterKey,
  serverURL : serverUrl,
  appName : 'ErkiApp'
}

var api = new ParseServer (serverConfig);
//const option = {allowInsecureHTTP : true};
// const dashboard = new ParseDashboard (
//   {
//     "apps" : [
//       {
//         serverConfig
//       }
//     ]//,option
//   }
// )
var dashboard = new ParseDashboard({
  apps: [
    {
      serverURL: "http://localhost:3000/api",
      appId: "erki",
      masterKey: "erki-master",
      appName: "MyApp"
    }
  ]
});
//Configuration du sdk
Parse.initialize(appId,jsKey,masterKey);
Parse.serverURL = serverUrl;
// const user = new Parse.User();
// user.set('username',"kikimahueric@gmail.com");
// user.set('password','123');
// user.signUp().then(()=>{console.log('User logged in successfuly')});




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);
app.use('/users', usersRouter);
app.use('/dash', dashboard);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
