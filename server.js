var express  = require('express');
var mongoose = require('mongoose');  
var path = require('path');            
var morgan   = require('morgan');                
var bodyParser = require('body-parser');         
var methodOverride = require('method-override'); 
var database = require('./config/database');
var logger = require('logger');
var session = require('express-session');
var port     = process.env.PORT || 8888; 

//mongoose.Promise = require('bluebird');
var db =mongoose.connect(database.url); 

mongoose.connection.once('connected', function() {
    console.log("Connected to database")
});

require('./app/models/class');
require('./app/models/subject');
require('./app/models/user');
require('./app/models/timetabledetail');

mongoose.set('debug', true);

var app  = express();                        


app.use(express.static(__dirname + '/public'));
//app.set('views', __dirname + '/public');
app.set('view engine', 'ejs');

app.use(morgan('dev'));                                         
app.use(bodyParser.urlencoded({'extended':'true'}));            
app.use(bodyParser.json());                                     
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(methodOverride());
//app.use(session({secret: 'ssshhhhh'})); ///initialize the sesion.


// routes ======================================================================
require('./app/routes.js')(app);   


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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


// listen (start app with node server.js) ======================================ssss
app.listen(port);
console.log("App listening on port : " + port);