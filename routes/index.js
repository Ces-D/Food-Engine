var express = require("express");
var router = express.Router();
var axios = require("axios");

function apiRequest(req, res, next) {
    let randomNumber = Math.floor(Math.random() * 100) + 1;
    if (req.cookies.preferences) {
        axios
            .get(process.env.COMPLEX_SEARCH, {
                params: {
                    number: 1,
                    addRecipeNutrition: true,
                    cuisine: req.cookies.preferences.cuisine,
                    diet: req.cookies.preferences.diet,
                    apiKey: process.env.SPOON_KEY,
                },
            })
            .then((response) => {
                req.spoon = response.data.results[0];
                next();
            })
            .catch(res.render("error"));
    } else {
        axios
            .get(process.env.COMPLEX_SEARCH, {
                params: {
                    number: 1,
                    addRecipeNutrition: true,
                    offset: randomNumber,
                    apiKey: process.env.SPOON_KEY,
                },
            })
            .then((response) => {
                req.spoon = response.data.results[0];
                next();
            })
            .catch(res.render("error"));
    }
}

router.get("/", apiRequest, (req, res, next) => {
    res.render("index", {
        foodTitle: req.spoon.title,
        foodSource: req.spoon.source,
    });
});

router.post("/", (req, res, next) => {
    let foodProteins = req.spoon.nutrients.filter((obj) => {
        obj.title = "Protein";
    });
    let foodCalories = req.spoon.nutrients.filter((obj) => {
        obj.title = "Calories";
    });
    let foodCarbs = req.spoon.nutrients.filter((obj) => {
        obj.title = "Carbohydrates";
    });
    let foodFats = req.spoon.nutrients.filter((obj) => {
        obj.title = "Fats";
    });
    let [guessCalories, guessCarbs, guessProteins, guessFats] = req.body;
    res.render("guess", {
        foodTitle: req.spoon.title,
        foodSource: req.spoon.source,
        foodProtein: foodProteins,
        foodCalorie: foodCalories,
        foodCarb: foodCarbs,
        foodFat: foodFats,
        guessCalorie: guessCalories,
        guessCarb: guessCarbs,
        guessFat: guessFats,
        guessProtein: guessProteins,
    });
});

module.exports = router;
