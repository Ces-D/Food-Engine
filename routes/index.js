var express = require("express");
var router = express.Router();
var axios = require("axios");


// function spoonRequest(req, res, next) {
//     if (!req.cookies.firstTime) {
//         let randomNumber = Math.floor(Math.random() * 100) + 1;
//         axios
//             .get(process.env.COMPLEX_SEARCH, {
//                 params: {
//                     number: 1,
//                     addRecipeNutrition: true,
//                     offset: randomNumber,
//                     apiKey: process.env.SPOON_KEY,
//                 },
//             })
//             .then((response) => {
//                 req.spoon = response.data.results[0];
//                 res.cookies.firstTime = true;
//                 next();
//             })
//             .catch((error) => console.log(error));
//     } else {
//         let nextRequest = document.getElementById("next_request");
//         nextRequest.addEventListener("click", apiRequest);
//     }
// }

// function apiRequest(req, res, next) {
//     console.log("apiRequest");
//     let randomNumber = Math.floor(Math.random() * 100) + 1;

//     if (req.cookies.preferences) {
//         axios
//             .get(process.env.COMPLEX_SEARCH, {
//                 params: {
//                     number: 1,
//                     addRecipeNutrition: true,
//                     cuisine: req.cookies.preferences.cuisine,
//                     diet: req.cookies.preferences.diet,
//                     offset: randomNumber,
//                     apiKey: process.env.SPOON_KEY,
//                 },
//             })
//             .then((response) => {
//                 req.spoon = response.data.results[0];
//                 next();
//             })
//             .catch((error) => console.log(error));
//     } else {
//         axios
//             .get(process.env.COMPLEX_SEARCH, {
//                 params: {
//                     number: 1,
//                     addRecipeNutrition: true,
//                     offset: randomNumber,
//                     apiKey: process.env.SPOON_KEY,
//                 },
//             })
//             .then((response) => {
//                 req.spoon = response.data.results[0];
//                 next();
//             })
//             .catch((error) => console.log(error));
//     }
// }

// function foodInformation(req, res, next) {
//     let nutrients = req.spoon.nutrition.nutrients;
//     req.foodCalories = nutrients.filter((obj) => obj.title === "Calories");
//     req.foodProteins = nutrients.filter((obj) => obj.title === "Protein");
//     req.foodFats = nutrients.filter((obj) => obj.title === "Fat");
//     req.foodCarbs = nutrients.filter((obj) => obj.title === "Carbohydrates");
//     next();
// }

// router.get("/", spoonRequest, foodInformation, (req, res, next) => {
//     res.render("index", {
//         foodTitle: req.spoon.title,
//         foodImage: req.spoon.image,
//         foodSource: req.spoon.sourceUrl,
//         foodProteins: req.foodProteins,
//         foodCalories: req.foodCalories,
//         foodCarbs: req.foodCarbs,
//         foodFats: req.foodFats,
//     });
// });

router.get("/", (req,res,next) => {
    res.render("index")
})

module.exports = router;
