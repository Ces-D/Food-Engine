var express = require("express");
var router = express.Router();
var axios = require("axios");

// GET Display Form
router.get("/", (req, res, next) => {
    res.render("index");
});

// POST Submit Form & Display Response
router.post("/submit", spoonRequest, (req, res, next) => {
    console.log(req.spoonResponse)
    res.render("spoonResponse", {spoonResponse: req.spoonResponse})
});

// Spoon Request Middleware
function spoonRequest(req, res, next) {
    let params = req.body;
    params["number"] = 30;

    axios
        .get(process.env.SPOON, {
            params: params,
        })
        .then((response) => {
            req.spoonResponse = response.data;
            next();
        })
        .catch((error) => console.log(error));
}

module.exports = router;
