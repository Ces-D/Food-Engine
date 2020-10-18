var express = require("express");
var router = express.Router();

router.get("/", (req, res, next) => {
    res.render("preferences", {
        cuisine: [
            { name: "African" },
            { name: "American" },
            { name: "British" },
            { name: "Cajun" },
            { name: "Caribbean" },
            { name: "Chinese" },
            { name: "Eastern European" },
            { name: "European" },
            { name: "French" },
            { name: "German" },
            { name: "Greek" },
            { name: "Indian" },
            { name: "Irish" },
            { name: "Italian" },
            { name: "Japanese" },
            { name: "Jewish" },
            { name: "Korean" },
            { name: "Latin American" },
            { name: "Mediterranean" },
            { name: "Mexican" },
            { name: "Middle Eastern" },
            { name: "Nordic" },
            { name: "Southern" },
            { name: "Spanish" },
            { name: "Thai" },
            { name: "Vietnamese" },
        ],
        diet: [
            { name: "Gluten-free" },
            { name: "Vegan" },
            { name: "Vegetarian" },
            { name: "Paleo" },
        ],
    });
});

router.post("/submit", (req, res, next) => {
    res.cookie("preferences", req.body);
    res.redirect("/");
});

module.exports = router;
