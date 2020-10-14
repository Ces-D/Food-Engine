var express = require("express");
var router = express.Router();
var axios = require("axios");

// GET Display Form
router.get("/", (req, res, next) => {
    res.render("index", {
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

// Spoon Request
function imageLoad(req, res, next) {
    axios
        .get(process.env.COMPLEX_SEARCH, {
            params: {
                number: 1,
                addRecipeNutrition: true,
                apiKey: process.env.SPOON_KEY,
            },
        })
        .then((response) => {
            console.log(response.data);
            next();
        })
        .catch((error) => console.log(error));
}

module.exports = router;
