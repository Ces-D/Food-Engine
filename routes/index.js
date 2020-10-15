var express = require("express");
var router = express.Router();
var axios = require("axios");

// GET Display Form
router.get("/", imageLoad, (req, res, next) => {
    let spoonResponse = req.response.results[0];
    let foodImage = spoonResponse["image"];
    let foodTitle = spoonResponse["title"];
    let foodSource = spoonResponse["sourceUrl"];
    let foodSummary = spoonResponse['summary']
    // let foodNutrition = spoonResponse['']c

    console.log(spoonResponse['nutrition']);

    res.render("index", {
        foodImage: foodImage,
        foodTitle: foodTitle,
        foodSource: foodSource,
        foodSummary: foodSummary,
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


// {
//     nutrients: [
//       {
//         title: 'Calories',
//         amount: 191.51,
//         unit: 'cal',
//         percentOfDailyNeeds: 9.58
//       },
//       {
//         title: 'Fat',
//         amount: 6.36,
//         unit: 'g',
//         percentOfDailyNeeds: 9.78
//       },
//       {
//         title: 'Saturated Fat',
//         amount: 1.03,
//         unit: 'g',
//         percentOfDailyNeeds: 6.45
//       },
//       {
//         title: 'Carbohydrates',
//         amount: 29.11,
//         unit: 'g',
//         percentOfDailyNeeds: 9.7
//       },
//       {
//         title: 'Net Carbohydrates',
//         amount: 23.38,
//         unit: 'g',
//         percentOfDailyNeeds: 8.5
//       },
//       {
//         title: 'Sugar',
//         amount: 3.32,
//         unit: 'g',
//         percentOfDailyNeeds: 3.68
//       },
//       {
//         title: 'Cholesterol',
//         amount: 0,
//         unit: 'mg',
//         percentOfDailyNeeds: 0
//       },
//       {
//         title: 'Sodium',
//         amount: 428.32,
//         unit: 'mg',
//         percentOfDailyNeeds: 18.62
//       },
//       {
//         title: 'Protein',
//         amount: 6.85,
//         unit: 'g',
//         percentOfDailyNeeds: 13.7
//       },
//       {
//         title: 'Vitamin C',
//         amount: 65.87,
//         unit: 'mg',
//         percentOfDailyNeeds: 79.85
//       },
//       {
//         title: 'Vitamin K',
//         amount: 73.09,
//         unit: 'µg',
//         percentOfDailyNeeds: 69.61
//       },
//       {
//         title: 'Manganese',
//         amount: 1.32,
//         unit: 'mg',
//         percentOfDailyNeeds: 65.81
//       },
//       {
//         title: 'Copper',
//         amount: 0.48,
//         unit: 'mg',
//         percentOfDailyNeeds: 24.16
//       },
//       {
//         title: 'Fiber',
//         amount: 5.73,
//         unit: 'g',
//         percentOfDailyNeeds: 22.92
//       },
//       {
//         title: 'Folate',
//         amount: 89.34,
//         unit: 'µg',
//         percentOfDailyNeeds: 22.34
//       },
//       {
//         title: 'Magnesium',
//         amount: 87.61,
//         unit: 'mg',
//         percentOfDailyNeeds: 21.9
//       },
//       {
//         title: 'Vitamin B6',
//         amount: 0.42,
//         unit: 'mg',
//         percentOfDailyNeeds: 20.91
//       },
//       {
//         title: 'Phosphorus',
//         amount: 188.42,
//         unit: 'mg',
//         percentOfDailyNeeds: 18.84
//       },
//       {
//         title: 'Vitamin B1',
//         amount: 0.25,
//         unit: 'mg',
//         percentOfDailyNeeds: 16.93
//       },
//       {
//         title: 'Iron',
//         amount: 2.68,
//         unit: 'mg',
//         percentOfDailyNeeds: 14.92
//       },
//       {
//         title: 'Potassium',
//         amount: 490.13,
//         unit: 'mg',
//         percentOfDailyNeeds: 14
//       },
//       {
//         title: 'Calcium',
//         amount: 132.76,
//         unit: 'mg',
//         percentOfDailyNeeds: 13.28
//       },
//       {
//         title: 'Vitamin B3',
//         amount: 2.52,
//         unit: 'mg',
//         percentOfDailyNeeds: 12.62
//       },
//       {
//         title: 'Zinc',
//         amount: 1.69,
//         unit: 'mg',
//         percentOfDailyNeeds: 11.3
//       },
//       {
//         title: 'Vitamin B5',
//         amount: 0.96,
//         unit: 'mg',
//         percentOfDailyNeeds: 9.62
//       },
//       {
//         title: 'Vitamin A',
//         amount: 445.78,
//         unit: 'IU',
//         percentOfDailyNeeds: 8.92
//       },
//       {
//         title: 'Vitamin B2',
//         amount: 0.15,
//         unit: 'mg',
//         percentOfDailyNeeds: 8.55
//       },
//       {
//         title: 'Selenium',
//         amount: 4.49,
//         unit: 'µg',
//         percentOfDailyNeeds: 6.42
//       },
//       {
//         title: 'Vitamin E',
//         amount: 0.42,
//         unit: 'mg',
//         percentOfDailyNeeds: 2.82
//       }
//     ],
//     properties: [
//       { title: 'Glycemic Index', amount: 45.69, unit: '' },
//       { title: 'Glycemic Load', amount: 10.77, unit: '' }
//     ],
//     ingredients: [
//       {
//         name: 'broccoli',
//         amount: 0.25,
//         unit: 'cups',
//         nutrients: [Array]
//       },
//       {
//         name: 'cauliflower',
//         amount: 0.13,
//         unit: 'head',
//         nutrients: [Array]
//       },
//       { name: 'coconut oil', amount: 0.13, unit: '', nutrients: [Array] },
//       {
//         name: 'cooked brown rice',
//         amount: 0.38,
//         unit: 'cups',
//         nutrients: [Array]
//       },
//       {
//         name: 'garlic',
//         amount: 0.63,
//         unit: 'cloves',
//         nutrients: [Array]
//       },
//       {
//         name: 'grapeseed oil',
//         amount: 0.13,
//         unit: '',
//         nutrients: [Array]
//       },
//       {
//         name: 'low sodium soy sauce',
//         amount: 0.38,
//         unit: 'T',
//         nutrients: [Array]
//       },
//       { name: 'peas', amount: 0.13, unit: 'cup', nutrients: [Array] },
//       { name: 'salt', amount: 1, unit: 'servings', nutrients: [Array] },
//       {
//         name: 'scallion',
//         amount: 1,
//         unit: 'servings',
//         nutrients: [Array]
//       },
//       { name: 'scallions', amount: 0.88, unit: '', nutrients: [Array] },
//       { name: 'sesame oil', amount: 0.25, unit: 't', nutrients: [Array] },
//       {
//         name: 'sesame seeds',
//         amount: 1,
//         unit: 'servings',
//         nutrients: [Array]
//       }
//     ],
//     caloricBreakdown: { percentProtein: 13.63, percentFat: 28.46, percentCarbs: 57.91 },
//     weightPerServing: { amount: 220, unit: 'g' }