var express = require("express");
var router = express.Router();

// get the home page
router.get("/", (req, res, next) => {
    res.render("index");
});

router.post("/submit", (req, res, next) => {
    res.send(req.body)
});

module.exports = router;
