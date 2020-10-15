var express = require("express");
var router = express.Router();
var axios = require("axios");

// GET Display Form
router.get("/", imageLoad, (req, res, next) => {
    let spoonResponse = req.response.results[0];
    let foodImage = spoonResponse["image"];
    let foodTitle = spoonResponse["title"];
    let foodSource = spoonResponse["sourceUrl"];
    // let foodNutrition = spoonResponse['']c

    console.log(spoonResponse["nutrition"]);

    res.render("index", {
        foodImage: foodImage,
        foodTitle: foodTitle,
        foodSource: foodSource,
    });
});

router.get("/preferences", (req, res, next) => {
    res.render("settings", {
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

router.post("/preferences-submit", (req, res, next) => {
    res.cookie("preferences", req.body);
    res.redirect("/");
});

// Spoon Request
function imageLoad(req, res, next) {
    if (req.cookies.preferences) {
        let cuisine = req.cookies.preferences.cuisine;
        let diet = req.cookies.preferences.diet;

        axios
            .get(process.env.COMPLEX_SEARCH, {
                params: {
                    number: 1,
                    addRecipeNutrition: true,
                    cuisine: cuisine,
                    diet: diet,
                    apiKey: process.env.SPOON_KEY,
                },
            })
            .then((response) => {
                req.response = response.data;
                next();
            })
            .catch((error) => res.send(error));
    } else {
        axios
            .get(process.env.COMPLEX_SEARCH, {
                params: {
                    number: 1,
                    addRecipeNutrition: true,
                    offset: 33,
                    apiKey: process.env.SPOON_KEY,
                },
            })
            .then((response) => {
                req.response = response.data;
                next();
            })
            .catch((error) => res.send(error));
    }
}

module.exports = router;
