async function spoonRequest(cuisine, diet) {
    let randomNumber = Math.floor(Math.random() * 100) + 1;
    let response = await fetch(process.env.COMPLEX_SEARCH, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: {
            number: 1,
            addRecipeNutrition: true,
            offset: randomNumber,
            apiKey: process.env.SPOON_KEY,
            cuisine: cuisine,
            diet: diet,
        },
    });
    return response.json();
}

let functionResponse = (response) => {
    let r = response.json();
    let title = r.title;
    let image = r.image;
    let source = r.sourceUrl;
    let n = r.nutrition.nutrients;
    let calories = n.filter((obj) => obj.title === "Calories");
    let proteins = n.filter((obj) => obj.title === "Protein");
    let fats = n.filter((obj) => obj.title === "Fat");
    let carbs = n.filter((obj) => obj.title === "Carbohydrates");

    preGuess(title, source, image);
    postGuess(calories, proteins, fats, carbs);
};

let preGuess = (title, source, image) => {
    const foodImage = document.getElementById("food_image");
    let img = document.createElement("img");
    img.src = image;
    img.className = "p-2 img-thumbnail";
    foodImage.appendChild(img);

    const foodMasthead = document.getElementById("food_masthead");
    let foodHeading = document.createElement("h2");
    foodHeading.className =
        "text-left text-wrap text-uppercase font-weight-bold";
    let foodLink = document.createElement("a");
    foodLink.href = source;
    foodLink.innerHTML = title;
    foodHeading.appendChild(foodLink);
    foodMasthead.appendChild(foodHeading);
};

let postGuess = (calories, proteins, fats, carbs) => {
    let factsList = document.getElementById("facts_list");

    let caloriesListItem = document.createElement("li");
    caloriesListItem.className = "list-group-item";
    caloriesListItem.innerHTML = calories;
    let proteinsListItem = document.createElement("li");
    proteinsListItem.className = "list-group-item";
    proteinsListItem.innerHTML = proteins;
    let fatsListItem = document.createElement("li");
    fatsListItem.className = "list-group-item";
    fatsListItem.innerHTML = fats;
    let carbsListItem = document.createElement("li");
    carbsListItem.className = "list-group-item";
    carbsListItem.innerHTML = carbs;

    factsList.appendChild(caloriesListItem);
    factsList.appendChild(proteinsListItem);
    factsList.appendChild(fatsListItem);
    factsList.appendChild(carbsListItem);
};

let guessEvent = (e) => {
    let displayFacts = document.getElementById("display_facts");
    displayFacts.className = "d-block";
};

window.onload = function () {
    if (localStorage.getItem("firstTTime") === null) {
        spoonRequest()
            .then((response) => functionResponse(response))
            .catch((error) => console.log(error));
        localStorage.setItem("firstTime", true);
    }
};
