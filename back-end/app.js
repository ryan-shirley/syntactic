require('dotenv').config()

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

// Route Files
var indexRouter = require('./routes/index');
var onboardingrouter = require('./routes/onboarding');

// Set up Mongoose connection
// const mongoose = require('mongoose');

// let mongoDB = process.env.MONGODB_URI_LIVE || process.env.MONGODB_URI_DEV;
// mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.Promise = global.Promise;
// let db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var mongoose = require('mongoose');
let mongoDB = process.env.MONGODB_URI_LIVE || process.env.MONGODB_URI_DEV;
// mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}).then(res => console.log("Connected to DB"))
// .catch(err => console.log(err))

mongoose
  .connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(error => {
    console.log('Connection failed!');
    console.log(error);
  });


// Create Express app
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Allow react app
app.use(cors());

// Routes Defined
app.use('/', indexRouter);
app.use('/onboarding', onboardingrouter);

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
