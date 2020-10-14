var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var exphs = require("express-handlebars");
var bodyParser = require("body-parser");

var dotenv = require("dotenv");
dotenv.config();

var indexRouter = require("./routes/index");

var app = express();

app.set("view engine", "handlebars");
app.engine(
    "handlebars",
    exphs({
        defaultLayout: "main",
        layoutsDir: __dirname + "/views/layouts",
        partialsDir: __dirname + "/views/partials",
    })
);

app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(
    logger(":method :url :status :res[content-length] - :response-time ms")
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

module.exports = app;
