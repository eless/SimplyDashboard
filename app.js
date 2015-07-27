var express = require('express.io');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var log = require('models/log')(module);
var db = require('models/db');
var routes = require('./routes/index');
var users = require('./routes/users');
var app = express().http().io();
var config = require('./config/index');
var passport = require('models/facebook');
var facebook = require('./routes/facebook')
    ,logout = require('./routes/logout')
    ,dashboards = require('./routes/dashboards')
;
app.use(passport.initialize());
app.use(passport.session());
log.info(process.env.PORT || config.get('port'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: process.env.NODE_ENV == 'development' ? config.get('session:secret'): process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));

var index = require('./routes/index')
    ;

app.get('/', index.router);
app.get('/dashboards/dashboards.json', dashboards.sendDashboards);
app.get('dashboards/:id', dashboards.sendWidgets);

// event handlers
app.io.route('sendNewMessage',
    function(req) {
        app.io.broadcast('newMessage', { name: req.data[0], text: req.data[1]})
    }
);//events

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/auth/facebook/callback')
}
app.get('/auth/facebook',
    passport.authenticate('facebook'),
    facebook.router);

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    facebook.router);

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = app;
