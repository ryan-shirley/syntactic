require("dotenv").config()
require('newrelic');

var createError = require("http-errors")
var express = require("express")
var path = require("path")
var cookieParser = require("cookie-parser")
var logger = require("morgan")
var cors = require("cors")

// Route Files
var indexRouter = require("./routes/index")
var onboardingrouter = require("./routes/onboarding")
var usersRouter = require("./routes/users")
var nlpRouter = require("./routes/nlp")

// Set up Mongoose connection
var mongoose = require("mongoose")
let mongoDB = process.env.MONGODB_URI_LIVE || process.env.MONGODB_URI_DEV

mongoose
    .connect(mongoDB, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => {
        console.log(`Successfully connected to MongoDB Atlas!`)
    })
    .catch(error => {
        console.log("Connection failed!")
        console.log(error)
    })

// Create Express app
var app = express()

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

// Allow react app
app.use(cors())

// Routes Defined
app.use("/", indexRouter)
app.use("/nlp", nlpRouter)
app.use("/onboarding", onboardingrouter)
app.use("/user", usersRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get("env") === "development" ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render("error")
})

module.exports = app
