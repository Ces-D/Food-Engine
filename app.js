var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var exphs = require("express-handlebars");
var bodyParser = require("body-parser");


var app = express();

// Env
var dotenv = require("dotenv");
dotenv.config();

// Templates
app.set("view engine", "handlebars");
app.engine(
    "handlebars",
    exphs({
        defaultLayout: "main",
        layoutsDir: __dirname + "/views/layouts",
        partialsDir: __dirname + "/views/partials",
    })
);
app.use(express.static(path.join(__dirname, "public")));

// Body Parser
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(express.json());

// Logger
app.use(
    logger(":method :url :status :res[content-length] - :response-time ms")
);

app.use(express.urlencoded({ extended: true }));

// Cookies
app.use(cookieParser());


// Routers
var indexRouter = require("./routes/index");
var preferenceRouter = require("./routes/preferences")

app.use("/", indexRouter);
app.use("/preference/", preferenceRouter)

module.exports = app;
