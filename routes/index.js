var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", {
        actionURL: "https://api.spoonacular.com/recipes/complexSearch",
    });
});

router.post("/", function (req, res, next) {
    console.log("Body: ", req.body);
    res.redirect([200],"/")
});

module.exports = router;
