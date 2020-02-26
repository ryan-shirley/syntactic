require("newrelic")
require("dotenv").config()

var createError = require("http-errors")
var express = require("express")
var path = require("path")
var logger = require("morgan")
var cors = require("cors")

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
app.use(express.static(path.join(__dirname, "public")))

// Allow react app
app.use(cors())

// Middlewares
import { checkIfAuthenticated } from "./api/middlewares/auth-middleware"

// Routes Defined
app.use("/", require("./api/routes/root.controller"))
app.use(
    "/users",
    [checkIfAuthenticated],
    require("./api/routes/users.controller")
)
app.use(
    "/analyse",
    [checkIfAuthenticated],
    require("./api/routes/analyse.controller")
)
app.use(
    "/projects",
    [checkIfAuthenticated],
    require("./api/routes/projects.controller")
)
app.use(
    "/payments",
    [checkIfAuthenticated],
    require("./api/routes/payments.controller")
)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.status(404).json({ code: 404, message: "This route does not exist!" })
    // next(createError(404))
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
