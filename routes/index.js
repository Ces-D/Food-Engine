var express = require("express");
var router = express.Router();
var axios = require("axios");

// GET Display Form
router.get("/", (req, res, next) => {
    if (req.cookies.preferences) {
        console.log("Cookie exists");
    }
    res.render("index");
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

router.post("/submit", (req, res, next) => {
    res.cookie('preferences', req.body)
    res.redirect("/");
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

// {
//     results: [
//       {
//         vegetarian: true,
//         vegan: true,
//         glutenFree: true,
//         dairyFree: true,
//         veryHealthy: true,
//         cheap: false,
//         veryPopular: true,
//         sustainable: false,
//         weightWatcherSmartPoints: 4,
//         gaps: 'no',
//         lowFodmap: false,
//         aggregateLikes: 3689,
//         spoonacularScore: 99,
//         healthScore: 76,
//         creditsText: 'Full Belly Sisters',
//         license: 'CC BY-SA 3.0',
//         sourceName: 'Full Belly Sisters',
//         pricePerServing: 112.39,
//         id: 716426,
//         title: 'Cauliflower, Brown Rice, and Vegetable Fried Rice',
//         readyInMinutes: 30,
//         servings: 8,
//         sourceUrl: 'http://fullbellysisters.blogspot.com/2012/01/cauliflower-fried-rice-more-veggies.html',
//         image: 'https://spoonacular.com/recipeImages/716426-312x231.jpg',
//         imageType: 'jpg',
//         nutrition: [Object],
//         summary: 'Cauliflower, Brown Rice, and Vegetable Fried Rice might be a good recipe to expand your side dish recipe box. Watching your figure? This gluten free, dairy free, lacto ovo vegetarian, and vegan recipe has <b>192 calories</b>, <b>7g of protein</b>, and <b>6g of fat</b> per serving. For <b>$1.12 per serving</b>, this recipe <b>covers 19%</b> of your daily requirements of vitamins and minerals. This recipe serves 8. This recipe from fullbellysisters.blogspot.com has 3689 fans. This recipe is typical of Chinese cuisine. From preparation to the plate, this recipe takes about <b>30 minutes</b>. Head to the store and pick up peas, broccoli, salt, and a few other things to make it today. Overall, this recipe earns an <b>awesome spoonacular score of 100%</b>. Users who liked this recipe also liked <a href="https://spoonacular.com/recipes/vegetable-fried-brown-rice-36199">Vegetable Fried Brown Rice</a>, <a href="https://spoonacular.com/recipes/vegetable-fried-cauliflower-rice-933261">Vegetable Fried Cauliflower Rice</a>, and <a href="https://spoonacular.com/recipes/easy-vegetable-fried-brown-rice-with-egg-802042">Easy Vegetable Fried Brown Rice with Egg</a>.',
//         cuisines: [Array],
//         dishTypes: [Array],
//         diets: [Array],
//         occasions: [],
//         analyzedInstructions: [Array],
//         spoonacularSourceUrl: 'https://spoonacular.com/cauliflower-brown-rice-and-vegetable-fried-rice-716426'
//       }
//     ],
//     offset: 0,
//     number: 1,
//     totalResults: 5078
//   }
