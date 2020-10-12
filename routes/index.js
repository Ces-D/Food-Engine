var express = require("express");
var router = express.Router();
var axios = require("axios");

// GET Display Form
router.get("/", (req, res, next) => {
    res.render("index");
});

// POST Submit Form & Display Response
router.post("/submit", (req, res, next) => {
    let urlString = Object.keys(req.body)
        .map((key) => `${key}=${req.body[key]}`)
        .join("&");
    console.log(`${process.env.SPOON}?${urlString}`);
    axios
        .get(`${process.env.SPOON}?${urlString}`)
        .then((response) => res.json(response.data))
        .catch((err) => console.log(err));
});

module.exports = router;
